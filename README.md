# AdonisJS Foundry

A production-ready boilerplate and headless CMS for AdonisJS v7 with Inertia.js and React. Foundry gives you a solid, well-architected starting point so you can focus on building your product from day one.

## Description

AdonisJS Foundry is built on AdonisJS v7 and follows a domain-driven architecture with a clean separation between a per-domain transport layer and a per-domain business layer (actions, repositories, services). It ships with a complete authentication system (including TOTP two-factor authentication), OAuth providers, user settings, email workflows, a full admin panel (CMS) with a visual page builder, file management, template system, role-based access control, user preferences, structured logging, caching, image optimization, SEO tooling, per-client API rate limiting, a self-hosted OpenAPI reference, background jobs with scheduled maintenance, and inbound webhooks — plus a React + Inertia frontend with SSR support, all wired up and ready to go.

## Key Features

- **Complete Authentication** — Registration, login, logout, email verification, password reset
- **Two-Factor Authentication** — TOTP enrollment from Settings with one-time recovery codes, code-gated disable flow, and a TOTP challenge at login
- **OAuth Providers** — GitHub, Google, Facebook with account linking and unlinking
- **User Invitation** — Admin-driven invitation flow with token-based acceptance
- **User Settings** — Profile, account credentials, email change, account deletion
- **User Preferences** — Theme (dark/light) with API-driven persistence
- **Email Workflows** — Email change with dual confirmation (new + old address), password change notification, admin invitation, contact form notification
- **Admin Panel (CMS)** — Dashboard, user/role/permission management, page management, file management, template management, log viewer, maintenance settings — with a dedicated layout
- **Visual Page Builder** — Block-based page editor with real-time collaborative editing (SSE via Transmit), optimistic field locking, presence tracking, live preview, and draft auto-save
- **Block System** — 17 block types (section, grid, flex, title, paragraph, button, separator, icon, form, field, htmltext, image, video, carousel, list, quote, iframe) with responsive props
- **Page Translations & Revisions** — Multi-locale pages with per-locale slugs, revision history with restore/pin, and content seeding between locales
- **File Management** — Upload, folder organization, per-locale named alt text system, multi-disk storage (local, S3, R2)
- **Image Optimization** — Server-side responsive variant generation (400w, 800w, 1200w WebP) via Sharp with CLS-preventing dimension extraction
- **Template System** — Page and block templates, create from existing page, apply template to page
- **Cache Service** — Redis-backed cache with namespace support, get-or-set pattern, pattern deletion
- **Contact Form** — Dynamic contact form block with email notification
- **SEO** — Dynamic sitemap.xml and robots.txt generation, per-page meta title/description/image, homepage designation
- **Content Sanitization** — Server-side DOMPurify (via jsdom) for all rich-text content
- **Role-Based Access Control** — Custom role/permission system with many-to-many pivot, permission checking, frontend guards, and admin management UI for users, roles, and permissions
- **Security First** — Selector/validator tokens, attempt tracking, CSRF protection, unverified account protection
- **Per-Client Rate Limiting** — Per-user request budget on the `/api/v1/*` surface, on top of the per-route throttles
- **OpenAPI Documentation** — Runtime-generated OpenAPI 3 spec (`/api/v1/openapi.json`) scoped to the caller's permissions, with a self-hosted interactive reference at `/api/docs`
- **Background Jobs** — Redis job queue (`@adonisjs/queue`) with a worker process and scheduled maintenance jobs (log pruning, backup retention)
- **Incoming Webhooks** — HMAC-signed, replay-protected inbound deliveries with idempotent recording, queued processing, and a delivery log (admin UI + REST)
- **Full-Text Search** — Optional Typesense-backed search across CMS page translations, with graceful fallback to the standard listing
- **Monitoring** — Sentry on both sides: `@sentry/node` for the runtime, `@sentry/react` inlined into the browser bundle
- **Domain-Driven Architecture** — Clean separation per domain: actions, domain entities, repositories, services, and thin controllers
- **Structured Logging** — Categorized logs (AUTH, SECURITY, BUSINESS, API, DATABASE, PERFORMANCE) with Sentry integration, database persistence (`log_entries`), an in-admin log viewer, and a retention command
- **Maintenance Mode** — Runtime toggle (admin UI or `maintenance:on`/`maintenance:off`), custom message, IP allowlist, and a public maintenance page; health probes stay reachable
- **i18n Ready** — Full internationalization support (EN, FR) on backend (AdonisJS i18n)
- **Inertia + React** — Modern SPA experience with SSR support, no API boilerplate
- **Real-Time Events** — AdonisJS Transmit (SSE) for live builder collaboration
- **Tailwind CSS v4** — Utility-first styling with a component library (atoms/molecules/organisms)
- **Type-Safe Routing** — Tuyau integration for end-to-end type-safe route generation
- **Pagination** — Generic pagination service with frontend pagination component
- **Dark/Light Theme** — Client-side theme toggle with server-side preference persistence
- **Frontend Guards** — Authenticated, role-based, and permission-based route guards
- **Docker Ready** — Dockerfile and docker-compose for development and production environments
- **Database Backup** — Full & differential backups with multi-storage (local, S3, R2), encryption, retention policy, and health checks

## Tech Stack

| Category             | Technology                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------- |
| **Backend**          | AdonisJS v7, Lucid ORM, VineJS                                                                |
| **Frontend**         | React 19, Inertia.js, Tailwind CSS v4                                                         |
| **Language**         | TypeScript 5.9                                                                                |
| **Database**         | PostgreSQL (primary), SQLite (dev alternative)                                                |
| **Cache / Session**  | Redis                                                                                         |
| **Auth**             | Session-based (@adonisjs/auth), opt-in API tokens, OAuth (@adonisjs/ally)                     |
| **Authorization**    | Custom role/permission system (models, services, frontend guards)                             |
| **Email**            | @adonisjs/mail (SMTP) with Edge templates                                                     |
| **File Storage**     | @adonisjs/drive (local FS, S3, Cloudflare R2)                                                 |
| **Image Processing** | Sharp (responsive WebP variant generation)                                                    |
| **Real-Time**        | @adonisjs/transmit (SSE)                                                                      |
| **Queue**            | @adonisjs/queue (Redis-backed jobs, worker, scheduled maintenance)                            |
| **Rate Limiting**    | @adonisjs/limiter (per-route throttles + per-client API budget)                               |
| **API Docs**         | OpenAPI 3 (runtime-generated spec + self-hosted reference UI)                                 |
| **Search**           | Typesense (optional, CMS page full-text search)                                               |
| **Sanitization**     | DOMPurify + jsdom (server-side HTML sanitization)                                             |
| **Routing**          | Tuyau (type-safe client)                                                                      |
| **Icons**            | Iconify React                                                                                 |
| **Notifications**    | Sonner (toast)                                                                                |
| **Monitoring**       | Sentry (@sentry/node + @sentry/react)                                                         |
| **Build**            | Vite 8, @adonisjs/assembler                                                                   |
| **Design System**    | `@foundry/design-system` (shared React workspace: atoms, molecules, organisms, design tokens) |
| **Testing**          | Japa (backend: unit, functional), Vitest (frontend)                                           |

## Quick Start

### Requirements

| Tool     | Version                     |
| -------- | --------------------------- |
| Node.js  | \>= 24.x                    |
| npm      | \>= 11.x                    |
| Database | PostgreSQL / MySQL / SQLite |

### Installation

```bash
# Clone the repository
git clone https://github.com/NetAuraTech/adonisjs-foundry.git my-app
cd my-app

# Install dependencies
npm install

# Start infrastructure (PostgreSQL, Redis, MailHog, Typesense)
docker compose up -d

# Configure environment
cp apps/web/.env.example apps/web/.env

# Generate app key and run migrations (from the app workspace)
cd apps/web
node ace generate:key
node ace migration:run

# Start the development server
npm run dev
```

The app is available at `http://localhost:3333`.

> [!NOTE]
> The application lives in the `apps/web` workspace. `node ace` commands always run from there; the npm scripts (`dev`, `build`, `test`, `lint`, `format`, `typecheck`, …) also work from the repo root.

> [!NOTE]
> This repository uses LF line endings (`oxfmt` enforces `endOfLine: lf` and `.gitattributes` sets `* text=auto`). On Windows, run `git config core.autocrlf false` before your first commit to keep the working tree LF-only and avoid CRLF churn.

### Create Your Project

AdonisJS Foundry is **not meant to be used as-is**. It is a boilerplate — you should create your own repository from it while keeping a link to the source so you can pull future updates.

#### 1. Create your new repository

```bash
# Create a new empty repo on GitHub/GitLab, then:
mkdir my-project && cd my-project
git init
```

#### 2. Add Foundry as a remote

```bash
# Add the Foundry repo as a remote called "foundry"
git remote add foundry https://github.com/NetAuraTech/adonisjs-foundry.git

# Pull the entire codebase from Foundry's main branch
git fetch foundry
git merge foundry/main --allow-unrelated-histories
```

#### 3. Add your own origin remote

```bash
# Link your personal repo
git remote add origin git@github.com:your-username/my-project.git
git push -u origin main
```

#### 4. Pull future updates from Foundry

When a new version of Foundry is released, you can pull the changes into your project:

```bash
# Fetch the latest changes from Foundry
git fetch foundry

# Merge them into your branch (resolve conflicts if needed)
git merge foundry/main
```

> [!TIP]
> You can also cherry-pick specific commits instead of merging the entire branch if you only want selected features.

#### Summary of remotes

| Remote    | URL                                                   | Purpose                          |
| --------- | ----------------------------------------------------- | -------------------------------- |
| `origin`  | `git@github.com:your-username/my-project.git`         | Your project repository          |
| `foundry` | `https://github.com/NetAuraTech/adonisjs-foundry.git` | Upstream boilerplate (read-only) |

### Available Scripts

| Script               | Description                     |
| -------------------- | ------------------------------- |
| `npm run dev`        | Start the dev server with HMR   |
| `npm run build`      | Build for production            |
| `npm start`          | Start the production server     |
| `npm test`           | Run tests (Japa)                |
| `npm run test:front` | Run frontend tests (Vitest)     |
| `npm run lint`       | Run oxlint                      |
| `npm run format`     | Format code with oxfmt          |
| `npm run typecheck`  | Type-check backend and frontend |

## Configuration

### Environment Setup

Copy `apps/web/.env.example` to `apps/web/.env` and configure:

```env
# Node
TZ=UTC
PORT=3333
HOST=localhost
NODE_ENV=development

# App
LOG_LEVEL=info
APP_KEY=
APP_URL=http://localhost:3333
APP_NAME=AdonisJS Foundry

# Session
SESSION_DRIVER=redis

# Auth guards — session (`web`) always on; opt-in opaque-token guard (`api`)
# exposes the token-only REST API under `/api/v1/*`
AUTH_GUARD_WEB=true
AUTH_GUARD_API=false
AUTH_API_TOKEN_EXPIRY=30 days
AUTH_API_CLIENT_URL=

# Database
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=user
PG_PASSWORD=password
PG_DB_NAME=app

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_SOCKET=
# Logical database (0-15) used on a shared Redis instance — set a distinct
# value per site to isolate their data. Defaults to 0.
REDIS_DB=0

# Queue — `redis` consumes jobs via a worker process (`node ace queue:work`);
# `sync` runs them inline in the calling process (no worker, no Redis).
QUEUE_DRIVER=redis
# Redis connection used by the queue (see config/redis.ts).
QUEUE_CONNECTION=local
# Worker settings.
QUEUE_CONCURRENCY=5
QUEUE_MAX_RETRIES=3
# Scheduled maintenance tasks (see config/maintenance.ts). Each value is a
# duration string ("1d", "24h", "30m"); "0" disables the task. Unset values
# fall back to a daily schedule.
MAINTENANCE_LOG_PRUNE_SCHEDULE=
MAINTENANCE_BACKUP_RETENTION_SCHEDULE=
# Retention window in days for Log Entry pruning (default 180).
LOG_RETENTION_DAYS=

# Mail
MAIL_MAILER=smtp
MAIL_FROM_NAME=${APP_NAME}
MAIL_FROM_ADDRESS=contact@example.com

# SMTP
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USERNAME=username
SMTP_PASSWORD=password

# Sentry — the same DSN feeds the Node runtime (config/sentry.ts) and the
# browser bundle (inlined at build time). Leave unset to disable error
# reporting on both sides. Optional SENTRY_RELEASE overrides the frontend
# release tag (defaults to the app version).
SENTRY_DSN=<your_dsn_url>

# OAuth
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Drive (File Storage)
DRIVE_DISK=fs
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET=
R2_KEY=
R2_SECRET=
R2_BUCKET=
R2_ENDPOINT=

# File Upload
MAX_UPLOAD_SIZE=10

# Limiter
LIMITER_STORE=redis
# Default per-client API rate limit (requests/minute) when a user has no custom limit
API_RATE_LIMIT_DEFAULT=60

# CMS content policies (page builder) — comma-separated
CMS_IFRAME_ALLOWLIST=www.google.com,maps.google.com
CMS_VIDEO_PROVIDERS=youtube,vimeo

# Inbound webhooks — shared HMAC-SHA256 signing secret; leave empty to disable
# the webhook surface. WEBHOOK_REPLAY_WINDOW bounds accepted clock skew (seconds).
WEBHOOK_SECRET=
WEBHOOK_REPLAY_WINDOW=300

# CMS page search (Typesense) — disabled by default; the admin page list falls
# back to its standard filtered query.
SEARCH_ENABLED=false
TYPESENSE_HOST=127.0.0.1
TYPESENSE_PORT=8108
TYPESENSE_API_KEY=
TYPESENSE_COLLECTION=cms_page_translations
TYPESENSE_SEARCH_LIMIT=20

# Sitemap — comma-separated additions and exclusions
SITEMAP_ADDITIONS=
SITEMAP_EXCLUSIONS=
```

### OAuth Setup

OAuth providers are **automatically enabled** when valid credentials are present. Providers with empty or `dummy` credentials are silently disabled — no code change required.

Register the following callback URLs in your OAuth app dashboards:

```
http://localhost:3333/oauth/github/callback
http://localhost:3333/oauth/google/callback
http://localhost:3333/oauth/facebook/callback
```

### Docker

The project includes Docker configurations for both development and production.

**Development** — Spin up PostgreSQL, Redis, Typesense, and MailHog:

```bash
docker compose up -d
```

**Production** — Multi-stage build with Nginx reverse proxy, 3 app replicas, and a queue worker:

```bash
docker compose -f docker-compose.prod.yml up -d
```

The `worker` service runs `node ace queue:work -q default,auth,maintenance,webhook`
(see `config/queue.ts`) and consumes the job queues — currently the
password-reset mail (sent asynchronously after the forgot-password response),
the scheduled maintenance tasks (Log Entry pruning and backup retention
enforcement, registered at boot by `start/scheduler.ts`), and the inbound
webhook deliveries. With
`QUEUE_DRIVER=redis` the app enqueues the job and the worker delivers it; if
no worker is running, jobs wait in Redis.

## Authentication

Foundry ships with a complete authentication system covering every standard flow.

### Flows

| Flow               | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| Registration       | Email + password, with automatic email verification                 |
| Login              | Email + password (session-based)                                    |
| Logout             | Session invalidation + CSRF rotation                                |
| Password Reset     | Selector/validator token, 1 hour expiry, attempt tracking           |
| Two-Factor (TOTP)  | TOTP challenge after a correct password; recovery codes as fallback |
| Email Verification | Token-based, sent on registration                                   |
| OAuth Login        | GitHub, Google, Facebook                                            |
| OAuth Linking      | Link/unlink providers from settings                                 |
| Define Password    | Prompted after OAuth-only registration                              |
| Invitation         | Admin sends invite → user accepts via token link and sets password  |

### Two-Factor Authentication

Foundry ships TOTP two-factor authentication, managed from **Settings → Account**:

- **Enrollment** — begin from the account page (generates a TOTP secret and an `otpauth://` URI for an authenticator app), then confirm with a valid 6-digit code. On success, one-time **recovery codes** are generated and displayed exactly once.
- **Login** — after a correct password, a user with 2FA enabled is challenged for a 6-digit TOTP code **or** an unused recovery code before any session is created (`/two-factor`, throttled to 5 attempts / 15 min).
- **Recovery codes** — one-time use; entering one consumes it.
- **Disable** — requires the current password plus a valid TOTP code or recovery code.

### Token Security

All token-based workflows use the **selector/validator pattern**:

- **Selector** — stored in plain text for fast database lookup
- **Validator** — hashed before storage, never exposed
- **Full token** — `selector.validator` sent to the user via email

| Token Type           | Expiry   | Attempt Tracking |
| -------------------- | -------- | ---------------- |
| `PASSWORD_RESET`     | 1 hour   | Max 3 attempts   |
| `EMAIL_VERIFICATION` | 24 hours | —                |
| `EMAIL_CHANGE`       | 24 hours | —                |
| `PENDING_INVITE`     | 7 days   | —                |

### Authentication Guards

Two guards are available in `config/auth.ts`, toggled by environment variable:

| Guard | Driver          | Env flag         | Default  |
| ----- | --------------- | ---------------- | -------- |
| `web` | Session cookies | `AUTH_GUARD_WEB` | enabled  |
| `api` | Opaque tokens   | `AUTH_GUARD_API` | disabled |

- **`web`** — the browser/Inertia guard. Session cookie, CSRF protection.
- **`api`** — opaque access tokens (`Authorization: Bearer`), designed for the REST API consumed by non-browser clients (mobile apps, scripts). Enabling it exposes the token-only `/api/v1/*` surface — the full auth flow (`/api/v1/auth/*`: login, register, forgot/reset password, verify email, accept invitation, logout, me) plus profile and account endpoints. Token lifetime is configurable via `AUTH_API_TOKEN_EXPIRY` (default: `30 days`).

The admin JSON surface under `/api/v1/admin/*` (users, roles, permissions, pages, templates, files, folders, builder, dashboard, logs, maintenance, theme) accepts **both** guards when `AUTH_GUARD_API=true`: a browser keeps using its session cookie while scripts authenticate with a Bearer token — permissions resolve identically either way. Inertia pages remain session-only, and the rest of `/api/v1/*` (auth, profile, account) remains token-only: the two guards never overlap by accident.

For a headless deployment (no session guard at all): set `AUTH_GUARD_WEB=false` and `AUTH_GUARD_API=true`.

**OAuth and mobile clients**: the OAuth flow relies on the browser session (state/nonce + flash messages) and always redirects back to the web app after a provider callback. A mobile client completes OAuth inside a system browser (the web app creates its session as usual), then obtains an API token via `POST /api/v1/auth/login` — OAuth-only users set a password first through the existing "define password" flow. No token is ever placed in a redirect URL.

### Per-Client Rate Limiting

On top of the per-route throttles, every authenticated `/api/v1/*` route group carries a **per-client budget** (`apiClientThrottle` in `start/limiter.ts`): keyed by the authenticated user id (never the raw IP), it allows `user.apiRateLimit ?? API_RATE_LIMIT_DEFAULT` requests per minute across the whole API surface. Exceeding it returns `429` with the standard JSON error envelope and rate-limit headers.

## Admin Panel (CMS)

Foundry includes a full admin panel accessible at `/admin`, protected by authentication and permission middleware.

### Features

| Feature               | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| Dashboard             | Overview page at `/admin`                                                    |
| User Management       | Paginated list, invite, show, edit, delete — with role and status management |
| Role Management       | Create, show, edit, delete roles and assign permissions                      |
| Permission Management | Manage the permission catalog (list, create, edit, delete)                   |
| Page Management       | Create, edit, publish/unpublish, delete pages with multi-locale translations |
| Page Builder          | Visual block-based editor with real-time collaboration, locking, and preview |
| Page Revisions        | Revision history per translation with restore and pin/unpin                  |
| File Management       | Upload, folder organization, per-locale alt text, move, and delete           |
| Template System       | Create, edit, delete templates — create from page and apply template to page |
| Log Viewer            | Browse persisted application logs at `/admin/logs`                           |
| Maintenance Mode      | Toggle maintenance, set message, and manage the IP allowlist                 |

### Admin Layout

The admin panel uses a dedicated layout (`inertia/layouts/admin.tsx`) composed from the shared `@foundry/design-system` workspace:

- **Sidebar** — Navigation component (`admin-sidebar` export) with content and access-control sections
- **Header** — Admin-specific header (`admin-header` export)
- **Main content** — Adaptive content area (`admin-main` export)

## Page Builder

The page builder is a visual, block-based editor with real-time collaborative editing capabilities.

### Block Types

| Block       | Description                                                                                      | Container |
| ----------- | ------------------------------------------------------------------------------------------------ | --------- |
| `section`   | Full-width wrapper with background, padding, and anchor ID                                       | ✅        |
| `grid`      | Responsive column grid with configurable gap and alignment                                       | ✅        |
| `flex`      | Flexible container with direction, gap, align, justify, wrap                                     | ✅        |
| `title`     | Heading (h1–h4) with color and highlight color                                                   | —         |
| `paragraph` | Text block with font-size, variant, and spacing                                                  | —         |
| `button`    | CTA button with page/route/external link, icon, and alignment                                    | —         |
| `separator` | Horizontal divider with spacing and color                                                        | —         |
| `icon`      | Iconify icon with color, background, and size                                                    | —         |
| `form`      | HTML form wrapper with route action                                                              | ✅        |
| `field`     | Form field (text, email, textarea, tel, select) with label                                       | —         |
| `htmltext`  | Raw HTML content (sanitized via DOMPurify)                                                       | —         |
| `image`     | Image with named alt text resolution and responsive variants                                     | —         |
| `video`     | Embedded video — YouTube/Vimeo URL (enabled providers) or direct media file                      | —         |
| `carousel`  | Slide container (aspect, arrows, dots) whose children are the slides                             | ✅        |
| `list`      | Ordered or unordered text list                                                                   | —         |
| `quote`     | Quotation with attribution and variant (default, highlight, plain)                               | —         |
| `iframe`    | Embedded `https` iframe restricted to the configured hostname allowlist (`CMS_IFRAME_ALLOWLIST`) | —         |

All props support responsive values (`default`, `sm`, `md`, `lg`, `xl`) where applicable.

### Collaborative Editing

The builder uses **AdonisJS Transmit (SSE)** for real-time collaboration:

- **Presence tracking** — See who is currently editing a page translation
- **Optimistic field locking** — Lock a field while editing (5s TTL auto-renewed on heartbeat)
- **Lock conflict** — If another user holds a lock, the field is shown as read-only with their name/color
- **Auto-cleanup** — Locks and sessions are released on disconnect (tab close, network drop)
- **Draft sync** — In-progress content is saved to Redis so late-joining editors see the live state
- **Live preview** — Iframe preview with token-based authentication

### Content Pipeline

```
Client edits → API operation (POST) → Server validates → Broadcast to all peers (SSE)
                                     → Sanitize rich_text (DOMPurify)
                                     → Save revision before update
                                     → Persist to database
```

### Revisions

Each translation maintains a revision history. A revision is automatically saved before every content update. Revisions can be:

- **Restored** — Replaces the current content (a pre-restore revision is saved first)
- **Pinned** — Pinned revisions are excluded from auto-purge

## File Management

The CMS includes a complete file management system with folder organization, multi-disk storage, and per-locale alt text.

### Storage Disks

| Disk | Description                   | Config                   |
| ---- | ----------------------------- | ------------------------ |
| `fs` | Local filesystem (`storage/`) | Default, `DRIVE_DISK=fs` |
| `s3` | Amazon S3 or S3-compatible    | `DRIVE_DISK=s3`          |
| `r2` | Cloudflare R2                 | `DRIVE_DISK=r2`          |

All CMS files are stored under the `files/` directory on the configured Drive disk, alongside the backup system's `backup/` folder.

### Image Optimization

When a page is rendered, `ImageOptimizerService` processes each referenced image:

1. Extracts original dimensions (width/height) for CLS prevention
2. Generates responsive WebP variants at 400w, 800w, and 1200w using Sharp (Lanczos3 kernel)
3. Skips SVGs and variants larger than the source
4. Returns variant URLs for `<img srcset>` rendering

### Alt Text System

Files support a **named alt text** system with locale-specific entries:

- **Named alts** — Stored in `file_alts` table, keyed by `(file_id, locale, key)`
- **Alt override** — Inline override per-block that bypasses the named system
- Resolution: `altOverride > named alt (by locale + key) > empty string`

## Template System

Templates allow saving and reusing page layouts and individual block configurations.

| Type    | Description                                    |
| ------- | ---------------------------------------------- |
| `page`  | Full page layout (entire block tree)           |
| `block` | Single pre-configured block with specific type |

- **Create from page** — Save a page's current content as a reusable template
- **Apply to page** — Replace a translation's content with a template (revision saved first)

## Contact Form

The `contact_form` block type renders a configurable contact form with:

- Dynamic field list (text, email, textarea, tel, select)
- Custom recipient email, submit label, and success message
- Email notification sent by `ContactMailService` on submit

## SEO

Foundry generates SEO essentials dynamically:

- **`/sitemap.xml`** — Auto-generated XML sitemap with all published page translations
- **`/robots.txt`** — Generated robots.txt blocking `/admin/*` and `/settings/*`
- **Meta tags** — Per-page `metaTitle`, `metaDescription`, and `metaImage` (Open Graph)
- **Homepage** — Any page can be designated as the homepage (`is_homepage` flag)

## User Settings

Settings are split into domains, each backed by a dedicated service, repository, and controller.

### Profile

- Username (unique, auto-generated from email on registration)
- Avatar

### Account

- Email change (confirmation link to new address + security notification to old address)
- Password change (requires current password verification)
- Two-factor authentication (TOTP enrollment, recovery codes, disable flow)
- OAuth provider linking/unlinking
- Account deletion (requires password confirmation)

### Preferences

- Theme selection (dark/light) with API-driven persistence
- Accessible at `/settings/preferences`

## Authorization (RBAC)

Foundry implements a **custom role/permission system** without external authorization libraries:

### Backend

| Layer                  | Location                            | Responsibility                                                  |
| ---------------------- | ----------------------------------- | --------------------------------------------------------------- |
| **Role model**         | `src/identity/models/role.ts`       | Roles with `hasPermission()`, `isAdmin`, system role protection |
| **Permission model**   | `src/identity/models/permission.ts` | Permissions with system permission protection                   |
| **Pivot table**        | `role_permission`                   | Many-to-many relationship between roles and permissions         |
| **Role actions**       | `src/identity/actions/role/`        | Role business logic (create, update, delete, list)              |
| **Permission actions** | `src/identity/actions/permission/`  | Permission business logic (create, update, delete, list)        |
| **Seeders**            | `database/seeders/`                 | `role_seeder.ts`, `permission_seeder.ts` for default data       |

Permission checking is done via model methods: `role.hasPermission(slug)`, `role.assignPermission(id)`, `role.syncPermissions(ids)`.

### Frontend Guards

React components to protect pages and UI elements:

| Guard           | File                               | Description                                         |
| --------------- | ---------------------------------- | --------------------------------------------------- |
| `Authenticated` | `inertia/guards/authenticated.tsx` | Restrict access to authenticated users              |
| `HasRole`       | `inertia/guards/has_role.tsx`      | Restrict access by role                             |
| `CanAccess`     | `inertia/guards/can_access.tsx`    | Restrict access by permission (single, any, or all) |

Guards read the user's permissions from Inertia shared props via the `useAuth` hook (`can`, `canAny`, `canAll`).

## Backup

Foundry includes a full database backup system with automatic strategy selection, encryption, and retention policy. Backup storage uses the same `@adonisjs/drive` package as the CMS file system — all backup files are stored under the `backup/` prefix on the configured disk.

### Strategy

| Day                   | Type             | Description                                     |
| --------------------- | ---------------- | ----------------------------------------------- |
| Sunday (configurable) | **Full**         | Complete `pg_dump` of the entire database       |
| Monday – Saturday     | **Differential** | Only tables modified since the last full backup |

If no full backup exists when a differential is requested, a full backup is performed automatically.

### Ace Commands

| Command                                   | Description                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------ |
| `node ace backup:run`                     | Run a backup (auto-detects type based on schedule)                             |
| `node ace backup:run --type=full`         | Force a full backup                                                            |
| `node ace backup:run --type=differential` | Force a differential backup                                                    |
| `node ace backup:list`                    | List all available backups (with `--limit` flag)                               |
| `node ace backup:restore <filename>`      | Restore a backup (with `--force` to skip confirmation)                         |
| `node ace backup:cleanup`                 | Apply retention policy and delete old backups                                  |
| `node ace backup:health-check`            | Check backup system health (storage availability, last backup age, disk space) |

### Storage

Backups use the same Drive disks as the CMS file system (`fs`, `s3`, `r2`), configured via `BACKUP_STORAGE_DISK` (defaults to `fs`). All backup files are stored under the `backup/` prefix to avoid colliding with the `files/` directory used by file uploads.

| Disk | Description                          | Config                            |
| ---- | ------------------------------------ | --------------------------------- |
| `fs` | Local filesystem (`storage/backup/`) | Default, `BACKUP_STORAGE_DISK=fs` |
| `s3` | Amazon S3 or S3-compatible           | `BACKUP_STORAGE_DISK=s3`          |
| `r2` | Cloudflare R2                        | `BACKUP_STORAGE_DISK=r2`          |

### Pipeline

Each backup goes through: **pg_dump → gzip compression → AES-256-CBC encryption (optional) → upload to Drive → manifest written**.

### Retention Policy

| Window  | Default                  |
| ------- | ------------------------ |
| Daily   | 7 days                   |
| Weekly  | 4 weeks (Sunday backups) |
| Monthly | 3 months (1st of month)  |
| Yearly  | 1 per year (1st January) |

Retention is enforced automatically by a scheduled queue job (`EnforceBackupRetentionJob`, on the `maintenance` queue) that runs the same policy as `node ace backup:cleanup`. The interval is set with `MAINTENANCE_BACKUP_RETENTION_SCHEDULE` (default `1d`; `"0"` disables it).

### Backup Environment Variables

```env
# Storage — uses the same Drive disks as CMS (fs, s3, r2)
BACKUP_STORAGE_DISK=fs

# Schedule & Encryption
BACKUP_TIME=02:00
BACKUP_ENCRYPTION_ENABLED=true

# Retention
BACKUP_RETENTION_DAILY=7
BACKUP_RETENTION_WEEKLY=4
BACKUP_RETENTION_MONTHLY=3
BACKUP_RETENTION_YEARLY=1

# Health
BACKUP_MAX_AGE_HOURS=25
BACKUP_MAX_SIZE_MB=500
BACKUP_MIN_FREE_SPACE_GB=5

# Notifications
BACKUP_NOTIFICATION_EMAIL=
BACKUP_NOTIFY_SUCCESS=false
BACKUP_NOTIFY_FAILURE=true
BACKUP_NOTIFY_HEALTH_CHECK=true

# Differential
BACKUP_EXCLUDED_TABLES=
```

## Maintenance Mode

Foundry ships a built-in maintenance mode, gated by the `maintenance` feature flag (`config/features.ts`):

- **Toggle** — from the admin panel (`/admin/settings/maintenance`) or via `node ace maintenance:on` / `maintenance:off`
- **Message** — custom message shown on the public maintenance page (`node ace maintenance:message`)
- **IP allowlist** — exempt specific IPs from the maintenance page (`maintenance:allow-ip`, `maintenance:remove-ip`)
- **Schedule** — programmatic on/off at a given time (`maintenance:schedule`)
- **Probes stay up** — `/health` and `/health/ready` are registered outside the maintenance middleware so load balancers keep probing

## Incoming Webhooks

Foundry ships an inbound-webhook facility: a public receiver, signature verification, and a delivery log.

- **Receiver** — `POST /webhooks/:receiver`, registered outside the maintenance/auth middleware (like the health routes) so external senders reach it directly. Each receiver is a named route; the receiver name flows into the delivery log and the security audit trail. Adding a receiver is a one-line route.
- **Signature** — senders sign each delivery with the shared `WEBHOOK_SECRET`: `X-Signature` is the hex HMAC-SHA256 of `${X-Timestamp}.${rawBody}`, with `X-Timestamp` in unix seconds. Deliveries whose timestamp falls outside the replay window (`WEBHOOK_REPLAY_WINDOW`, default 300 s) are rejected as replays. An empty `WEBHOOK_SECRET` disables the whole surface.
- **Idempotency** — the `X-Delivery-Id` header deduplicates retries; without it, a stable digest of the payload is used. A verified delivery always answers `202 Accepted` — the 202 acknowledges receipt, not completion.
- **Processing** — the delivery is recorded as `pending` and a job on the `webhook` queue advances it to `processed`; once retries are exhausted the delivery is marked `failed` and a security log entry is written.
- **Delivery log** — the `webhook_deliveries` table, browsable at `/admin/webhooks/deliveries` (`webhooks.view` permission) and via `GET /api/v1/admin/webhooks/deliveries`.

```
sender:  sig = HMAC_SHA256(secret, `${ts}.${rawBody}`)   (hex)
         POST /webhooks/:receiver
         X-Timestamp: ts        X-Signature: sig
         [X-Delivery-Id: evt_123]
```

## Architecture

Foundry follows a **domain-driven architecture** with a strict layering convention.

The application lives in the `apps/web` workspace (`@foundry/web`); the repo root holds the workspaces manifest, the single lockfile, repo-wide lint/format configs, CI, Docker and docs. The shared React component library (atoms, molecules, organisms, design tokens) lives in the `packages/design-system` workspace (`@foundry/design-system`).

```
adonisjs-foundry/
├── apps/
│   └── web/                # The complete AdonisJS application (layout below)
├── packages/
│   └── design-system/      # Shared React design system (@foundry/design-system)
├── docs/                   # Agent docs, ADRs
├── .github/workflows/      # CI: tests, codegen drift check, release
├── docker-compose.yml      # Dev infrastructure (PostgreSQL, Redis, MailHog, Typesense)
├── docker-compose.prod.yml # Production stack (Nginx + app replicas)
└── Dockerfile              # Multi-stage production image
```

The `apps/web` workspace is split in two trees, organized **per domain** (`account`, `auth`, `cms`, `core`, `file`, `identity`, `log`, `webhook`):

**`app/` — the transport layer.** Each domain binds its own HTTP surfaces and nothing in this tree holds business logic:

```
app/<domain>/
├── controllers/            # Thin Inertia (admin / front) and JSON (api) controllers
├── rest/                   # REST resource adapters for the /api/v1 JSON surface
├── middleware/             # Domain middleware (auth, permission, role)
├── transformers/           # Shape data for the frontend (Inertia shared props)
├── validators/             # VineJS validators
├── helpers/                # Transport-level helpers
└── routes.ts               # Domain route surface, self-registering, feature-flag gated
```

Routing is self-registering: `start/routes.ts` is a pure per-domain import list — each `app/<domain>/routes.ts` imports its surfaces (admin, api, front) on import, gated by the feature flags in `config/features.ts`. The CMS page-render catch-alls (`/:slug`, `/:locale/:slug`) are registered last so they never shadow single-segment routes, and the health probes (`/health`, `/health/ready`) are registered outside the maintenance middleware.

**`src/` — the business layer.** Each domain owns its use cases and data access:

```
src/<domain>/
├── actions/                # Use cases — controllers enter a domain through its actions
├── domain/                 # Domain entities, value objects and pure rules
├── models/                 # Lucid models
├── repositories/           # All database access, no business logic
├── queries/                # Read-side queries
├── services/               # Cross-cutting domain services
├── exceptions/             # Typed domain exceptions
└── types/                  # Shared domain types
```

`src/core/` is the kernel shared by every domain: base classes (`base_repository`, `base_query`, `base_http_exception`), value-object primitives (`entity`, `value_object`, `identifier`), transaction helpers, the cache driver contract, and the dashboard / nav / sitemap registries. `src/shared/services/` holds services reused across domains (cache service and its Redis driver). The `backup` domain lives entirely in `src/backup/` (no HTTP surface) and is driven by the ace commands in `commands/`.

The remaining top-level entries of `apps/web`:

```
commands/
├── backup/                 # backup_run, backup_list, backup_restore, backup_cleanup,
│                           # backup_health_check
├── maintenance/            # maintenance_on, maintenance_off, maintenance_status,
│                           # maintenance_schedule, maintenance_allow_ip,
│                           # maintenance_remove_ip, maintenance_message
├── create_user.ts          # create:user
├── make_domain.ts          # make:domain (scaffold a complete DDD domain)
├── logs_prune.ts           # logs:prune
└── cms_normalize_migration_names.ts

database/
├── factories/              # Per-domain: cms/ (page, template), file/ (file, file_folder),
│                           # identity/ (user), log/ (log_entry)
├── migrations/             # users, roles, permissions, role_permissions, remember_me_tokens,
│                           # tokens, user_preferences, file_folders, files, file_alts,
│                           # log_entries, auth_access_tokens, pages, page_translations,
│                           # page_revisions, templates, alter_pages, two_factor (users
│                           # columns), webhook_deliveries
├── seeders/                # role_seeder, permission_seeder, cms/ (page, template),
│                           # mails/ (mail_service)
├── schema.ts
└── schema_rules.ts

inertia/
├── app.tsx, client.ts, ssr.tsx    # Inertia entrypoints (SPA + SSR)
├── components/
│   ├── cms/                        # CMS module subtree (prunable as a whole):
│   │                               #   blocks/ (17 block renderers), renderer/ (page/block renderer),
│   │                               #   builder/ (BlockPicker, BlockTree, PresenceBar, ...),
│   │                               #   editor/ (BlockPropsEditor, per-type editors),
│   │                               #   hooks/, utils/, types/ (module-private)
│   ├── dashboard_sections/         # Dashboard widgets (stat cards, recent activity)
│   └── atoms/ molecules/ organisms/ # App-specific components only — the shared library
│                                   #   (button, card, table, admin layout, ...) is imported
│                                   #   from @foundry/design-system
├── css/                            # app.css, safelist.ts
├── guards/                         # authenticated.tsx, can_access.tsx, has_role.tsx
├── helpers/ hooks/ lib/ utils/ types/
├── layouts/                        # default.tsx, admin.tsx
└── pages/                          # auth/ (admin + front, incl. the two-factor challenge),
                                    #   cms/ (page, template), core/ (admin, front), errors/,
                                    #   file/, log/, maintenance/, permission/, role/,
                                    #   settings/ (account, preferences, profile),
                                    #   webhook/ (admin delivery log)

resources/
├── lang/
│   ├── en/                         # account.json, admin.json, auth.json, exceptions.json,
│   │                               # file.json, home.json, identity.json, log.json,
│   │                               # maintenance.json, pagination.json, permissions.json,
│   │                               # roles.json, validation.json, webhook.json,
│   │                               # cms/ (builder.json, page.json, template.json)
│   └── fr/                         # same namespaces as en/
└── views/
    ├── emails/                     # account_email.edge, admin_invite_email.edge, auth_email.edge,
    │                               # contact_form_email.edge
    └── inertia_layout.edge

start/
├── asset_middleware.ts             # View-layer asset middleware seam
├── container.ts                    # IoC singleton bindings
├── dashboard.ts, nav.ts, sitemap.ts, permissions.ts  # Registry/permission wiring
├── env.ts                          # Environment variable validation
├── events.ts                       # Application event bindings (currently empty)
├── extensions.ts                   # Model extensions
├── kernel.ts                       # HTTP kernel (middleware stack)
├── limiter.ts                      # Rate limiter configuration (throttles + per-client budget)
├── routes.ts                       # Per-domain route index (self-registering surfaces)
├── scheduler.ts                    # Scheduled maintenance jobs (registered at boot)
├── transmit.ts                     # SSE channel authorization and lifecycle hooks
└── validator.ts                    # VineJS custom rules
```

### Conventions

| Layer                 | Responsibility                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **Controllers**       | Thin, delegate to actions and services, handle HTTP concerns only                              |
| **Actions**           | Use cases: orchestrate a domain's operations, transactional boundaries, throw typed exceptions |
| **Domain**            | Entities, value objects, pure business rules                                                   |
| **Services**          | Cross-cutting domain services (mail, cache, resolvers), log significant events                 |
| **Repositories**      | All database access, no business logic                                                         |
| **Queries**           | Read-side data shaping for list/detail screens                                                 |
| **Transformers**      | Shape data for the frontend (shared props)                                                     |
| **REST resources**    | JSON adapters for the versioned `/api/v1/*` surface                                            |
| **Exceptions**        | Typed, carry HTTP status and i18n-ready error codes                                            |
| **Guards (frontend)** | Permission / role checks via `useAuth` hook and guard components                               |

### Path Aliases

The project uses Node.js subpath imports for clean module resolution (paths relative to `apps/web/`):

| Alias          | Path                   |
| -------------- | ---------------------- |
| `#transport/*` | `app/*`                |
| `#generated/*` | `.adonisjs/server/*`   |
| `#types/*`     | `types/*`              |
| `#providers/*` | `providers/*`          |
| `#database/*`  | `database/*`           |
| `#factories/*` | `database/factories/*` |
| `#shared/*`    | `src/shared/*`         |
| `#core/*`      | `src/core/*`           |
| `#identity/*`  | `src/identity/*`       |
| `#auth/*`      | `src/auth/*`           |
| `#account/*`   | `src/account/*`        |
| `#file/*`      | `src/file/*`           |
| `#log/*`       | `src/log/*`            |
| `#backup/*`    | `src/backup/*`         |
| `#tests/*`     | `tests/*`              |
| `#start/*`     | `start/*`              |
| `#config/*`    | `config/*`             |
| `#cms/*`       | `src/cms/*`            |

## Routes

Routes are self-registering per domain (`app/<domain>/routes.ts`), gated by the feature flags in `config/features.ts`. The tables below list the public URLs.

### Home & Public Pages

| Method | Path             | Handler                           |
| ------ | ---------------- | --------------------------------- |
| GET    | `/`              | PageController.home (homepage)    |
| GET    | `/:slug`         | PageController.render             |
| GET    | `/:locale/:slug` | PageController.render (localized) |
| GET    | `/sitemap.xml`   | SitemapController.show            |
| GET    | `/robots.txt`    | RobotsController.show             |
| POST   | `/contact`       | ContactController.execute         |

### Health Probes

Registered outside the maintenance middleware so load balancers can probe during maintenance:

| Method | Path            | Handler                    |
| ------ | --------------- | -------------------------- |
| GET    | `/health`       | HealthController.liveness  |
| GET    | `/health/ready` | HealthController.readiness |

### Guest Routes

| Method | Path                        | Handler                            | Throttling  |
| ------ | --------------------------- | ---------------------------------- | ----------- |
| GET    | `/login`                    | SessionController.render           | —           |
| POST   | `/login`                    | SessionController.execute          | 5 req / 15m |
| GET    | `/two-factor`               | TwoFactorController.render         | —           |
| POST   | `/two-factor`               | TwoFactorController.verify         | 5 req / 15m |
| GET    | `/register`                 | RegisterController.render          | —           |
| POST   | `/register`                 | RegisterController.execute         | 3 req / 1h  |
| GET    | `/forgot-password`          | ForgotPasswordController.render    | —           |
| POST   | `/forgot-password`          | ForgotPasswordController.execute   | 3 req / 1h  |
| GET    | `/reset-password/:token`    | ResetPasswordController.render     | —           |
| POST   | `/reset-password`           | ResetPasswordController.execute    | 3 req / 15m |
| GET    | `/accept-invitation/:token` | AcceptInvitationController.render  | —           |
| POST   | `/accept-invitation`        | AcceptInvitationController.execute | 3 req / 15m |

### OAuth Routes

| Method | Path                        | Handler                   |
| ------ | --------------------------- | ------------------------- |
| GET    | `/oauth/define-password`    | SocialController.render   |
| POST   | `/oauth/define-password`    | SocialController.execute  |
| GET    | `/oauth/:provider`          | SocialController.redirect |
| GET    | `/oauth/:provider/callback` | SocialController.callback |
| POST   | `/oauth/:provider/unlink`   | SocialController.unlink   |

### Authenticated Routes

| Method | Path                                    | Handler                             |
| ------ | --------------------------------------- | ----------------------------------- |
| GET    | `/verify/:token`                        | EmailVerificationController.execute |
| POST   | `/logout`                               | SessionController.destroy           |
| GET    | `/settings`                             | Redirect → `/settings/profile`      |
| GET    | `/settings/profile`                     | ProfileController.render            |
| POST   | `/settings/profile`                     | ProfileController.execute           |
| GET    | `/settings/account`                     | AccountController.render            |
| POST   | `/settings/account`                     | AccountController.execute           |
| DELETE | `/settings/account`                     | AccountController.destroy           |
| GET    | `/settings/account/email_change/:token` | EmailChangeController.render        |
| POST   | `/settings/account/email_change`        | EmailChangeController.execute       |
| GET    | `/settings/preferences`                 | PreferencesController.render        |
| POST   | `/settings/preferences`                 | PreferencesController.execute       |

### Admin Routes — Dashboard & Maintenance (core)

| Method | Path                                 | Handler                      | Permission             |
| ------ | ------------------------------------ | ---------------------------- | ---------------------- |
| GET    | `/admin`                             | DashboardController.render   | `admin.access`         |
| GET    | `/admin/settings/maintenance`        | MaintenanceController.render | `settings.maintenance` |
| POST   | `/admin/settings/maintenance`        | MaintenanceController.update | `settings.maintenance` |
| POST   | `/admin/settings/maintenance/toggle` | MaintenanceController.toggle | `settings.maintenance` |

### Admin Routes — Identity (users, roles, permissions)

| Method | Path                          | Handler                             | Permission           |
| ------ | ----------------------------- | ----------------------------------- | -------------------- |
| GET    | `/admin/users`                | UsersController.render              | `users.view`         |
| GET    | `/admin/users/create`         | UsersCreateController.render        | `users.create`       |
| POST   | `/admin/users/create`         | UsersCreateController.execute       | `users.create`       |
| GET    | `/admin/users/:id`            | UsersShowController.render          | `users.view`         |
| GET    | `/admin/users/:id/edit`       | UsersUpdateController.render        | `users.update`       |
| POST   | `/admin/users/:id/edit`       | UsersUpdateController.execute       | `users.update`       |
| DELETE | `/admin/users/:id`            | UsersController.destroy             | `users.delete`       |
| GET    | `/admin/roles`                | RolesController.render              | `roles.view`         |
| GET    | `/admin/roles/create`         | RolesCreateController.render        | `roles.create`       |
| POST   | `/admin/roles/create`         | RolesCreateController.execute       | `roles.create`       |
| GET    | `/admin/roles/:id`            | RolesShowController.render          | `roles.view`         |
| GET    | `/admin/roles/:id/edit`       | RolesUpdateController.render        | `roles.update`       |
| POST   | `/admin/roles/:id/edit`       | RolesUpdateController.execute       | `roles.update`       |
| DELETE | `/admin/roles/:id`            | RolesController.destroy             | `roles.delete`       |
| GET    | `/admin/permissions`          | PermissionsController.render        | `permissions.view`   |
| GET    | `/admin/permissions/create`   | PermissionsCreateController.render  | `permissions.create` |
| POST   | `/admin/permissions/create`   | PermissionsCreateController.execute | `permissions.create` |
| GET    | `/admin/permissions/:id/edit` | PermissionsUpdateController.render  | `permissions.update` |
| POST   | `/admin/permissions/:id/edit` | PermissionsUpdateController.execute | `permissions.update` |
| DELETE | `/admin/permissions/:id`      | PermissionsController.destroy       | `permissions.delete` |

### Admin Routes — Pages (CMS)

| Method | Path                                                        | Handler                            |
| ------ | ----------------------------------------------------------- | ---------------------------------- |
| GET    | `/admin/pages`                                              | PagesController.render             |
| GET    | `/admin/pages/create`                                       | PagesCreateController.render       |
| POST   | `/admin/pages/create`                                       | PagesCreateController.execute      |
| GET    | `/admin/pages/:id`                                          | PagesShowController.render         |
| GET    | `/admin/pages/:id/edit`                                     | PagesUpdateController.render       |
| POST   | `/admin/pages/:id/edit`                                     | PagesUpdateController.execute      |
| POST   | `/admin/pages/:id/publish`                                  | PagesUpdateController.publish      |
| POST   | `/admin/pages/:id/unpublish`                                | PagesUpdateController.unpublish    |
| POST   | `/admin/pages/:id/homepage`                                 | PagesController.setHomepage        |
| DELETE | `/admin/pages/:id`                                          | PagesController.destroy            |
| POST   | `/admin/pages/:id/translations`                             | PageTranslationsController.execute |
| GET    | `/admin/pages/:id/translations/:translationId/revisions`    | PageRevisionsController.index      |
| POST   | `/admin/pages/:id/translations/:tId/revisions/:rId/restore` | PageRevisionsController.restore    |
| POST   | `/admin/pages/:id/translations/:tId/revisions/:rId/keep`    | PageRevisionsController.toggleKeep |
| GET    | `/admin/pages/preview/:pageId`                              | PagesPreviewController.render      |

### Admin Routes — Files (CMS)

| Method | Path                       | Handler                       |
| ------ | -------------------------- | ----------------------------- |
| GET    | `/admin/files`             | FilesController.render        |
| POST   | `/admin/files/upload`      | FilesController.upload        |
| POST   | `/admin/files/:id/move`    | FilesController.move          |
| DELETE | `/admin/files/:id`         | FilesController.destroy       |
| POST   | `/admin/files/:id/alts`    | FilesController.upsertAlt     |
| DELETE | `/admin/files/:id/alts`    | FilesController.deleteAlt     |
| GET    | `/admin/files/folders`     | FileFoldersController.render  |
| POST   | `/admin/files/folders`     | FileFoldersController.execute |
| PUT    | `/admin/files/folders/:id` | FileFoldersController.update  |
| DELETE | `/admin/files/folders/:id` | FileFoldersController.destroy |

### Admin Routes — Templates (CMS)

| Method | Path                           | Handler                           |
| ------ | ------------------------------ | --------------------------------- |
| GET    | `/admin/templates`             | TemplatesController.render        |
| POST   | `/admin/templates`             | TemplatesController.execute       |
| GET    | `/admin/templates/preview/:id` | TemplatesPreviewController.render |
| GET    | `/admin/templates/:id/edit`    | TemplatesController.edit          |
| POST   | `/admin/templates/:id/apply`   | TemplatesController.applyToPage   |
| POST   | `/admin/templates/:id`         | TemplatesController.update        |
| DELETE | `/admin/templates/:id`         | TemplatesController.destroy       |

### Admin Routes — Logs

| Method | Path          | Handler               | Permission  |
| ------ | ------------- | --------------------- | ----------- |
| GET    | `/admin/logs` | LogsController.render | `logs.view` |

### Admin Routes — Webhooks

| Method | Path                         | Handler                     | Permission      |
| ------ | ---------------------------- | --------------------------- | --------------- |
| GET    | `/admin/webhooks/deliveries` | DeliveriesController.render | `webhooks.view` |

### API Routes — shared admin surface (`/api/v1/admin/*`)

The admin JSON surface is shared by the in-repo admin UI (session guard) and, when `AUTH_GUARD_API=true`, by external API clients (Bearer token). Standard REST CRUD applies to the `users`, `roles`, `pages`, `templates`, `files` and `folders` resources (`GET` index / `POST` store / `GET|PUT|DELETE` by `:id`), plus these extra endpoints:

| Method | Path                                                                                | Notes                     |
| ------ | ----------------------------------------------------------------------------------- | ------------------------- |
| PUT    | `/api/v1/admin/pages/:id/publish`                                                   | publish a page            |
| PUT    | `/api/v1/admin/pages/:id/unpublish`                                                 | unpublish a page          |
| PUT    | `/api/v1/admin/pages/:id/homepage`                                                  | designate the homepage    |
| POST   | `/api/v1/admin/pages/:id/translations`                                              | create a translation      |
| GET    | `/api/v1/admin/pages/:id/translations/:translationId/revisions`                     | revision history          |
| POST   | `/api/v1/admin/pages/:id/translations/:translationId/revisions/:revisionId/restore` | restore                   |
| PUT    | `/api/v1/admin/pages/:id/translations/:translationId/revisions/:revisionId/pin`     | pin/unpin                 |
| GET    | `/api/v1/admin/pages/preview/token`                                                 | live-preview token        |
| POST   | `/api/v1/admin/templates/from-page`                                                 | create template from page |
| GET    | `/api/v1/admin/templates/preview/token`                                             | template preview token    |
| PUT    | `/api/v1/admin/files/:id/move`                                                      | move a file               |
| PUT    | `/api/v1/admin/files/:id/alt`                                                       | upsert an alt text        |
| DELETE | `/api/v1/admin/files/:id/alt`                                                       | delete an alt text        |
| GET    | `/api/v1/admin/folders/:id/children`                                                | nested folder children    |
| POST   | `/api/v1/admin/builder/operations`                                                  | page-builder operations   |
| GET    | `/api/v1/admin/builder/presence/:translationId`                                     | builder presence          |
| POST   | `/api/v1/admin/builder/draft/:translationId`                                        | save a builder draft      |
| GET    | `/api/v1/admin/dashboard`                                                           | dashboard figures         |
| GET    | `/api/v1/admin/logs`                                                                | log viewer data           |
| GET    | `/api/v1/admin/maintenance`                                                         | maintenance config        |
| PUT    | `/api/v1/admin/maintenance`                                                         | update maintenance config |
| PUT    | `/api/v1/admin/maintenance/toggle`                                                  | toggle maintenance mode   |
| POST   | `/api/v1/admin/preferences/theme`                                                   | persist theme preference  |
| GET    | `/api/v1/admin/webhooks/deliveries`                                                 | webhook delivery log      |

### API Routes — token-only surface (`/api/v1/*`)

When the `api` guard is enabled (`AUTH_GUARD_API=true`), these routes accept a Bearer token only — session cookies are ignored (see [Authentication Guards](#authentication-guards)):

| Method | Path                               | Handler                           | Auth             |
| ------ | ---------------------------------- | --------------------------------- | ---------------- |
| POST   | `/api/v1/auth/login`               | LoginController.execute           | Guest, throttled |
| POST   | `/api/v1/auth/register`            | RegisterController.store          | Guest, throttled |
| POST   | `/api/v1/auth/forgot-password`     | ForgotPasswordController.store    | Guest, throttled |
| POST   | `/api/v1/auth/reset-password`      | ResetPasswordController.store     | Guest            |
| POST   | `/api/v1/auth/verify-email/:token` | EmailVerificationController.store | Guest            |
| POST   | `/api/v1/auth/accept-invitation`   | AcceptInvitationController.store  | Guest            |
| POST   | `/api/v1/auth/logout`              | LogoutController.destroy          | Bearer token     |
| GET    | `/api/v1/auth/me`                  | MeController.show                 | Bearer token     |
| GET    | `/api/v1/profile`                  | ProfileController.show            | Bearer token     |
| PUT    | `/api/v1/profile`                  | ProfileController.update          | Bearer token     |
| PUT    | `/api/v1/account`                  | AccountController.update          | Bearer token     |
| DELETE | `/api/v1/account`                  | AccountController.destroy         | Bearer token     |

### API Documentation (OpenAPI)

Gated by the `apiDocs` feature flag (`config/features.ts`). The spec is generated at runtime from the route registry (`app/core/openapi/`) and scoped to the authenticated user — only the routes their permissions allow are documented:

| Method | Path                   | Handler                | Auth                  |
| ------ | ---------------------- | ---------------------- | --------------------- |
| GET    | `/api/docs`            | DocsController.show    | Session (`web` guard) |
| GET    | `/api/v1/openapi.json` | OpenApiController.spec | `web` / `api` guards  |

`/api/docs` is a self-hosted interactive reference page over the spec. Spec drift is guarded by the test suite (schema validation + route-registry lockstep).

## Logging & Exception Handling

### LogService

Foundry provides a centralised `LogService` (`src/log/services/log_service.ts`) that wraps AdonisJS's built-in logger. It offers typed convenience methods for each log level (`debug`, `info`, `warn`, `error`, `fatal`) and domain-specific helpers that automatically attach the correct category and structured context.

#### Log Categories

| Category      | Helper Method                                   | Description                                                            |
| ------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| `AUTH`        | `logAuth(action, context)`                      | Authentication events (login, registration, OAuth linking)             |
| `SECURITY`    | `logSecurity(message, context, level?)`         | Suspicious activity, access violations, audit trail                    |
| `API`         | `logApiRequest(ctx, duration?)`                 | Incoming HTTP requests (method, URL, IP, user agent, status, duration) |
| `DATABASE`    | `logQuery(query, duration, context?)`           | Database queries — auto-elevated to `WARN` if > 1 000 ms               |
| `PERFORMANCE` | `logPerformance(operation, duration, context?)` | Operation duration — auto-elevated to `WARN` if > 5 000 ms             |
| `BUSINESS`    | `logBusiness(event, context, metadata?)`        | Domain events useful for analytics and auditing                        |
| `SYSTEM`      | — (default)                                     | Fallback category for `log()` calls without an explicit category       |

#### Log Levels

`DEBUG` · `INFO` · `WARN` · `ERROR` · `FATAL`

All entries include a timestamp, category, and optional context / metadata / error block.

Logs are also **persisted to the database** (`log_entries` table) and browsable in the admin panel at `/admin/logs` (data served by `GET /api/v1/admin/logs`). `node ace logs:prune` deletes entries older than the retention window and enforces the max-entries cap. Pruning is also automated by a scheduled queue job (`PruneLogEntriesJob`, on the `maintenance` queue) that runs the same policy; the interval is set with `MAINTENANCE_LOG_PRUNE_SCHEDULE` (default `1d`; `"0"` disables it).

### Exception Handler

The global exception handler (`app/core/exceptions/handler.ts`) extends AdonisJS's built-in `ExceptionHandler`:

- **Debug mode** — verbose error display with stack traces (disabled in production)
- **Status pages** — Inertia-rendered error pages (`errors/not_found` for 404, `errors/server_error` for 500–599)
- **Sentry reporting** — unhandled exceptions are forwarded to Sentry via the `@sentry/node` SDK, bootstrapped by the internal `providers/sentry_provider.ts`

### Typed Exceptions

Each exception extends `@adonisjs/core/exceptions.Exception` and implements its own `handle` method with i18n-ready error messages. All exceptions support both JSON and session-flash responses.

#### Account

| Exception                     | Code             | HTTP | Description                             |
| ----------------------------- | ---------------- | ---- | --------------------------------------- |
| `EmailAlreadyExistsException` | `E_EMAIL_EXISTS` | 409  | Email already in use by another account |

#### Auth

| Exception                         | Code                         | HTTP | Description                                  |
| --------------------------------- | ---------------------------- | ---- | -------------------------------------------- |
| `InvalidCredentialsException`     | `E_INVALID_CREDENTIALS`      | 401  | Wrong email or password                      |
| `InvalidCurrentPasswordException` | `E_INVALID_CURRENT_PASSWORD` | 400  | Current password mismatch                    |
| `ProviderAlreadyLinkedException`  | `E_PROVIDER_ALREADY_LINKED`  | 409  | OAuth account already linked to another user |
| `ProviderNotConfiguredException`  | `E_PROVIDER_NOT_CONFIGURED`  | 501  | OAuth provider not configured                |
| `UnverifiedAccountException`      | `E_UNVERIFIED_ACCOUNT`       | 403  | Account not yet verified                     |
| `UnauthorizedException`           | `E_UNAUTHORIZED`             | 401  | Not logged in                                |
| `ForbiddenException`              | `E_FORBIDDEN`                | 403  | Missing role or permission                   |

#### Core

| Exception                      | Code                      | HTTP | Description                          |
| ------------------------------ | ------------------------- | ---- | ------------------------------------ |
| `InvalidTokenException`        | `E_INVALID_TOKEN`         | 400  | Token invalid, expired, or not found |
| `MaxAttemptsExceededException` | `E_MAX_ATTEMPTS_EXCEEDED` | 429  | Too many token validation attempts   |
| `RowNotFoundException`         | `E_ROW_NOT_FOUND`         | 404  | Requested resource not found         |
| `SlugExistsException`          | `E_SLUG_EXISTS`           | 409  | Slug already taken                   |

#### File

| Exception                   | Code                  | HTTP | Description                             |
| --------------------------- | --------------------- | ---- | --------------------------------------- |
| `FileTooLargeException`     | `E_FILE_TOO_LARGE`    | 413  | File exceeds the configured size limit  |
| `InvalidExtensionException` | `E_INVALID_EXTENSION` | 422  | File extension is not in the allow list |

#### Page

| Exception                     | Code                    | HTTP | Description                                  |
| ----------------------------- | ----------------------- | ---- | -------------------------------------------- |
| `MissingTranslationException` | `E_MISSING_TRANSLATION` | 404  | No translation for the requested locale/page |

## Contributing

Contributions are welcome!

### Development Setup

```bash
git clone https://github.com/NetAuraTech/adonisjs-foundry.git
cd adonisjs-foundry
npm install
docker compose up -d
cp apps/web/.env.example apps/web/.env
cd apps/web
node ace generate:key
node ace migration:run
npm run dev
```

### Contribution Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes following the convention below
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/). Each commit message must have a **type**, an optional **scope**, and a clear **description**:

```
type(scope)
short description
Optional body listing what was added, changed, or removed.
```

**Types:**

| Type       | Usage                                                   |
| ---------- | ------------------------------------------------------- |
| `feat`     | New feature                                             |
| `fix`      | Bug fix                                                 |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `docs`     | Documentation only                                      |
| `chore`    | Tooling, config, dependencies                           |
| `test`     | Adding or updating tests                                |
| `perf`     | Performance improvement                                 |

**Examples:**

```
feat(auth)
Add OAuth account linking and unlinking
- Services: SocialService
- Controllers: SocialController
- Helpers: Oauth
- Exceptions: ProviderAlreadyLinkedException, ProviderNotConfiguredException
```

```
fix(token)
Throw InvalidTokenException on expired password reset token
```

```
refactor(account)
Move email change logic from controller to AccountService
```

## Changelog

### v2.3.0

#### SEO

- `robots.txt` now disallows `/admin/*`, `/settings/*` and `/api/*`
- Every error page emits a `noindex, nofollow` robots meta tag and sets its own document title
- The CMS show template's placeholder `LocalBusiness` JSON-LD is replaced by pure structured-data builders (business + breadcrumb) driven by the new `LEGAL_NAME`, `LEGAL_SIRET`, `LEGAL_ADDRESS` and `LEGAL_PHONE` env vars — unset fields are omitted instead of emitting empty values
- New shared `SeoHead` atom (title, description, share image, JSON-LD scripts) wired into the CMS show template and the home page

#### Fixes

- Shield: the CSP `frame-ancestors` directive is now `self`, aligned with `X-Frame-Options: SAMEORIGIN` — same-origin framing (the CMS builder preview iframe) no longer conflicts with the CSP under strict enforcement

#### Developer Experience

- Commit-time OpenAPI schema drift tests: REST transformer output is pinned against the generated OpenAPI 3 response schemas (Ajv validation plus a top-level key-set pin), so a dropped, renamed or undocumented field fails the test suite instead of breaking API consumers

### v2.2.0

#### Redis

- The Redis logical database is now configurable via the `REDIS_DB` env variable (defaults to `0`), so several sites sharing one Redis instance can be isolated on distinct logical databases

#### Fixes

- Exception handler: a header-derived i18n locale is now bound before any error page renders — unmatched URLs (e.g. `/.env`, `/wp-admin`) no longer crash in the Inertia 404 status page and turn into a 500 in production
- CMS: the contact form notification mail now includes the submission content (the localized fields were spread flat while the template iterated a non-existent `data` variable, so the body only showed the greeting, intro and footer)
- Header organism: the logo no longer derives its href from the first nav entry — an explicit `homeHref` prop (mirroring the `Footer`) is used instead
- `Field` molecule: `children` no longer leaks onto void controls (a non-null `children` value, e.g. an empty `options` array, crashed React SSR on self-closing tags)

#### Security (dependencies)

- Patched `braces` 3.0.3 against a stack-exhaustion DoS (GHSA-vfj7-8cjw-p6xm): nesting beyond a depth limit now raises a controlled, catchable error instead of an uncaught "Maximum call stack size exceeded"

#### CI

- Dependabot autofix workflow now runs `npm dedupe` after applying dependency bumps

### v2.1.0

#### Backup

- Private `r2-backup` drive disk (forcePathStyle, no ACL, no CDN) with `BACKUP_R2_BUCKET` env var for S3-compatible backup targets
- Sanitize pg_dump COPY data: fields containing a single quote are wrapped in double quotes with embedded quotes doubled (`sanitizeDumpForApostrophes`), opt-in per dump via `DumpOptions.sanitizeApostrophes`
- Fix AES-256-GCM encryption: the auth tag is now written after the ciphertext (it was dropped, so decryption failed on every file)

#### Storage

- The storage service resolves the active disk from `DRIVE_DISK`, the same variable the drive config uses for its default disk, instead of the undeclared `CMS_STORAGE_DISK`
- R2 drive: `forcePathStyle`, `supportsACL=false`, and an optional `cdnUrl` served from the new `R2_PUBLIC_URL` env variable

#### Security (dependencies)

- Patched `dompurify` to ^3.4.16 (XSS fix), `brace-expansion` to 5.0.12 (CVE-2026-102276/77/78), and forced `nodemailer` 10.0.13 via an npm override (every remaining advisory is only patched on the 10.x line)

#### Docker & infrastructure

- The production image is now buildable and runnable: node-gyp toolchain for `better-sqlite3` on alpine, a `.dockerignore` (context drops from 898 MB to ~311 kB), and per-workspace production deps merged into the root `node_modules`
- Flavor branches now ship a converged lockfile (no subtrees for pruned dependencies) and a freshly regenerated `database/schema.ts`

#### CI

- Post-prune formatting normalization moved after the codegen steps (the Lucid schema codegen was rewriting `schema.ts` in a form that failed the oxfmt gate)
- Dependabot lockfile convergence no longer runs lifecycle scripts
- Release workflow: the flavor catch-up poll fetches the branch on every iteration, and flavor releases are marked prerelease so they don't steal the "Latest" badge

### v2.0.0

#### Architecture

- Restructured `apps/web` into a per-domain transport layer (`app/<domain>/`: controllers, rest, middleware, transformers, validators) and a per-domain business layer (`src/<domain>/`: actions, domain, models, repositories, services, queries, exceptions, types)
- New **actions** layer: controllers enter each domain through its use-case actions; event/listener pairs replaced by actions
- Self-registering, feature-flag-gated route surfaces (`app/<domain>/routes.ts`, `config/features.ts`)
- Extracted the shared React component library (atoms, molecules, organisms, design tokens) into the `@foundry/design-system` workspace (`packages/design-system`)

#### Page Builder & CMS

- 5 new block types: `video` (YouTube/Vimeo or direct media file), `carousel`, `list`, `quote`, `iframe` (hostname allowlist via `CMS_IFRAME_ALLOWLIST`) — the block system now totals 17 types
- Versioned admin REST surface (`/api/v1/admin/*`) for pages, templates, builder, files, folders, dashboard, logs and maintenance

#### Admin Panel

- Role and permission management UI (`/admin/roles`, `/admin/permissions`)
- Log viewer at `/admin/logs` backed by the new `log_entries` table (retention via `node ace logs:prune`)
- Maintenance mode: admin settings page, public maintenance page, IP allowlist, scheduling, and `maintenance:*` ace commands
- Dashboard with domain sections (recent activity, stat cards)

#### Authentication

- TOTP two-factor authentication: enrollment from Settings → Account (TOTP secret + `otpauth://` URI, one-time recovery codes shown once), TOTP challenge at login (`/two-factor`, throttled 5/15 min) with recovery-code fallback, and a code-gated disable flow (current password + valid code)
- `two_factor` columns on the `users` table (cipher-stored secret, recovery codes)

#### API & Documentation

- Per-client API rate limiting: a per-user budget keyed on the authenticated user id across the whole `/api/v1/*` surface (`user.apiRateLimit` per-user override, `API_RATE_LIMIT_DEFAULT` env fallback)
- OpenAPI 3 spec generated at runtime from the route registry (`GET /api/v1/openapi.json`), scoped to the caller's permissions, with a self-hosted interactive reference at `GET /api/docs` (both gated by the `apiDocs` feature flag); spec drift guarded by the test suite
- Throttling hardening: contact form capped at 5 submissions/hour, email-change token exchange at 3/hour

#### CMS

- Optional Typesense-backed full-text search for CMS pages (`SEARCH_ENABLED`, `TYPESENSE_*` env): page lifecycle actions index/remove translations, the admin page listing searches ranked hits, and the whole surface degrades gracefully to the standard query when search is disabled or the backend is unreachable

#### Incoming Webhooks (full flavor)

- Inbound webhook facility: `POST /webhooks/:receiver` with HMAC-SHA256 signature verification (`WEBHOOK_SECRET`) and replay protection (`WEBHOOK_REPLAY_WINDOW`), idempotent recording (`X-Delivery-Id` or payload digest, `webhook_deliveries` table), queued processing on the `webhook` queue, and a delivery log (admin UI at `/admin/webhooks/deliveries` + `GET /api/v1/admin/webhooks/deliveries`)

#### Frontend

- `@sentry/react` wired into the Inertia bundle: browser errors report to the same Sentry DSN as the Node runtime, with the release tag taken from `SENTRY_RELEASE` (default: app version)

#### Developer Experience

- `node ace make:domain` scaffolds a complete DDD domain end to end (business layer, transport layer, Inertia page, i18n, migration, factory, unit + functional specs) with idempotent registration edits

#### Infrastructure

- Health probes `/health` and `/health/ready` (registered outside the maintenance middleware)
- Opaque API tokens (`auth_access_tokens` table) for the token-only `/api/v1/*` surface, with a full token auth flow (login, register, forgot/reset password, verify email, accept invitation)
- Sitemap configuration via `SITEMAP_ADDITIONS` / `SITEMAP_EXCLUSIONS`
- Redis job queue (`@adonisjs/queue`): password-reset mail is now dispatched as a job and sent by a worker after the HTTP response (`QUEUE_DRIVER=redis` + `QUEUE_CONNECTION`); a `sync` driver runs jobs inline for dev/tests; `docker-compose.prod.yml` adds a `worker` service
- Scheduled maintenance jobs on the `maintenance` queue: `PruneLogEntriesJob` (log-entry retention) and `EnforceBackupRetentionJob` (backup retention) run on env-var-driven intervals (`MAINTENANCE_LOG_PRUNE_SCHEDULE`, `MAINTENANCE_BACKUP_RETENTION_SCHEDULE`); the worker consumes `default,auth,maintenance,webhook`

### v1.4.0

#### Page Builder & CMS

- Visual block-based page editor with 12 block types: `section`, `grid`, `flex`, `title`, `paragraph`, `button`, `separator`, `icon`, `form`, `field`, `htmltext`, `image`
- Block content tree stored as typed JSON in `page_translations.content`
- All block props are type-safe via `BlockPropsMap` and support responsive values (`default`, `sm`, `md`, `lg`, `xl`)
- Block tree manipulation: add, move, delete, update props — each operation validated server-side
- Automatic revision creation before every content update (restorable, pinnable)
- Content seeding: create a new locale translation from an existing one

#### Real-Time Collaboration

- AdonisJS Transmit (SSE) integration for live builder collaboration
- Presence tracking: see who is editing a page translation in real-time (`PRESENCE_JOINED` / `PRESENCE_LEFT`)
- Optimistic field locking with 5-second TTL and heartbeat renewal (`LOCK_ACQUIRE` / `LOCK_RELEASE`)
- Lock conflict display: locked fields shown as read-only with user name and color
- Auto-cleanup on disconnect: all locks and presence released on tab close / network drop
- Draft sync via Redis: late-joining editors see the live state
- SSE channel authorization with permission check (`pages.update`)
- Live iframe preview with token-based authentication

#### Page System

- New models: `Page`, `PageTranslation`, `PageRevision`
- Multi-locale page support with per-locale slugs and independent translation status (draft/published/archived)
- Homepage designation (`is_homepage` flag) with CMS toggle
- Dynamic public routes: `/:slug` and `/:locale/:slug`
- `PageResolverService`: resolves stored `FileRef` to `ResolvedFile` with public URLs, alt text, dimensions, and variant URLs for Inertia rendering
- Server-side HTML content sanitization via `DOMPurify` + `jsdom` (`sanitize_content.ts`)
- Page scopes: `published` scope for query filtering
- New exceptions: `MissingTranslationException` (404)
- New validators: `page.ts`, `builder.ts`
- New transformers: `page_transformer.ts`, `page_translation_transformer.ts`, `page_revision_transformer.ts`
- New seeders: `page_seeder.ts`
- New factories: `page_factory.ts`

#### File Management

- New models: `File`, `FileAlt`, `FileFolder`
- Multi-disk storage via `@adonisjs/drive` (local FS, S3, Cloudflare R2)
- `StorageService`: abstraction layer over Drive with env-based disk resolution and silent-delete semantics
- File upload with size validation (`MAX_UPLOAD_SIZE` env) and extension validation
- Folder system with nested hierarchy and alphabetical ordering
- Per-locale named alt text system (`file_alts` table, keyed by `file_id + locale + key`)
- Alt override per block for context-specific descriptions
- `beforeDelete` hook: auto-deletes physical file from storage when DB record is removed
- File move between folders
- New exceptions: `FileTooLargeException` (413), `InvalidExtensionException` (422)
- New validators: `file.ts`
- New transformers: `file_transformer.ts`, `file_folder_transformer.ts`
- New factories: `file_factory.ts`, `file_folder_factory.ts`

#### Image Optimization

- `ImageOptimizerService` using Sharp for on-the-fly responsive variant generation
- Generates WebP variants at 400w, 800w, and 1200w with Lanczos3 kernel resampling
- Extracts original dimensions (width/height) for CLS prevention
- Skips SVG files and variants larger than the source image
- Disk-cached variants to avoid redundant re-generation
- Variant URLs returned in `ResolvedFile.variants` for `<img srcset>` rendering

#### Template System

- New model: `Template` (page or block type)
- Create template from existing page content
- Apply template to a page translation (revision saved before overwrite)
- CMS CRUD with search and type filtering
- New validator: `template.ts`
- New transformer: `template_transformer.ts`
- New seeder: `template_seeder.ts`
- New factory: `template_factory.ts`

#### Cache Service

- `CacheService` with driver-based architecture (`CacheDriver` contract)
- `RedisCacheDriver` implementation with JSON serialization, TTL, pattern deletion, `remember()` (get-or-set), atomic increment, `keys()` via SCAN
- Namespace support via `cache.namespace('builder')` for key isolation
- Singleton IoC binding via `start/container.ts`
- Used by `BuilderSessionService` for sessions, locks, and drafts
- Used by `PageController` for rendered page content caching

#### Contact Form

- `contact_form` block type with configurable fields, recipient, and success message
- Event-driven architecture: `ContactFormSubmitted` event → `SendContactFormEmail` listener
- `ContactController` with `contactValidator`
- New email template: `contact_form_email.edge`
- New mail: `contact_form_notification.ts`

#### SEO

- Dynamic `sitemap.xml` generation from all published page translations
- Dynamic `robots.txt` generation (blocks `/admin/*` and `/settings/*`)
- Per-page meta: `metaTitle`, `metaDescription`, `metaImage` (Open Graph)
- Dedicated routes: `GET /sitemap.xml`, `GET /robots.txt`

#### Frontend

- Replaced `lucide-react` with `@iconify/react` for icon rendering
- Removed `react-i18next` and `i18next` — all translations now served via AdonisJS i18n backend
- Removed `inertia/locales/` directory and `inertia/lib/i18n.ts`
- New page renderer: `page_renderer.tsx` and `block_renderer.tsx` for the 12 block types
- 12 block rendering components in `inertia/components/atoms/blocks/`
- Builder components: `BlockPicker`, `BlockTree`, `LockedFieldWrapper`, `PresenceBar`, `PreviewIframe`
- Block editor forms: `BlockPropsEditor` with per-type editor (section, grid, flex, title, paragraph, button, separator, icon, form, field, htmltext, image)
- `responsive_control.tsx` for editing responsive breakpoint values
- `FileManager` organism and `ImagePicker` molecule for file selection in blocks
- `FileAltEditor` organism for managing per-locale alt text entries
- New atoms: `file_upload_input`, `floating_portal`, `modal`, `separator`
- New hooks: `useBuilderSync`, `useContactForm`, `useScrollReveal`, `useTranslation`
- New utils: `builder_reducer.ts`, `file.ts`, `responsive.ts`
- SSR enabled by default (`config/inertia.ts`, `inertia/ssr.tsx`)
- Removed `inertia/pages/home.tsx` — homepage now served by `PageController.home`

#### Backend Locales

- Replaced `admin.json`, `permissions.json`, `roles.json` with `cms.json` covering the full CMS surface (users, pages, files, templates)
- Added `page.json` for public page translations (contact form success message)
- Added `core.json` locale file

#### Infrastructure

- Added `@adonisjs/drive` provider for multi-disk file storage
- Added `@adonisjs/transmit` provider for SSE real-time events
- Added `sharp` dependency for server-side image processing
- Added `dompurify` + `jsdom` for server-side HTML sanitization
- New preloads: `#start/container`, `#start/transmit`
- New IoC singleton bindings: `CacheService`, `BuilderSessionService`
- New path aliases: `#factories/*`, `#policies/*`, `#abilities/*`
- New database migrations: `file_folders`, `files`, `file_alts`, `pages`, `page_translations`, `page_revisions`, `templates`, `alter_pages`
- `DRIVE_DISK`, `AWS_*`, `S3_*`, `R2_*`, `MAX_UPLOAD_SIZE`, `LIMITER_STORE` env variables added to `.env.example` and `start/env.ts`

### v1.3.0

- Added `PermissionMiddleware` and `RoleMiddleware` for robust, reusable route protection
- New structured Auth exceptions: `UnauthorizedException` and `ForbiddenException`

### v1.2.0

- Removed `ErrorHandlerService` in favor of AdonisJS's built-in exception handling (`ExceptionHandler`)
- Each exception now implements its own `handle` method with i18n-ready messages and dual response mode (JSON / session flash)
- Sentry error reporting moved to the global exception handler's `report` method
- New exceptions: `InvalidCredentialsException`, `SlugExistsException`

### v1.1.0

- Admin panel (CMS) with dashboard and user management (list, create, show, edit, delete)
- User invitation system with token-based acceptance flow
- User preferences system with dark/light theme persistence
- Custom role/permission system with model-level permission checking and frontend guards
- Frontend guards (Authenticated, HasRole, CanAccess)
- Pagination service with generic frontend component
- Theme toggle component with API-driven persistence
- Admin layout with sidebar, header, and main content area
- Table component library (table, table_body, table_cell, table_header, table_header_cell, table_row)
- User status indicator component
- New hooks: `useAdmin`, `useAuth`, `useTheme`, `useIsLarge`
- New locales: admin.json, core.json (EN + FR)
- Admin invite email template
- Additional path aliases: `#contracts/*`, `#tests/*`, `#generated/*`
- New exception: `RowNotFoundException`
- New helper: `strip_empty_strings`
- Pagination helpers: `extract_pagination`, `get_pagination_params`

### v1.0.0

- Initial release
- Complete authentication system (registration, login, logout, email verification, password reset)
- OAuth providers (GitHub, Google, Facebook) with account linking/unlinking
- Selector/validator token pattern with attempt tracking
- Remember-me token support
- User settings (profile, account, email change with dual confirmation, account deletion)
- Role-based access control (roles, permissions, role_permissions)
- Domain-driven architecture (services, repositories, contracts, events/listeners, transformers)
- Structured logging with categorized log service (AUTH, SECURITY, BUSINESS, API, DATABASE, PERFORMANCE)
- Sentry integration for error tracking
- VineJS form validation (backend) + client-side validation hook (`useFormValidation`)
- Edge email templates (auth & account notifications)
- Custom error pages (404, 500) rendered via Inertia
- API serializer provider for consistent JSON responses
- Inertia.js + React 19 frontend with SSR support
- Tailwind CSS v4 component library (atoms/molecules/organisms)
- Full i18n support (EN, FR) — backend (AdonisJS i18n) and frontend (react-i18next)
- Automatic locale detection middleware
- Docker setup (development + production with Nginx proxy)
- Type-safe routing with Tuyau
- Database backup system (full/differential, multi-storage, encryption, retention, health checks)

## License

AdonisJS Foundry is open-source software licensed under the [MIT License](LICENSE).

## Support

- Open an issue on [GitHub](https://github.com/NetAuraTech/adonisjs-foundry/issues)

---

**Made with ❤️ using [AdonisJS](https://adonisjs.com)**
