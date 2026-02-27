# Info Screen

A Next.js application for creating and managing digital info screens for organizations.

## Features

### Authentication
- **Multi-provider login**: Sign in with GitHub, Google, or email/password credentials
- **Session management**: Secure JWT-based authentication with NextAuth.js

### Organization Management
- **Create organizations**: Set up organizations with name, address, CVR number, and logo
- **Organization switching**: Easily switch between multiple organizations
- **User membership**: Link users to organizations with admin/member roles and approval workflow (pending/approved/rejected status)

### Info Screens
- **Create & manage screens**: Build info screens with titles and descriptions
- **Custom colour themes**: Assign colours to screens using OKLCH colour format
- **Public viewing**: Display screens via shareable URLs (`/info-screen/[id]`)

### Content Management
- **Create content items**: Add content with name, title, text, images, and contact info
- **Drag & drop assignment**: Use drag-and-drop to assign content to info screens
- **Many-to-many relationships**: Content can be displayed on multiple info screens

## Tech Stack
- **Framework**: Next.js 16 with Turbopack
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS 4, Radix UI, shadcn/ui
- **Drag & Drop**: @dnd-kit/react