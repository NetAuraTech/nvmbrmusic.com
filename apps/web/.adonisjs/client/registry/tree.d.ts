/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  admin: {
    cms: {
      pages: {
        render: typeof routes['admin.cms.pages.render']
        setHomepage: typeof routes['admin.cms.pages.set_homepage']
        destroy: typeof routes['admin.cms.pages.destroy']
      }
      pagesCreate: {
        render: typeof routes['admin.cms.pages_create.render']
        execute: typeof routes['admin.cms.pages_create.execute']
      }
      pagesShow: {
        render: typeof routes['admin.cms.pages_show.render']
      }
      pagesUpdate: {
        render: typeof routes['admin.cms.pages_update.render']
        execute: typeof routes['admin.cms.pages_update.execute']
        publish: typeof routes['admin.cms.pages_update.publish']
        unpublish: typeof routes['admin.cms.pages_update.unpublish']
      }
      pageTranslations: {
        execute: typeof routes['admin.cms.page_translations.execute']
      }
      pageRevisions: {
        index: typeof routes['admin.cms.page_revisions.index']
        restore: typeof routes['admin.cms.page_revisions.restore']
        toggleKeep: typeof routes['admin.cms.page_revisions.toggle_keep']
      }
      pagesPreview: {
        render: typeof routes['admin.cms.pages_preview.render']
      }
      templates: {
        render: typeof routes['admin.cms.templates.render']
        execute: typeof routes['admin.cms.templates.execute']
        applyToPage: typeof routes['admin.cms.templates.apply_to_page']
        update: typeof routes['admin.cms.templates.update']
        destroy: typeof routes['admin.cms.templates.destroy']
        edit: typeof routes['admin.cms.templates.edit']
      }
      templatesPreview: {
        render: typeof routes['admin.cms.templates_preview.render']
      }
    }
    core: {
      dashboard: {
        render: typeof routes['admin.core.dashboard.render']
      }
      maintenance: {
        render: typeof routes['admin.core.maintenance.render']
        update: typeof routes['admin.core.maintenance.update']
        toggle: typeof routes['admin.core.maintenance.toggle']
      }
    }
    file: {
      files: {
        render: typeof routes['admin.file.files.render']
        upload: typeof routes['admin.file.files.upload']
        move: typeof routes['admin.file.files.move']
        destroy: typeof routes['admin.file.files.destroy']
        upsertAlt: typeof routes['admin.file.files.upsert_alt']
        deleteAlt: typeof routes['admin.file.files.delete_alt']
      }
      fileFolders: {
        render: typeof routes['admin.file.file_folders.render']
        execute: typeof routes['admin.file.file_folders.execute']
        update: typeof routes['admin.file.file_folders.update']
        destroy: typeof routes['admin.file.file_folders.destroy']
      }
    }
    identity: {
      users: {
        render: typeof routes['admin.identity.users.render']
        destroy: typeof routes['admin.identity.users.destroy']
      }
      usersCreate: {
        render: typeof routes['admin.identity.users_create.render']
        execute: typeof routes['admin.identity.users_create.execute']
      }
      usersShow: {
        render: typeof routes['admin.identity.users_show.render']
      }
      usersUpdate: {
        render: typeof routes['admin.identity.users_update.render']
        execute: typeof routes['admin.identity.users_update.execute']
      }
      roles: {
        render: typeof routes['admin.identity.roles.render']
        destroy: typeof routes['admin.identity.roles.destroy']
      }
      rolesCreate: {
        render: typeof routes['admin.identity.roles_create.render']
        execute: typeof routes['admin.identity.roles_create.execute']
      }
      rolesShow: {
        render: typeof routes['admin.identity.roles_show.render']
      }
      rolesUpdate: {
        render: typeof routes['admin.identity.roles_update.render']
        execute: typeof routes['admin.identity.roles_update.execute']
      }
      permissions: {
        render: typeof routes['admin.identity.permissions.render']
        destroy: typeof routes['admin.identity.permissions.destroy']
      }
      permissionsCreate: {
        render: typeof routes['admin.identity.permissions_create.render']
        execute: typeof routes['admin.identity.permissions_create.execute']
      }
      permissionsUpdate: {
        render: typeof routes['admin.identity.permissions_update.render']
        execute: typeof routes['admin.identity.permissions_update.execute']
      }
    }
    log: {
      logs: {
        render: typeof routes['admin.log.logs.render']
      }
    }
    webhook: {
      deliveries: {
        render: typeof routes['admin.webhook.deliveries.render']
      }
    }
  }
  core: {
    sitemap: {
      show: typeof routes['core.sitemap.show']
    }
    robots: {
      show: typeof routes['core.robots.show']
    }
    docs: {
      show: typeof routes['core.docs.show']
    }
    home: {
      render: typeof routes['core.home.render']
    }
    openapi: {
      spec: typeof routes['core.openapi.spec']
    }
  }
  eventStream: typeof routes['event_stream']
  subscribe: typeof routes['subscribe']
  unsubscribe: typeof routes['unsubscribe']
  account: {
    profile: {
      render: typeof routes['account.profile.render']
      execute: typeof routes['account.profile.execute']
    }
    account: {
      render: typeof routes['account.account.render']
      execute: typeof routes['account.account.execute']
      destroy: typeof routes['account.account.destroy']
    }
    emailChange: {
      render: typeof routes['account.email_change.render']
      execute: typeof routes['account.email_change.execute']
    }
    preferences: {
      render: typeof routes['account.preferences.render']
      execute: typeof routes['account.preferences.execute']
    }
    index: typeof routes['account.index']
  }
  api: {
    v1: {
      account: {
        profile: {
          show: typeof routes['api.v1.account.profile.show']
          update: typeof routes['api.v1.account.profile.update']
        }
        account: {
          update: typeof routes['api.v1.account.account.update']
          destroy: typeof routes['api.v1.account.account.destroy']
        }
      }
      admin: {
        account: {
          preferences: {
            execute: typeof routes['api.v1.admin.account.preferences.execute']
          }
        }
        cms: {
          pages: {
            index: typeof routes['api.v1.admin.cms.pages.index']
            store: typeof routes['api.v1.admin.cms.pages.store']
            search: typeof routes['api.v1.admin.cms.pages.search']
            show: typeof routes['api.v1.admin.cms.pages.show']
            update: typeof routes['api.v1.admin.cms.pages.update']
            destroy: typeof routes['api.v1.admin.cms.pages.destroy']
            publish: typeof routes['api.v1.admin.cms.pages.publish']
            unpublish: typeof routes['api.v1.admin.cms.pages.unpublish']
            setHomepage: typeof routes['api.v1.admin.cms.pages.set_homepage']
          }
          pageTranslations: {
            store: typeof routes['api.v1.admin.cms.page_translations.store']
          }
          pageRevisions: {
            index: typeof routes['api.v1.admin.cms.page_revisions.index']
            restore: typeof routes['api.v1.admin.cms.page_revisions.restore']
            toggle: typeof routes['api.v1.admin.cms.page_revisions.toggle']
          }
          pagesPreview: {
            token: typeof routes['api.v1.admin.cms.pages_preview.token']
          }
          templates: {
            index: typeof routes['api.v1.admin.cms.templates.index']
            store: typeof routes['api.v1.admin.cms.templates.store']
            update: typeof routes['api.v1.admin.cms.templates.update']
            destroy: typeof routes['api.v1.admin.cms.templates.destroy']
            createFromPage: typeof routes['api.v1.admin.cms.templates.create_from_page']
          }
          templatesPreview: {
            token: typeof routes['api.v1.admin.cms.templates_preview.token']
          }
          builderOperations: {
            execute: typeof routes['api.v1.admin.cms.builder_operations.execute']
            presence: typeof routes['api.v1.admin.cms.builder_operations.presence']
            saveDraft: typeof routes['api.v1.admin.cms.builder_operations.save_draft']
          }
        }
        core: {
          dashboard: {
            index: typeof routes['api.v1.admin.core.dashboard.index']
          }
          maintenance: {
            index: typeof routes['api.v1.admin.core.maintenance.index']
            update: typeof routes['api.v1.admin.core.maintenance.update']
            toggle: typeof routes['api.v1.admin.core.maintenance.toggle']
          }
        }
        file: {
          files: {
            index: typeof routes['api.v1.admin.file.files.index']
            store: typeof routes['api.v1.admin.file.files.store']
            show: typeof routes['api.v1.admin.file.files.show']
            move: typeof routes['api.v1.admin.file.files.move']
            destroy: typeof routes['api.v1.admin.file.files.destroy']
            upsertAlt: typeof routes['api.v1.admin.file.files.upsert_alt']
            deleteAlt: typeof routes['api.v1.admin.file.files.delete_alt']
          }
          folders: {
            index: typeof routes['api.v1.admin.file.folders.index']
            store: typeof routes['api.v1.admin.file.folders.store']
            show: typeof routes['api.v1.admin.file.folders.show']
            children: typeof routes['api.v1.admin.file.folders.children']
            update: typeof routes['api.v1.admin.file.folders.update']
            destroy: typeof routes['api.v1.admin.file.folders.destroy']
          }
        }
        identity: {
          users: {
            index: typeof routes['api.v1.admin.identity.users.index']
            store: typeof routes['api.v1.admin.identity.users.store']
            show: typeof routes['api.v1.admin.identity.users.show']
            update: typeof routes['api.v1.admin.identity.users.update']
            destroy: typeof routes['api.v1.admin.identity.users.destroy']
          }
          roles: {
            index: typeof routes['api.v1.admin.identity.roles.index']
            store: typeof routes['api.v1.admin.identity.roles.store']
            show: typeof routes['api.v1.admin.identity.roles.show']
            update: typeof routes['api.v1.admin.identity.roles.update']
            destroy: typeof routes['api.v1.admin.identity.roles.destroy']
          }
          permissions: {
            index: typeof routes['api.v1.admin.identity.permissions.index']
          }
        }
        log: {
          logs: {
            index: typeof routes['api.v1.admin.log.logs.index']
          }
        }
        webhook: {
          deliveries: {
            index: typeof routes['api.v1.admin.webhook.deliveries.index']
          }
        }
      }
      auth: {
        login: {
          execute: typeof routes['api.v1.auth.login.execute']
        }
        register: {
          store: typeof routes['api.v1.auth.register.store']
        }
        forgotPassword: {
          store: typeof routes['api.v1.auth.forgot_password.store']
        }
        resetPassword: {
          store: typeof routes['api.v1.auth.reset_password.store']
        }
        emailVerification: {
          store: typeof routes['api.v1.auth.email_verification.store']
        }
        acceptInvitation: {
          store: typeof routes['api.v1.auth.accept_invitation.store']
        }
        logout: {
          destroy: typeof routes['api.v1.auth.logout.destroy']
        }
        me: {
          show: typeof routes['api.v1.auth.me.show']
        }
      }
    }
  }
  auth: {
    session: {
      render: typeof routes['auth.session.render']
      execute: typeof routes['auth.session.execute']
      destroy: typeof routes['auth.session.destroy']
    }
    twoFactor: {
      render: typeof routes['auth.two_factor.render']
      verify: typeof routes['auth.two_factor.verify']
    }
    register: {
      render: typeof routes['auth.register.render']
      execute: typeof routes['auth.register.execute']
    }
    forgotPassword: {
      render: typeof routes['auth.forgot_password.render']
      execute: typeof routes['auth.forgot_password.execute']
    }
    resetPassword: {
      render: typeof routes['auth.reset_password.render']
      execute: typeof routes['auth.reset_password.execute']
    }
    acceptInvitation: {
      render: typeof routes['auth.accept_invitation.render']
      execute: typeof routes['auth.accept_invitation.execute']
    }
    emailVerification: {
      execute: typeof routes['auth.email_verification.execute']
    }
    social: {
      render: typeof routes['auth.social.render']
      execute: typeof routes['auth.social.execute']
      redirect: typeof routes['auth.social.redirect']
      callback: typeof routes['auth.social.callback']
      unlink: typeof routes['auth.social.unlink']
    }
  }
  cms: {
    contact: {
      execute: typeof routes['cms.contact.execute']
    }
    page: {
      localised: {
        render: typeof routes['cms.page.localised.render']
      }
      render: typeof routes['cms.page.render']
    }
  }
  webhook: {
    receivers: {
      receive: typeof routes['webhook.receivers.receive']
    }
  }
  health: {
    liveness: typeof routes['health.liveness']
    readiness: typeof routes['health.readiness']
  }
}
