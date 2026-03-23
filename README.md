# Info Screen

A Next.js application for creating and managing digital info screens for organizations.

## Features

### Authentication
- Multi-provider sign-in with GitHub, Google, and credentials (email/password)
- Session handling with NextAuth.js v5 and Prisma adapter
- Sign-up flow for credentials users

### Organization Management
- Create organizations with name, address, CVR number, and optional logo
- Request membership to organizations
- Approved memberships gate access to organization data
- Active organization selection persisted in cookie (`selectedOrganizationId`)

### Info Screens
- Create, update, list, and delete info screens
- Assign a colour profile to each info screen
- Public screen route at `/info-screen/[id]`

### Content Management
- Create and list content items per organization
- Optional image upload and contact info per content item
- Drag-and-drop content assignment to each info screen
- Many-to-many relation between content and info screens

### Sponsors
- Create, list, and delete sponsors per organization
- Optional sponsor logo upload
- Sponsor banner rendered on the public info screen view

### Localization
- Dashboard localization for English and Danish (`en`, `da`)
- Locale-aware dashboard routes (`/[locale]/dashboard/...`)
- Locale preference persisted in `NEXT_LOCALE` cookie

## What Changed
- Added sponsor management and sponsor banner rendering on public info screens
- Added localization support for dashboard routes and UI messages (English/Danish)
- Updated info screen themes to include dedicated text colour support
- Documented organization selection persistence via cookie
- Updated stack/runtime versions and added practical local setup instructions

## Tech Stack
- Framework: Next.js 16 (App Router)
- Runtime: React 19
- Database: PostgreSQL + Prisma ORM (Prisma 7)
- Authentication: NextAuth.js v5 + `@auth/prisma-adapter`
- Styling/UI: Tailwind CSS 4, Radix UI, shadcn/ui
- Drag and Drop: `@dnd-kit/react`
- Uploads: UploadThing
- Validation: Zod

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a `.env` file with at least:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
UPLOADTHING_TOKEN="..."
```

### 3. Run database migrations
```bash
npm run db:migrate
```

### 4. Start development server
```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts
- `npm run dev` - Start Next.js in development mode
- `npm run build` - Generate Prisma client and build app
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run Prisma migrate dev
- `npm run db:studio` - Open Prisma Studio
- `npm run db:reset` - Reset and re-run migrations