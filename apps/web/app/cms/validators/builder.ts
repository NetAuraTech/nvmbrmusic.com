import vine from '@vinejs/vine';

/**
 * All valid operation types — mirrors `BuilderOpType` from `#cms/types/builder`.
 * Kept as a plain array here to avoid a circular import with the types file.
 */
const OP_TYPES = [
	'UPDATE_PROPS',
	'MOVE_BLOCK',
	'ADD_BLOCK',
	'DELETE_BLOCK',
	'CURSOR',
	'LOCK_ACQUIRE',
	'LOCK_RELEASE',
] as const;

// Valid block types for ADD_BLOCK validation
const BLOCK_TYPES = [
	'section',
	'grid',
	'flex',
	'title',
	'paragraph',
	'button',
	'separator',
	'icon',
	'form',
	'field',
	'htmltext',
	'image',
	'video',
	'carousel',
	'list',
	'quote',
	'iframe',
	'hero',
	'gallery',
] as const;

/**
 * Shared field validators used across multiple operations.
 */
const blockIdValidator = vine.string().trim().minLength(1);
const fieldKeyValidator = vine.string().trim().maxLength(100);
const parentIdValidator = vine.string().trim().minLength(1);
const indexValidator = vine.number().min(0);

/**
 * Validates the envelope sent by the client to
 * `POST /api/admin/builder/operations`.
 *
 * Only the common fields (`pageId`, `translationId`, `op`) are validated
 * strictly. Op-specific fields are accepted as loose objects here and
 * validated in a second pass using `OP_SCHEMAS` (see below).
 */
export const builderOperationValidator = vine.create({
	/** Page the translation belongs to — used to build the channel name. */
	pageId: vine.number().positive(),

	/** The translation being edited. */
	translationId: vine.number().positive(),

	/** Discriminant. */
	op: vine.enum(OP_TYPES),

	// ── Op-specific fields (all optional at schema level) ─────────────────────

	/** Block targeted by the operation. Required for all ops except CURSOR. */
	blockId: blockIdValidator.optional(),

	/** Partial props patch (UPDATE_PROPS). */
	props: vine.any().optional(),

	/** Target parent for the moved/added block (MOVE_BLOCK, ADD_BLOCK). */
	newParentId: parentIdValidator.optional(),
	parentId: parentIdValidator.optional(),

	/** 0-based target index (MOVE_BLOCK, ADD_BLOCK). */
	newIndex: indexValidator.optional(),
	index: indexValidator.optional(),

	/** Full block definition for insertion (ADD_BLOCK). */
	block: vine.any().optional(),

	/** Field being locked or unlocked (LOCK_ACQUIRE, LOCK_RELEASE). */
	fieldKey: fieldKeyValidator.optional(),
});

/**
 * Validates the presence endpoint query params.
 * `GET /api/admin/builder/presence/:translationId`
 */
export const builderPresenceValidator = vine.create({
	translationId: vine.number().positive(),
});

// ─── Strict per-operation schemas (second-pass validation) ─────────────────

/**
 * Validates UPDATE_PROPS payload.
 * Props are validated loosely here — sanitization happens in the controller.
 */
export const updatePropsSchema = vine.object({
	blockId: blockIdValidator,
	props: vine.any().optional(), // Allow any props - strict validation per block type in future
});

/**
 * Validates MOVE_BLOCK payload.
 */
export const moveBlockSchema = vine.object({
	blockId: blockIdValidator,
	newParentId: parentIdValidator,
	newIndex: indexValidator,
});

/**
 * Validates ADD_BLOCK payload with full block structure.
 */
export const addBlockSchema = vine.object({
	block: vine.object({
		id: vine.string().trim().minLength(1),
		type: vine.enum(BLOCK_TYPES),
		props: vine.any().optional(), // Allow any props - strict validation per block type in future
		children: vine.array(vine.any()).optional(),
	}),
	parentId: parentIdValidator,
	index: indexValidator,
});

/**
 * Validates DELETE_BLOCK payload.
 */
export const deleteBlockSchema = vine.object({
	blockId: blockIdValidator,
});

/**
 * Validates CURSOR payload.
 */
export const cursorSchema = vine.object({
	blockId: blockIdValidator.optional(),
	fieldKey: fieldKeyValidator.optional(),
});

/**
 * Validates LOCK_ACQUIRE / LOCK_RELEASE payload.
 */
export const lockSchema = vine.object({
	blockId: blockIdValidator,
	fieldKey: fieldKeyValidator,
});

/**
 * Map of operation type to its strict validation schema.
 * Used for second-pass validation in the controller.
 */
export const OP_SCHEMAS = {
	UPDATE_PROPS: updatePropsSchema,
	MOVE_BLOCK: moveBlockSchema,
	ADD_BLOCK: addBlockSchema,
	DELETE_BLOCK: deleteBlockSchema,
	CURSOR: cursorSchema,
	LOCK_ACQUIRE: lockSchema,
	LOCK_RELEASE: lockSchema,
};
