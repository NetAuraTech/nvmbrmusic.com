/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'drive.fs.serve': {
    methods: ["GET","HEAD"]
    pattern: '/uploads/*'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { '*': ParamValue[] }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'admin.cms.pages.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/pages'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/page').listPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages_create.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/pages/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_create_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_create_controller').default['render']>>>
    }
  }
  'admin.cms.pages_create.execute': {
    methods: ["POST"]
    pattern: '/admin/pages/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').createPageValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').createPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_create_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_create_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages_show.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/pages/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_show_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_show_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages_update.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/pages/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages_update.execute': {
    methods: ["POST"]
    pattern: '/admin/pages/:id/edit'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>|InferInput<(typeof import('#transport/cms/validators/page').updatePageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>|InferInput<(typeof import('#transport/cms/validators/page').updatePageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages_update.publish': {
    methods: ["POST"]
    pattern: '/admin/pages/:id/publish'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>|InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>|InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['publish']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['publish']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages_update.unpublish': {
    methods: ["POST"]
    pattern: '/admin/pages/:id/unpublish'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>|InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>|InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['unpublish']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_update_controller').default['unpublish']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages.set_homepage': {
    methods: ["POST"]
    pattern: '/admin/pages/:id/homepage'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_controller').default['setHomepage']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_controller').default['setHomepage']>>>
    }
  }
  'admin.cms.pages.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/pages/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.page_translations.execute': {
    methods: ["POST"]
    pattern: '/admin/pages/:id/translations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_translations_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_translations_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.page_revisions.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/pages/:id/translations/:translationId/revisions'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; translationId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_revisions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_revisions_controller').default['index']>>>
    }
  }
  'admin.cms.page_revisions.restore': {
    methods: ["POST"]
    pattern: '/admin/pages/:id/translations/:translationId/revisions/:revisionId/restore'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').revisionValidator)>>
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; translationId: ParamValue; revisionId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').revisionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_revisions_controller').default['restore']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_revisions_controller').default['restore']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.page_revisions.toggle_keep': {
    methods: ["POST"]
    pattern: '/admin/pages/:id/translations/:translationId/revisions/:revisionId/keep'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').revisionValidator)>>
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; translationId: ParamValue; revisionId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').revisionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_revisions_controller').default['toggleKeep']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/page_revisions_controller').default['toggleKeep']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.pages_preview.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/pages/preview/:pageId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { pageId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_preview_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/pages_preview_controller').default['render']>>>
    }
  }
  'admin.cms.templates.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/templates'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/template').listTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.templates.execute': {
    methods: ["POST"]
    pattern: '/admin/templates'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').createTemplateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').createTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.templates.apply_to_page': {
    methods: ["POST"]
    pattern: '/admin/templates/:id/apply'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>|InferInput<(typeof import('#transport/cms/validators/template').applyTemplateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>|InferInput<(typeof import('#transport/cms/validators/template').applyTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['applyToPage']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['applyToPage']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.templates.update': {
    methods: ["POST"]
    pattern: '/admin/templates/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>|InferInput<(typeof import('#transport/cms/validators/template').updateTemplateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>|InferInput<(typeof import('#transport/cms/validators/template').updateTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.templates.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/templates/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.templates_preview.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/templates/preview/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/template').templatePreviewValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_preview_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_preview_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.cms.templates.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/templates/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/admin/templates_controller').default['edit']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.core.dashboard.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/dashboard_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/dashboard_controller').default['render']>>>
    }
  }
  'admin.core.maintenance.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/settings/maintenance'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/maintenance_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/maintenance_controller').default['render']>>>
    }
  }
  'admin.core.maintenance.update': {
    methods: ["POST"]
    pattern: '/admin/settings/maintenance'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/maintenance_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/maintenance_controller').default['update']>>>
    }
  }
  'admin.core.maintenance.toggle': {
    methods: ["POST"]
    pattern: '/admin/settings/maintenance/toggle'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/maintenance_controller').default['toggle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/admin/maintenance_controller').default['toggle']>>>
    }
  }
  'core.sitemap.show': {
    methods: ["GET","HEAD"]
    pattern: '/sitemap.xml'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/front/sitemap_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/front/sitemap_controller').default['show']>>>
    }
  }
  'core.robots.show': {
    methods: ["GET","HEAD"]
    pattern: '/robots.txt'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/front/robots_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/front/robots_controller').default['show']>>>
    }
  }
  'core.docs.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/docs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/front/docs_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/front/docs_controller').default['show']>>>
    }
  }
  'admin.file.files.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/files'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/file/validators/file').listFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.file.files.upload': {
    methods: ["POST"]
    pattern: '/admin/files/upload'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['upload']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['upload']>>>
    }
  }
  'admin.file.files.move': {
    methods: ["POST"]
    pattern: '/admin/files/:id/move'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').moveFileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').moveFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['move']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['move']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.file.files.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/files/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.file.files.upsert_alt': {
    methods: ["POST"]
    pattern: '/admin/files/:id/alts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').upsertAltValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').upsertAltValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['upsertAlt']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['upsertAlt']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.file.files.delete_alt': {
    methods: ["DELETE"]
    pattern: '/admin/files/:id/alts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').deleteAltValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').deleteAltValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['deleteAlt']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/files_controller').default['deleteAlt']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.file.file_folders.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/files/folders'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['render']>>>
    }
  }
  'admin.file.file_folders.execute': {
    methods: ["POST"]
    pattern: '/admin/files/folders'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').createFolderValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').createFolderValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.file.file_folders.update': {
    methods: ["PUT"]
    pattern: '/admin/files/folders/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').updateFolderValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>|InferInput<(typeof import('#transport/file/validators/file').updateFolderValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.file.file_folders.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/files/folders/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/admin/file_folders_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.users.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/user').listValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.users_create.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_create_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_create_controller').default['render']>>>
    }
  }
  'admin.identity.users_create.execute': {
    methods: ["POST"]
    pattern: '/admin/users/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_create_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_create_controller').default['execute']>>>
    }
  }
  'admin.identity.users.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/user').deleteValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/user').deleteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.users_show.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/user').showValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_show_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_show_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.users_update.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/user').editValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_update_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_update_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.users_update.execute': {
    methods: ["POST"]
    pattern: '/admin/users/:id/edit'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/user').updateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/user').updateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_update_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/users_update_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.roles.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/role').listRolesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.roles_create.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/roles/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_create_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_create_controller').default['render']>>>
    }
  }
  'admin.identity.roles_create.execute': {
    methods: ["POST"]
    pattern: '/admin/roles/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/role').createRoleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/role').createRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_create_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_create_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.roles.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/role').deleteRoleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/role').deleteRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.roles_show.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/role').showRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_show_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_show_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.roles_update.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/roles/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/role').editRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_update_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_update_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.roles_update.execute': {
    methods: ["POST"]
    pattern: '/admin/roles/:id/edit'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/role').editRoleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/role').editRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_update_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/roles_update_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.permissions.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/permissions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_controller').default['render']>>>
    }
  }
  'admin.identity.permissions_create.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/permissions/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_create_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_create_controller').default['render']>>>
    }
  }
  'admin.identity.permissions_create.execute': {
    methods: ["POST"]
    pattern: '/admin/permissions/create'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/permission').createPermissionValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/permission').createPermissionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_create_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_create_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.permissions.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/permissions/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/permission').deletePermissionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/permission').deletePermissionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.permissions_update.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/permissions/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/permission').editPermissionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_update_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_update_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.identity.permissions_update.execute': {
    methods: ["POST"]
    pattern: '/admin/permissions/:id/edit'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/permission').editPermissionValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/permission').editPermissionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_update_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/admin/permissions_update_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.log.logs.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/logs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/log/validators/log').listLogsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/log/controllers/admin/logs_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/log/controllers/admin/logs_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'admin.webhook.deliveries.render': {
    methods: ["GET","HEAD"]
    pattern: '/admin/webhooks/deliveries'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/webhook/validators/webhook').listWebhookDeliveriesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/webhook/controllers/admin/deliveries_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/webhook/controllers/admin/deliveries_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'event_stream': {
    methods: ["GET","HEAD"]
    pattern: '/__transmit/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'subscribe': {
    methods: ["POST"]
    pattern: '/__transmit/subscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'unsubscribe': {
    methods: ["POST"]
    pattern: '/__transmit/unsubscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'account.profile.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/profile_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/profile_controller').default['render']>>>
    }
  }
  'account.profile.execute': {
    methods: ["POST"]
    pattern: '/settings/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/profile_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/profile_controller').default['execute']>>>
    }
  }
  'account.account.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/account'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/account_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/account_controller').default['render']>>>
    }
  }
  'account.account.execute': {
    methods: ["POST"]
    pattern: '/settings/account'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/account/validators/account').updatePasswordValidator)>|InferInput<(typeof import('#transport/auth/validators/auth').twoFactorCodeValidator)>|InferInput<(typeof import('#transport/account/validators/account').disableTwoFactorValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/account/validators/account').updatePasswordValidator)>|InferInput<(typeof import('#transport/auth/validators/auth').twoFactorCodeValidator)>|InferInput<(typeof import('#transport/account/validators/account').disableTwoFactorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/account_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/account_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.account.destroy': {
    methods: ["DELETE"]
    pattern: '/settings/account'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/account/validators/account').deleteAccountValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/account/validators/account').deleteAccountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/account_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/account_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.email_change.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/account/email_change/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/email_change_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/email_change_controller').default['render']>>>
    }
  }
  'account.email_change.execute': {
    methods: ["POST"]
    pattern: '/settings/account/email_change'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/account/validators/account').changeEmailValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/account/validators/account').changeEmailValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/email_change_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/email_change_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.preferences.render': {
    methods: ["GET","HEAD"]
    pattern: '/settings/preferences'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/preferences_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/preferences_controller').default['render']>>>
    }
  }
  'account.preferences.execute': {
    methods: ["POST"]
    pattern: '/settings/preferences'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/account/validators/preference').updateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/account/validators/preference').updateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/front/preferences_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/front/preferences_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'account.index': {
    methods: ["GET","HEAD"]
    pattern: '/settings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'api.v1.account.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/api/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/api/profile_controller').default['show']>>>
    }
  }
  'api.v1.account.profile.update': {
    methods: ["PUT"]
    pattern: '/api/v1/profile'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/account/validators/profile').profileValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/account/validators/profile').profileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/api/profile_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/api/profile_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.account.account.update': {
    methods: ["PUT"]
    pattern: '/api/v1/account'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/api/account_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/api/account_controller').default['update']>>>
    }
  }
  'api.v1.account.account.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/account'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/account/validators/account').deleteAccountValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/account/validators/account').deleteAccountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/api/account_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/api/account_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.account.preferences.execute': {
    methods: ["POST"]
    pattern: '/api/v1/admin/preferences/theme'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/account/validators/preference').updateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/account/validators/preference').updateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/account/controllers/api/preferences_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/account/controllers/api/preferences_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.session.render': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/session_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/session_controller').default['render']>>>
    }
  }
  'auth.session.execute': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/session_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/session_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.two_factor.render': {
    methods: ["GET","HEAD"]
    pattern: '/two-factor'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/two_factor_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/two_factor_controller').default['render']>>>
    }
  }
  'auth.two_factor.verify': {
    methods: ["POST"]
    pattern: '/two-factor'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').twoFactorCodeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').twoFactorCodeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/two_factor_controller').default['verify']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/two_factor_controller').default['verify']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.register.render': {
    methods: ["GET","HEAD"]
    pattern: '/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/register_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/register_controller').default['render']>>>
    }
  }
  'auth.register.execute': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/register_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/register_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.forgot_password.render': {
    methods: ["GET","HEAD"]
    pattern: '/forgot-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/forgot_password_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/forgot_password_controller').default['render']>>>
    }
  }
  'auth.forgot_password.execute': {
    methods: ["POST"]
    pattern: '/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/forgot_password_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/forgot_password_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.reset_password.render': {
    methods: ["GET","HEAD"]
    pattern: '/reset-password/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/reset_password_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/reset_password_controller').default['render']>>>
    }
  }
  'auth.reset_password.execute': {
    methods: ["POST"]
    pattern: '/reset-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').resetPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/reset_password_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/reset_password_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.accept_invitation.render': {
    methods: ["GET","HEAD"]
    pattern: '/accept-invitation/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/auth/validators/auth').invitationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/accept_invitation_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/accept_invitation_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.accept_invitation.execute': {
    methods: ["POST"]
    pattern: '/accept-invitation'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').invitationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').invitationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/accept_invitation_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/accept_invitation_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/session_controller').default['destroy']>>>
    }
  }
  'auth.email_verification.execute': {
    methods: ["GET","HEAD"]
    pattern: '/verify/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/email_verification_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/email_verification_controller').default['execute']>>>
    }
  }
  'auth.social.render': {
    methods: ["GET","HEAD"]
    pattern: '/oauth/define-password'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['render']>>>
    }
  }
  'auth.social.execute': {
    methods: ["POST"]
    pattern: '/oauth/define-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').definePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').definePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.social.redirect': {
    methods: ["GET","HEAD"]
    pattern: '/oauth/:provider'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { provider: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['redirect']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['redirect']>>>
    }
  }
  'auth.social.callback': {
    methods: ["GET","HEAD"]
    pattern: '/oauth/:provider/callback'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { provider: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['callback']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['callback']>>>
    }
  }
  'auth.social.unlink': {
    methods: ["POST"]
    pattern: '/oauth/:provider/unlink'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { provider: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['unlink']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/front/social_controller').default['unlink']>>>
    }
  }
  'api.v1.auth.login.execute': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/login_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/login_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.auth.register.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/register_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/register_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.auth.forgot_password.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/forgot-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').forgotPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/forgot_password_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/forgot_password_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.auth.reset_password.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/reset-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').resetPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').resetPasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/reset_password_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/reset_password_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.auth.email_verification.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/verify-email/:token'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { token: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/email_verification_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/email_verification_controller').default['store']>>>
    }
  }
  'api.v1.auth.accept_invitation.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/accept-invitation'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/auth/validators/auth').invitationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/auth/validators/auth').invitationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/accept_invitation_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/accept_invitation_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.auth.logout.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/logout_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/logout_controller').default['destroy']>>>
    }
  }
  'api.v1.auth.me.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/me_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/auth/controllers/api/me_controller').default['show']>>>
    }
  }
  'api.v1.admin.cms.pages.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/pages'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/page').listPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_api_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/pages'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').createPageValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').createPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_create_api_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_create_api_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.search': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/pages/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/page').searchPagesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_api_controller').default['search']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_api_controller').default['search']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/pages/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_show_api_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_show_api_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/pages/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').updatePageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').updatePageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_update_api_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_update_api_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/pages/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').showPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_delete_api_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_delete_api_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.publish': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/pages/:id/publish'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_update_api_controller').default['publish']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_update_api_controller').default['publish']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.unpublish': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/pages/:id/unpublish'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').publishPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_update_api_controller').default['unpublish']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_update_api_controller').default['unpublish']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.pages.set_homepage': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/pages/:id/homepage'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_api_controller').default['setHomepage']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_api_controller').default['setHomepage']>>>
    }
  }
  'api.v1.admin.cms.page_translations.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/pages/:id/translations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/page').createTranslationValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/page').createTranslationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_translations_api_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_translations_api_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.page_revisions.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/pages/:id/translations/:translationId/revisions'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; translationId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_revisions_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_revisions_api_controller').default['index']>>>
    }
  }
  'api.v1.admin.cms.page_revisions.restore': {
    methods: ["POST"]
    pattern: '/api/v1/admin/pages/:id/translations/:translationId/revisions/:revisionId/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; translationId: ParamValue; revisionId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_revisions_api_controller').default['restore']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_revisions_api_controller').default['restore']>>>
    }
  }
  'api.v1.admin.cms.page_revisions.toggle': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/pages/:id/translations/:translationId/revisions/:revisionId/pin'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; translationId: ParamValue; revisionId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_revisions_api_controller').default['toggle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/page_revisions_api_controller').default['toggle']>>>
    }
  }
  'api.v1.admin.cms.pages_preview.token': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/pages/preview/token'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_preview_token_controller').default['token']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/pages_preview_token_controller').default['token']>>>
    }
  }
  'api.v1.admin.cms.templates.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/templates'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/template').listTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.templates.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/templates'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').createBlockTemplateValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').createBlockTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.templates.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/templates/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').updateTemplateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').updateTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.templates.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/templates/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').showTemplateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.templates.create_from_page': {
    methods: ["POST"]
    pattern: '/api/v1/admin/templates/from-page'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/template').createFromPageValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/template').createFromPageValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['createFromPage']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_controller').default['createFromPage']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.templates_preview.token': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/templates/preview/token'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_preview_token_controller').default['token']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/templates_preview_token_controller').default['token']>>>
    }
  }
  'api.v1.admin.cms.builder_operations.execute': {
    methods: ["POST"]
    pattern: '/api/v1/admin/builder/operations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/builder').builderOperationValidator)>|InferInput<(typeof import('@vinejs/vine').default)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/builder').builderOperationValidator)>|InferInput<(typeof import('@vinejs/vine').default)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/builder_operations_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/builder_operations_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.builder_operations.presence': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/builder/presence/:translationId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { translationId: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/cms/validators/builder').builderPresenceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/builder_operations_controller').default['presence']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/builder_operations_controller').default['presence']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.cms.builder_operations.save_draft': {
    methods: ["POST"]
    pattern: '/api/v1/admin/builder/draft/:translationId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { translationId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/builder_operations_controller').default['saveDraft']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/api/builder_operations_controller').default['saveDraft']>>>
    }
  }
  'cms.contact.execute': {
    methods: ["POST"]
    pattern: '/contact'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/cms/validators/contact').contactValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/cms/validators/contact').contactValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/contact_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/contact_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'core.home.render': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/page_controller').default['home']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/page_controller').default['home']>>>
    }
  }
  'api.v1.admin.core.dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/api/dashboard_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/api/dashboard_api_controller').default['index']>>>
    }
  }
  'api.v1.admin.core.maintenance.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/maintenance'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/api/maintenance_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/api/maintenance_api_controller').default['index']>>>
    }
  }
  'api.v1.admin.core.maintenance.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/maintenance'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/core/validators/maintenance').updateMaintenanceValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/core/validators/maintenance').updateMaintenanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/api/maintenance_api_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/api/maintenance_api_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.core.maintenance.toggle': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/maintenance/toggle'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/core/validators/maintenance').toggleMaintenanceValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/core/validators/maintenance').toggleMaintenanceValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/api/maintenance_api_controller').default['toggle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/api/maintenance_api_controller').default['toggle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'core.openapi.spec': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/openapi.json'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/api/openapi_controller').default['spec']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/api/openapi_controller').default['spec']>>>
    }
  }
  'api.v1.admin.file.files.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/files'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/file/validators/file').listFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_api_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.files.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/files'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_upload_api_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_upload_api_controller').default['store']>>>
    }
  }
  'api.v1.admin.file.files.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/files/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_show_api_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_show_api_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.files.move': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/files/:id/move'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').moveFileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').moveFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_api_controller').default['move']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_api_controller').default['move']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.files.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/files/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_delete_api_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_delete_api_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.files.upsert_alt': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/files/:id/alt'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').upsertAltValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').upsertAltValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_alt_api_controller').default['upsertAlt']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_alt_api_controller').default['upsertAlt']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.files.delete_alt': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/files/:id/alt'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').deleteAltValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').deleteAltValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_alt_api_controller').default['deleteAlt']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/files_alt_api_controller').default['deleteAlt']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.folders.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/folders'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_api_controller').default['index']>>>
    }
  }
  'api.v1.admin.file.folders.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/folders'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').createFolderValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').createFolderValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_api_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_api_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.folders.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/folders/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_show_api_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_show_api_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.folders.children': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/folders/:id/children'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_show_api_controller').default['children']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_show_api_controller').default['children']>>>
    }
  }
  'api.v1.admin.file.folders.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/folders/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').updateFolderValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').updateFolderValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_update_api_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_update_api_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.file.folders.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/folders/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/file/validators/file').showFileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_delete_api_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/file/controllers/api/folders_delete_api_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/user').listValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_api_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.users.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/user').createValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/user').createValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_create_api_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_create_api_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/user').restIdValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_show_api_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_show_api_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.users.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/user').updateValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/user').updateValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_update_api_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_update_api_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.users.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/user').restIdValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/user').restIdValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_delete_api_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/users_delete_api_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/role').listRolesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_api_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.roles.store': {
    methods: ["POST"]
    pattern: '/api/v1/admin/roles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/role').createRoleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/role').createRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_create_api_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_create_api_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/identity/validators/role').restRoleIdValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_show_api_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_show_api_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.roles.update': {
    methods: ["PUT"]
    pattern: '/api/v1/admin/roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/role').updateRoleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/role').updateRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_update_api_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_update_api_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.roles.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/admin/roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#transport/identity/validators/role').restRoleIdValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#transport/identity/validators/role').restRoleIdValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_delete_api_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/roles_delete_api_controller').default['destroy']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.identity.permissions.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/permissions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/permissions_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/identity/controllers/api/permissions_api_controller').default['index']>>>
    }
  }
  'api.v1.admin.log.logs.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/logs'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/log/validators/log').listLogsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/log/controllers/api/logs_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/log/controllers/api/logs_api_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'api.v1.admin.webhook.deliveries.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/admin/deliveries'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#transport/webhook/validators/webhook').listWebhookDeliveriesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#transport/webhook/controllers/api/deliveries_api_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/webhook/controllers/api/deliveries_api_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'webhook.receivers.receive': {
    methods: ["POST"]
    pattern: '/webhooks/:receiver'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { receiver: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/webhook/controllers/webhook_receiver_controller').default['receive']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/webhook/controllers/webhook_receiver_controller').default['receive']>>>
    }
  }
  'health.liveness': {
    methods: ["GET","HEAD"]
    pattern: '/health'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/health_controller').default['liveness']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/health_controller').default['liveness']>>>
    }
  }
  'health.readiness': {
    methods: ["GET","HEAD"]
    pattern: '/health/ready'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/core/controllers/health_controller').default['readiness']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/core/controllers/health_controller').default['readiness']>>>
    }
  }
  'cms.page.localised.render': {
    methods: ["GET","HEAD"]
    pattern: '/:locale/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { locale: ParamValue; slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/page_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/page_controller').default['render']>>>
    }
  }
  'cms.page.render': {
    methods: ["GET","HEAD"]
    pattern: '/:slug'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/page_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#transport/cms/controllers/front/page_controller').default['render']>>>
    }
  }
}
