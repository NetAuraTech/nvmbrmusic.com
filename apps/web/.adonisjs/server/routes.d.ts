import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'admin.cms.pages.render': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_create.render': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_create.execute': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.publish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.unpublish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages.set_homepage': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.page_translations.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.page_revisions.index': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue} }
    'admin.cms.page_revisions.restore': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'admin.cms.page_revisions.toggle_keep': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'admin.cms.pages_preview.render': { paramsTuple: [ParamValue]; params: {'pageId': ParamValue} }
    'admin.cms.templates.render': { paramsTuple?: []; params?: {} }
    'admin.cms.templates.execute': { paramsTuple?: []; params?: {} }
    'admin.cms.templates.apply_to_page': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates_preview.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.core.dashboard.render': { paramsTuple?: []; params?: {} }
    'admin.core.maintenance.render': { paramsTuple?: []; params?: {} }
    'admin.core.maintenance.update': { paramsTuple?: []; params?: {} }
    'admin.core.maintenance.toggle': { paramsTuple?: []; params?: {} }
    'core.sitemap.show': { paramsTuple?: []; params?: {} }
    'core.robots.show': { paramsTuple?: []; params?: {} }
    'core.docs.show': { paramsTuple?: []; params?: {} }
    'admin.file.files.render': { paramsTuple?: []; params?: {} }
    'admin.file.files.upload': { paramsTuple?: []; params?: {} }
    'admin.file.files.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.files.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.files.upsert_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.files.delete_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.file_folders.render': { paramsTuple?: []; params?: {} }
    'admin.file.file_folders.execute': { paramsTuple?: []; params?: {} }
    'admin.file.file_folders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.file_folders.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.users.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users_create.execute': { paramsTuple?: []; params?: {} }
    'admin.identity.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.users_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.users_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.users_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles.render': { paramsTuple?: []; params?: {} }
    'admin.identity.roles_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.roles_create.execute': { paramsTuple?: []; params?: {} }
    'admin.identity.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.permissions.render': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions_create.execute': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.permissions_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.permissions_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.log.logs.render': { paramsTuple?: []; params?: {} }
    'admin.webhook.deliveries.render': { paramsTuple?: []; params?: {} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'account.profile.render': { paramsTuple?: []; params?: {} }
    'account.profile.execute': { paramsTuple?: []; params?: {} }
    'account.account.render': { paramsTuple?: []; params?: {} }
    'account.account.execute': { paramsTuple?: []; params?: {} }
    'account.account.destroy': { paramsTuple?: []; params?: {} }
    'account.email_change.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'account.email_change.execute': { paramsTuple?: []; params?: {} }
    'account.preferences.render': { paramsTuple?: []; params?: {} }
    'account.preferences.execute': { paramsTuple?: []; params?: {} }
    'account.index': { paramsTuple?: []; params?: {} }
    'api.v1.account.profile.show': { paramsTuple?: []; params?: {} }
    'api.v1.account.profile.update': { paramsTuple?: []; params?: {} }
    'api.v1.account.account.update': { paramsTuple?: []; params?: {} }
    'api.v1.account.account.destroy': { paramsTuple?: []; params?: {} }
    'api.v1.admin.account.preferences.execute': { paramsTuple?: []; params?: {} }
    'auth.session.render': { paramsTuple?: []; params?: {} }
    'auth.session.execute': { paramsTuple?: []; params?: {} }
    'auth.two_factor.render': { paramsTuple?: []; params?: {} }
    'auth.two_factor.verify': { paramsTuple?: []; params?: {} }
    'auth.register.render': { paramsTuple?: []; params?: {} }
    'auth.register.execute': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.render': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.execute': { paramsTuple?: []; params?: {} }
    'auth.reset_password.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.reset_password.execute': { paramsTuple?: []; params?: {} }
    'auth.accept_invitation.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.accept_invitation.execute': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
    'auth.email_verification.execute': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.social.render': { paramsTuple?: []; params?: {} }
    'auth.social.execute': { paramsTuple?: []; params?: {} }
    'auth.social.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'auth.social.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'auth.social.unlink': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'api.v1.auth.login.execute': { paramsTuple?: []; params?: {} }
    'api.v1.auth.register.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.forgot_password.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.reset_password.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.email_verification.store': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'api.v1.auth.accept_invitation.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.logout.destroy': { paramsTuple?: []; params?: {} }
    'api.v1.auth.me.show': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.search': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.publish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.unpublish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.set_homepage': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.page_translations.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.page_revisions.index': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue} }
    'api.v1.admin.cms.page_revisions.restore': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'api.v1.admin.cms.page_revisions.toggle': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'api.v1.admin.cms.pages_preview.token': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.templates.create_from_page': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates_preview.token': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.builder_operations.execute': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.builder_operations.presence': { paramsTuple: [ParamValue]; params: {'translationId': ParamValue} }
    'api.v1.admin.cms.builder_operations.save_draft': { paramsTuple: [ParamValue]; params: {'translationId': ParamValue} }
    'cms.contact.execute': { paramsTuple?: []; params?: {} }
    'core.home.render': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.dashboard.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.maintenance.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.maintenance.update': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.maintenance.toggle': { paramsTuple?: []; params?: {} }
    'core.openapi.spec': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.files.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.files.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.files.upsert_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.files.delete_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.folders.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.folders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.children': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.users.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.users.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.roles.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.roles.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.permissions.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.log.logs.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.webhook.deliveries.index': { paramsTuple?: []; params?: {} }
    'webhook.receivers.receive': { paramsTuple: [ParamValue]; params: {'receiver': ParamValue} }
    'health.liveness': { paramsTuple?: []; params?: {} }
    'health.readiness': { paramsTuple?: []; params?: {} }
    'cms.page.localised.render': { paramsTuple: [ParamValue,ParamValue]; params: {'locale': ParamValue,'slug': ParamValue} }
    'cms.page.render': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'admin.cms.pages.render': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_create.render': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.page_revisions.index': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue} }
    'admin.cms.pages_preview.render': { paramsTuple: [ParamValue]; params: {'pageId': ParamValue} }
    'admin.cms.templates.render': { paramsTuple?: []; params?: {} }
    'admin.cms.templates_preview.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.core.dashboard.render': { paramsTuple?: []; params?: {} }
    'admin.core.maintenance.render': { paramsTuple?: []; params?: {} }
    'core.sitemap.show': { paramsTuple?: []; params?: {} }
    'core.robots.show': { paramsTuple?: []; params?: {} }
    'core.docs.show': { paramsTuple?: []; params?: {} }
    'admin.file.files.render': { paramsTuple?: []; params?: {} }
    'admin.file.file_folders.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.users_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles.render': { paramsTuple?: []; params?: {} }
    'admin.identity.roles_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.roles_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.permissions.render': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.log.logs.render': { paramsTuple?: []; params?: {} }
    'admin.webhook.deliveries.render': { paramsTuple?: []; params?: {} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'account.profile.render': { paramsTuple?: []; params?: {} }
    'account.account.render': { paramsTuple?: []; params?: {} }
    'account.email_change.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'account.preferences.render': { paramsTuple?: []; params?: {} }
    'account.index': { paramsTuple?: []; params?: {} }
    'api.v1.account.profile.show': { paramsTuple?: []; params?: {} }
    'auth.session.render': { paramsTuple?: []; params?: {} }
    'auth.two_factor.render': { paramsTuple?: []; params?: {} }
    'auth.register.render': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.render': { paramsTuple?: []; params?: {} }
    'auth.reset_password.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.accept_invitation.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.email_verification.execute': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.social.render': { paramsTuple?: []; params?: {} }
    'auth.social.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'auth.social.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'api.v1.auth.me.show': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.search': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.page_revisions.index': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue} }
    'api.v1.admin.cms.pages_preview.token': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates_preview.token': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.builder_operations.presence': { paramsTuple: [ParamValue]; params: {'translationId': ParamValue} }
    'core.home.render': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.dashboard.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.maintenance.index': { paramsTuple?: []; params?: {} }
    'core.openapi.spec': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.folders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.children': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.users.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.roles.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.permissions.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.log.logs.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.webhook.deliveries.index': { paramsTuple?: []; params?: {} }
    'health.liveness': { paramsTuple?: []; params?: {} }
    'health.readiness': { paramsTuple?: []; params?: {} }
    'cms.page.localised.render': { paramsTuple: [ParamValue,ParamValue]; params: {'locale': ParamValue,'slug': ParamValue} }
    'cms.page.render': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'admin.cms.pages.render': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_create.render': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.page_revisions.index': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue} }
    'admin.cms.pages_preview.render': { paramsTuple: [ParamValue]; params: {'pageId': ParamValue} }
    'admin.cms.templates.render': { paramsTuple?: []; params?: {} }
    'admin.cms.templates_preview.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.core.dashboard.render': { paramsTuple?: []; params?: {} }
    'admin.core.maintenance.render': { paramsTuple?: []; params?: {} }
    'core.sitemap.show': { paramsTuple?: []; params?: {} }
    'core.robots.show': { paramsTuple?: []; params?: {} }
    'core.docs.show': { paramsTuple?: []; params?: {} }
    'admin.file.files.render': { paramsTuple?: []; params?: {} }
    'admin.file.file_folders.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.users_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.users_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles.render': { paramsTuple?: []; params?: {} }
    'admin.identity.roles_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.roles_show.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.permissions.render': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions_create.render': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions_update.render': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.log.logs.render': { paramsTuple?: []; params?: {} }
    'admin.webhook.deliveries.render': { paramsTuple?: []; params?: {} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'account.profile.render': { paramsTuple?: []; params?: {} }
    'account.account.render': { paramsTuple?: []; params?: {} }
    'account.email_change.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'account.preferences.render': { paramsTuple?: []; params?: {} }
    'account.index': { paramsTuple?: []; params?: {} }
    'api.v1.account.profile.show': { paramsTuple?: []; params?: {} }
    'auth.session.render': { paramsTuple?: []; params?: {} }
    'auth.two_factor.render': { paramsTuple?: []; params?: {} }
    'auth.register.render': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.render': { paramsTuple?: []; params?: {} }
    'auth.reset_password.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.accept_invitation.render': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.email_verification.execute': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.social.render': { paramsTuple?: []; params?: {} }
    'auth.social.redirect': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'auth.social.callback': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'api.v1.auth.me.show': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.search': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.page_revisions.index': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue} }
    'api.v1.admin.cms.pages_preview.token': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates_preview.token': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.builder_operations.presence': { paramsTuple: [ParamValue]; params: {'translationId': ParamValue} }
    'core.home.render': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.dashboard.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.maintenance.index': { paramsTuple?: []; params?: {} }
    'core.openapi.spec': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.folders.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.children': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.users.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.roles.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.permissions.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.log.logs.index': { paramsTuple?: []; params?: {} }
    'api.v1.admin.webhook.deliveries.index': { paramsTuple?: []; params?: {} }
    'health.liveness': { paramsTuple?: []; params?: {} }
    'health.readiness': { paramsTuple?: []; params?: {} }
    'cms.page.localised.render': { paramsTuple: [ParamValue,ParamValue]; params: {'locale': ParamValue,'slug': ParamValue} }
    'cms.page.render': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  POST: {
    'admin.cms.pages_create.execute': { paramsTuple?: []; params?: {} }
    'admin.cms.pages_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.publish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages_update.unpublish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.pages.set_homepage': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.page_translations.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.page_revisions.restore': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'admin.cms.page_revisions.toggle_keep': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'admin.cms.templates.execute': { paramsTuple?: []; params?: {} }
    'admin.cms.templates.apply_to_page': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.core.maintenance.update': { paramsTuple?: []; params?: {} }
    'admin.core.maintenance.toggle': { paramsTuple?: []; params?: {} }
    'admin.file.files.upload': { paramsTuple?: []; params?: {} }
    'admin.file.files.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.files.upsert_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.file_folders.execute': { paramsTuple?: []; params?: {} }
    'admin.identity.users_create.execute': { paramsTuple?: []; params?: {} }
    'admin.identity.users_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles_create.execute': { paramsTuple?: []; params?: {} }
    'admin.identity.roles_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.permissions_create.execute': { paramsTuple?: []; params?: {} }
    'admin.identity.permissions_update.execute': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'account.profile.execute': { paramsTuple?: []; params?: {} }
    'account.account.execute': { paramsTuple?: []; params?: {} }
    'account.email_change.execute': { paramsTuple?: []; params?: {} }
    'account.preferences.execute': { paramsTuple?: []; params?: {} }
    'api.v1.admin.account.preferences.execute': { paramsTuple?: []; params?: {} }
    'auth.session.execute': { paramsTuple?: []; params?: {} }
    'auth.two_factor.verify': { paramsTuple?: []; params?: {} }
    'auth.register.execute': { paramsTuple?: []; params?: {} }
    'auth.forgot_password.execute': { paramsTuple?: []; params?: {} }
    'auth.reset_password.execute': { paramsTuple?: []; params?: {} }
    'auth.accept_invitation.execute': { paramsTuple?: []; params?: {} }
    'auth.session.destroy': { paramsTuple?: []; params?: {} }
    'auth.social.execute': { paramsTuple?: []; params?: {} }
    'auth.social.unlink': { paramsTuple: [ParamValue]; params: {'provider': ParamValue} }
    'api.v1.auth.login.execute': { paramsTuple?: []; params?: {} }
    'api.v1.auth.register.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.forgot_password.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.reset_password.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.email_verification.store': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'api.v1.auth.accept_invitation.store': { paramsTuple?: []; params?: {} }
    'api.v1.auth.logout.destroy': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.page_translations.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.page_revisions.restore': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'api.v1.admin.cms.templates.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.templates.create_from_page': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.builder_operations.execute': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.builder_operations.save_draft': { paramsTuple: [ParamValue]; params: {'translationId': ParamValue} }
    'cms.contact.execute': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.folders.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.users.store': { paramsTuple?: []; params?: {} }
    'api.v1.admin.identity.roles.store': { paramsTuple?: []; params?: {} }
    'webhook.receivers.receive': { paramsTuple: [ParamValue]; params: {'receiver': ParamValue} }
  }
  DELETE: {
    'admin.cms.pages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.cms.templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.files.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.files.delete_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.file.file_folders.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.identity.permissions.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'account.account.destroy': { paramsTuple?: []; params?: {} }
    'api.v1.account.account.destroy': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.templates.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.files.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.files.delete_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'admin.file.file_folders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.account.profile.update': { paramsTuple?: []; params?: {} }
    'api.v1.account.account.update': { paramsTuple?: []; params?: {} }
    'api.v1.admin.cms.pages.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.publish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.unpublish': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.pages.set_homepage': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.cms.page_revisions.toggle': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'translationId': ParamValue,'revisionId': ParamValue} }
    'api.v1.admin.cms.templates.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.core.maintenance.update': { paramsTuple?: []; params?: {} }
    'api.v1.admin.core.maintenance.toggle': { paramsTuple?: []; params?: {} }
    'api.v1.admin.file.files.move': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.files.upsert_alt': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.file.folders.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'api.v1.admin.identity.roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}