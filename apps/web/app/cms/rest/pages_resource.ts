import { inject } from '@adonisjs/core';
import vine from '@vinejs/vine';
import { ChangePageStatusAction } from '#cms/actions/page/change_page_status_action';
import { CreatePageAction } from '#cms/actions/page/create_page_action';
import { CreateTranslationAction } from '#cms/actions/page/create_translation_action';
import { DeletePageAction } from '#cms/actions/page/delete_page_action';
import { GetPageDetailAction } from '#cms/actions/page/get_page_detail_action';
import { ListPagesAction } from '#cms/actions/page/list_pages_action';
import { ListRevisionsAction } from '#cms/actions/page/list_revisions_action';
import { RestoreRevisionAction } from '#cms/actions/page/restore_revision_action';
import { SearchPagesAction, type PageSearchResult } from '#cms/actions/page/search_pages_action';
import { SetHomepageAction } from '#cms/actions/page/set_homepage_action';
import { ToggleRevisionKeepAction } from '#cms/actions/page/toggle_revision_keep_action';
import { UpdatePageAction } from '#cms/actions/page/update_page_action';
import PageRevisionTransformer from '#transport/cms/transformers/page_revision_transformer';
import PageSearchResultTransformer from '#transport/cms/transformers/page_search_result_transformer';
import PageTransformer from '#transport/cms/transformers/page_transformer';
import {
	listPageValidator,
	showPageValidator,
	createPageValidator,
	updatePageValidator,
	publishPageValidator,
	createTranslationValidator,
	searchPagesValidator,
} from '#transport/cms/validators/page';
import { type ApiOperationDoc, type JsonSchema } from '#transport/core/openapi/api_docs_registry';
import {
	dateTime,
	errorSchema,
	validationErrorSchema,
	dataEnvelope,
	paginatedEnvelope,
} from '#transport/core/openapi/schemas';
import { type RestEndpoint } from '#transport/core/rest/rest_adapter';
import type Page from '#cms/models/page/page';
import type PageRevision from '#cms/models/page/page_revision';
import type PageTranslation from '#cms/models/page/page_translation';
import type { Infer } from '@vinejs/vine/types';

type PageListPagination = Awaited<ReturnType<ListPagesAction['execute']>>;
type RevisionListPagination = Awaited<ReturnType<ListRevisionsAction['execute']>>;

type PageListPayload = Infer<typeof listPageValidator>;
type PageIdPayload = Infer<typeof showPageValidator>;
type PageCreatePayload = Infer<typeof createPageValidator>;
type PageUpdatePayload = Infer<typeof updatePageValidator>;
type PagePublishPayload = Infer<typeof publishPageValidator>;
type PageTranslationPayload = Infer<typeof createTranslationValidator>;
type PageSearchPayload = Infer<typeof searchPagesValidator>;

/** The page translation payload, as shaped by `PageTranslationTransformer`. */
export const pageTranslationSchema: JsonSchema = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		pageId: { type: 'number' },
		locale: { type: 'string' },
		slug: { type: 'string' },
		title: { type: 'string' },
		status: { type: 'string', enum: ['draft', 'published', 'archived'] },
		metaTitle: { type: 'string', nullable: true },
		metaDescription: { type: 'string', nullable: true },
		content: { type: 'object' },
		resolved_content: { type: 'object', nullable: true },
		updatedAt: dateTime,
	},
};

/** The page payload, as shaped by `PageTransformer` (embeds every translation). */
export const pageSchema: JsonSchema = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		defaultLocale: { type: 'string' },
		isHomepage: { type: 'boolean' },
		createdAt: dateTime,
		updatedAt: dateTime,
		translations: { type: 'array', items: pageTranslationSchema },
	},
};

/** The page revision payload, as shaped by `PageRevisionTransformer`. */
export const pageRevisionSchema: JsonSchema = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		keep: { type: 'boolean' },
		createdAt: dateTime,
		created_by: {
			type: 'object',
			properties: {
				id: { type: 'number' },
				username: { type: 'string' },
			},
			nullable: true,
		},
	},
};

/** The page search-result payload, as shaped by `PageSearchResultTransformer`. */
export const pageSearchResultSchema: JsonSchema = {
	type: 'object',
	properties: {
		page: pageSchema,
		matchedLocales: { type: 'array', items: { type: 'string' } },
	},
};

const revisionsPathValidator = vine.create({
	id: vine.number().positive(),
	translationId: vine.number().positive(),
});

const revisionTargetPathValidator = vine.create({
	id: vine.number().positive(),
	translationId: vine.number().positive(),
	revisionId: vine.number().positive(),
});

export const pagesEndpointsDocs: Record<
	| 'index'
	| 'store'
	| 'search'
	| 'show'
	| 'update'
	| 'destroy'
	| 'publish'
	| 'unpublish'
	| 'setHomepage'
	| 'storeTranslation'
	| 'listRevisions'
	| 'restoreRevision'
	| 'toggleRevision',
	ApiOperationDoc
> = {
	index: {
		summary: 'List pages',
		description: 'Paginated page listing, filterable by status, locale and search term.',
		tags: ['Pages'],
		request: [{ validator: listPageValidator, in: 'query' }],
		paginated: true,
		responses: {
			'200': { description: 'The paginated page list.', schema: paginatedEnvelope(pageSchema) },
			'422': { description: 'Validation failed.', schema: validationErrorSchema },
		},
	},
	store: {
		summary: 'Create a page',
		tags: ['Pages'],
		request: [{ validator: createPageValidator, in: 'body' }],
		responses: {
			'201': { description: 'The created page.', schema: dataEnvelope(pageSchema) },
			'422': { description: 'Validation failed.', schema: validationErrorSchema },
		},
	},
	search: {
		summary: 'Search pages (full-text)',
		tags: ['Pages'],
		request: [{ validator: searchPagesValidator, in: 'query' }],
		responses: {
			'200': {
				description: 'The search results (empty when the search engine is unavailable).',
				schema: dataEnvelope({
					type: 'object',
					properties: {
						available: { type: 'boolean' },
						results: { type: 'array', items: pageSearchResultSchema },
					},
				}),
			},
			'422': { description: 'Validation failed.', schema: validationErrorSchema },
		},
	},
	show: {
		summary: 'Show a page',
		tags: ['Pages'],
		request: [{ validator: showPageValidator, in: 'path' }],
		responses: {
			'200': { description: 'The page with its translations.', schema: dataEnvelope(pageSchema) },
			'404': { description: 'The page does not exist.', schema: errorSchema },
		},
	},
	update: {
		summary: 'Update a page translation',
		tags: ['Pages'],
		request: [
			{ validator: showPageValidator, in: 'path' },
			{ validator: updatePageValidator, in: 'body' },
		],
		responses: {
			'200': { description: 'The updated page.', schema: dataEnvelope(pageSchema) },
			'404': { description: 'The page does not exist.', schema: errorSchema },
			'422': { description: 'Validation failed.', schema: validationErrorSchema },
		},
	},
	destroy: {
		summary: 'Delete a page',
		tags: ['Pages'],
		request: [{ validator: showPageValidator, in: 'path' }],
		responses: {
			'204': { description: 'The page was deleted.' },
			'404': { description: 'The page does not exist.', schema: errorSchema },
		},
	},
	publish: {
		summary: 'Publish a page translation',
		tags: ['Pages'],
		request: [
			{ validator: showPageValidator, in: 'path' },
			{ validator: publishPageValidator, in: 'body' },
		],
		responses: {
			'200': { description: 'The published page.', schema: dataEnvelope(pageSchema) },
			'404': { description: 'The page does not exist.', schema: errorSchema },
			'422': { description: 'Validation failed.', schema: validationErrorSchema },
		},
	},
	unpublish: {
		summary: 'Unpublish a page translation',
		tags: ['Pages'],
		request: [
			{ validator: showPageValidator, in: 'path' },
			{ validator: publishPageValidator, in: 'body' },
		],
		responses: {
			'200': { description: 'The unpublished page.', schema: dataEnvelope(pageSchema) },
			'404': { description: 'The page does not exist.', schema: errorSchema },
			'422': { description: 'Validation failed.', schema: validationErrorSchema },
		},
	},
	setHomepage: {
		summary: 'Set a page as the homepage',
		tags: ['Pages'],
		request: [{ validator: showPageValidator, in: 'path' }],
		responses: {
			'200': { description: 'The updated page.', schema: dataEnvelope(pageSchema) },
			'404': { description: 'The page does not exist.', schema: errorSchema },
		},
	},
	storeTranslation: {
		summary: 'Create a page translation',
		tags: ['Pages'],
		request: [
			{ validator: showPageValidator, in: 'path' },
			{ validator: createTranslationValidator, in: 'body' },
		],
		responses: {
			'201': { description: 'The page with its new translation.', schema: dataEnvelope(pageSchema) },
			'404': { description: 'The page does not exist.', schema: errorSchema },
			'422': { description: 'Validation failed.', schema: validationErrorSchema },
		},
	},
	listRevisions: {
		summary: "List a page translation's revisions",
		tags: ['Pages'],
		request: [{ validator: revisionsPathValidator, in: 'path' }],
		paginated: true,
		responses: {
			'200': {
				description: 'The paginated revision list.',
				schema: paginatedEnvelope(pageRevisionSchema),
			},
			'404': { description: 'The page does not exist.', schema: errorSchema },
		},
	},
	restoreRevision: {
		summary: 'Restore a page revision',
		tags: ['Pages'],
		request: [{ validator: revisionTargetPathValidator, in: 'path' }],
		responses: {
			'200': {
				description: 'The restore confirmation.',
				schema: dataEnvelope({
					type: 'object',
					properties: { restored: { type: 'boolean' } },
				}),
			},
			'404': { description: 'The page or revision does not exist.', schema: errorSchema },
		},
	},
	toggleRevision: {
		summary: "Toggle a page revision's keep flag",
		tags: ['Pages'],
		request: [{ validator: revisionTargetPathValidator, in: 'path' }],
		responses: {
			'200': {
				description: 'The pinned revision.',
				schema: dataEnvelope({
					type: 'object',
					properties: { pinned: pageRevisionSchema },
				}),
			},
			'404': { description: 'The page or revision does not exist.', schema: errorSchema },
		},
	},
};

/**
 * Endpoint declarations for the pages REST resource.
 */
export interface PagesEndpoints {
	index: RestEndpoint<undefined, PageListPayload, PageListPagination, PageListPagination>;
	search: RestEndpoint<undefined, PageSearchPayload, PageSearchResult[] | null, PageSearchResult[] | null>;
	show: RestEndpoint<undefined, PageIdPayload, Page, Page>;
	store: RestEndpoint<undefined, PageCreatePayload, Page, Page>;
	update: RestEndpoint<{ id: number }, PageUpdatePayload, PageTranslation, Page>;
	publish: RestEndpoint<{ id: number }, PagePublishPayload, PageTranslation, Page>;
	unpublish: RestEndpoint<{ id: number }, PagePublishPayload, PageTranslation, Page>;
	setHomepage: RestEndpoint<{ id: number }, unknown, void, Page>;
	destroy: RestEndpoint<undefined, PageIdPayload, void, void>;
	storeTranslation: RestEndpoint<{ id: number }, PageTranslationPayload, PageTranslation, Page>;
	listRevisions: RestEndpoint<undefined, unknown, RevisionListPagination, RevisionListPagination>;
	restoreRevision: RestEndpoint<
		{ translationId: number; revisionId: number },
		unknown,
		PageTranslation,
		{ restored: boolean }
	>;
	toggleRevision: RestEndpoint<{ revisionId: number }, unknown, PageRevision, { pinned: PageRevision }>;
}

/**
 * Declarative pages REST resource.
 *
 * Owns the `/api/v1/admin/pages` endpoint declarations (including
 * translations and revisions) consumed by the REST `handle` adapter
 * (`#transport/core/rest/rest_adapter`); the controllers reduce to one-line dispatch over
 * `endpoints`.
 */
@inject()
export default class PagesResource {
	constructor(
		protected listPagesAction: ListPagesAction,
		protected searchPagesAction: SearchPagesAction,
		protected getPageDetailAction: GetPageDetailAction,
		protected createPageAction: CreatePageAction,
		protected updatePageAction: UpdatePageAction,
		protected changePageStatusAction: ChangePageStatusAction,
		protected setHomepageAction: SetHomepageAction,
		protected deletePageAction: DeletePageAction,
		protected createTranslationAction: CreateTranslationAction,
		protected listRevisionsAction: ListRevisionsAction,
		protected restoreRevisionAction: RestoreRevisionAction,
		protected toggleRevisionKeepAction: ToggleRevisionKeepAction,
	) {}

	readonly endpoints: PagesEndpoints = {
		index: {
			docs: pagesEndpointsDocs.index,
			paginated: true,
			strip: true,
			validator: () => listPageValidator,
			execute: (_context, _prepared, payload) =>
				this.listPagesAction.execute({
					status: payload.status,
					locale: payload.locale,
					search: payload.search,
					pagination: _context.pagination!,
				}),
			transform: (entity) => PageTransformer.paginate(entity.all(), entity.getMeta()),
		},
		search: {
			docs: pagesEndpointsDocs.search,
			strip: true,
			validator: () => searchPagesValidator,
			execute: (_context, _prepared, payload) =>
				this.searchPagesAction.execute({
					search: payload.search,
					locale: payload.locale,
					status: payload.status,
				}),
			transform: (entity) => ({
				available: entity !== null,
				results: PageSearchResultTransformer.transform(entity ?? []),
			}),
		},
		show: {
			docs: pagesEndpointsDocs.show,
			input: (context) => context.params,
			validator: () => showPageValidator,
			execute: (_context, _prepared, payload) => this.getPageDetailAction.execute({ id: payload.id }),
			transform: (entity) => PageTransformer.transform(entity),
		},
		store: {
			docs: pagesEndpointsDocs.store,
			status: 201,
			validator: () => createPageValidator,
			execute: (context, _prepared, payload) =>
				this.createPageAction.execute({
					defaultLocale: payload.locale,
					metaImageId: payload.metaImageId,
					translation: {
						locale: payload.locale,
						slug: payload.slug,
						title: payload.title,
						content: payload.content,
						metaTitle: payload.metaTitle,
						metaDescription: payload.metaDescription,
					},
					userId: context.auth.getUserOrFail().id,
				}),
			transform: (entity) => PageTransformer.transform(entity),
		},
		update: {
			docs: pagesEndpointsDocs.update,
			prepare: async (context) => {
				const { id } = await showPageValidator.validate(context.params);

				return { id };
			},
			validator: () => updatePageValidator,
			execute: (context, prepared, payload) =>
				this.updatePageAction.execute({
					pageId: prepared.id,
					locale: payload.locale,
					slug: payload.slug,
					title: payload.title,
					content: payload.content,
					metaTitle: payload.metaTitle,
					metaDescription: payload.metaDescription,
					metaImageId: payload.metaImageId,
					userId: context.auth.getUserOrFail().id,
				}),
			refetch: (_context, prepared) => this.getPageDetailAction.execute({ id: prepared.id }),
			transform: (entity) => PageTransformer.transform(entity),
		},
		publish: {
			docs: pagesEndpointsDocs.publish,
			prepare: async (context) => {
				const { id } = await showPageValidator.validate(context.params);

				return { id };
			},
			validator: () => publishPageValidator,
			execute: (context, prepared, payload) =>
				this.changePageStatusAction.execute({
					pageId: prepared.id,
					locale: payload.locale,
					status: 'published',
					userId: context.auth.getUserOrFail().id,
				}),
			refetch: (_context, prepared) => this.getPageDetailAction.execute({ id: prepared.id }),
			transform: (entity) => PageTransformer.transform(entity),
		},
		unpublish: {
			docs: pagesEndpointsDocs.unpublish,
			prepare: async (context) => {
				const { id } = await showPageValidator.validate(context.params);

				return { id };
			},
			validator: () => publishPageValidator,
			execute: (context, prepared, payload) =>
				this.changePageStatusAction.execute({
					pageId: prepared.id,
					locale: payload.locale,
					status: 'draft',
					userId: context.auth.getUserOrFail().id,
				}),
			refetch: (_context, prepared) => this.getPageDetailAction.execute({ id: prepared.id }),
			transform: (entity) => PageTransformer.transform(entity),
		},
		setHomepage: {
			docs: pagesEndpointsDocs.setHomepage,
			prepare: async (context) => {
				const { id } = await showPageValidator.validate(context.params);

				return { id };
			},
			execute: (context, prepared) =>
				this.setHomepageAction.execute({
					pageId: prepared.id,
					userId: context.auth.getUserOrFail().id,
				}),
			refetch: (_context, prepared) => this.getPageDetailAction.execute({ id: prepared.id }),
			transform: (entity) => PageTransformer.transform(entity),
		},
		destroy: {
			docs: pagesEndpointsDocs.destroy,
			status: 204,
			input: (context) => context.params,
			validator: () => showPageValidator,
			execute: (_context, _prepared, payload) => this.deletePageAction.execute({ id: payload.id }),
		},
		storeTranslation: {
			docs: pagesEndpointsDocs.storeTranslation,
			status: 201,
			prepare: async (context) => {
				const { id } = await showPageValidator.validate(context.params);

				return { id };
			},
			validator: () => createTranslationValidator,
			execute: (_context, prepared, payload) =>
				this.createTranslationAction.execute({
					pageId: prepared.id,
					locale: payload.locale,
					slug: payload.slug,
					title: payload.title,
					metaTitle: payload.metaTitle,
					metaDescription: payload.metaDescription,
					seedFromLocale: payload.seedFromLocale,
				}),
			refetch: (_context, prepared) => this.getPageDetailAction.execute({ id: prepared.id }),
			transform: (entity) => PageTransformer.transform(entity),
		},
		listRevisions: {
			docs: pagesEndpointsDocs.listRevisions,
			paginated: true,
			execute: (context) =>
				this.listRevisionsAction.execute({
					pageId: Number(context.params.id),
					pagination: context.pagination!,
				}),
			transform: (entity) => PageRevisionTransformer.paginate(entity.all(), entity.getMeta()),
		},
		restoreRevision: {
			docs: pagesEndpointsDocs.restoreRevision,
			prepare: async (context) => ({
				translationId: Number(context.params.translationId),
				revisionId: Number(context.params.revisionId),
			}),
			execute: (context, prepared) =>
				this.restoreRevisionAction.execute({
					translationId: prepared.translationId,
					revisionId: prepared.revisionId,
					userId: context.auth.getUserOrFail().id,
				}),
			transform: () => ({ restored: true }),
		},
		toggleRevision: {
			docs: pagesEndpointsDocs.toggleRevision,
			prepare: async (context) => ({ revisionId: Number(context.params.revisionId) }),
			execute: (_context, prepared) => this.toggleRevisionKeepAction.execute({ revisionId: prepared.revisionId }),
			transform: (entity) => ({ pinned: entity }),
		},
	};
}
