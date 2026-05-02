# Prixgen Enterprise Rebuild

## 🚀 Project Identity
- **Project Name**: Prixgen Enterprise Rebuild
- **Project Type**: Headless B2B Corporate Website & Lead Generation Engine
- **Purpose**: Transition from a legacy architecture to a highly secure, edge-rendered, Next.js frontend with Sanity.io as the headless CMS.
- **Problem Solved**: Eliminates staging indexation leaks, fixes delayed LCP from unoptimized assets, and replaces a bottom-of-funnel-only conversion approach with mid-funnel lead magnets.
- **North Star**: *"Build an enterprise IT consulting platform that dominates search intent via edge-rendered SEO and securely captures mid-funnel B2B leads for manufacturing ERP buyers."*

---

## 🛠 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io (Headless)
- **Lead Gen**: HubSpot (Server-side Integration)
- **UI Primitives**: Radix UI + shadcn/ui
- **Validation**: Zod + React Hook Form

---

## 🏗 Key Features

### 1. Edge-Rendered SEO
- **Incremental Static Regeneration (ISR)**: Content is pre-rendered at build time but can be updated on-demand without a full redeploy.
- **Dynamic Meta Tags**: Automated SEO metadata generation for every Solution and Industry page.
- **JSON-LD Schema**: Integrated structured data to dominate Google search results.

### 2. High-Performance Architecture
- **Optimized Assets**: Next.js Image component for automatic WebP conversion and responsive sizing.
- **Video Facade**: Lazy-loaded YouTube/Vimeo components to ensure zero initial load impact from heavy media.
- **Modern Typography**: Inter font system optimized for readability and layout stability (Zero CLS).

### 3. Enterprise-Grade Security
- **Middleware Protection**: Basic Auth is automatically applied to staging environments to prevent SEO leaks.
- **Server Actions**: All form submissions (HubSpot) are handled server-side, hiding API keys from the client.
- **Content Security Policy (CSP)**: Strict headers to prevent XSS and data injection.

### 4. B2B Lead Generation Engine
- **Lead Magnets**: Optimized forms designed for high-intent ERP buyers.
- **HubSpot Integration**: Direct, secure sync with your CRM.
- **Analytics Ready**: Google Tag Manager and HubSpot tracking pre-configured.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
1. Clone the repository.
2. Run the setup script to install dependencies:
   ```bash
   setup.bat
   ```
3. Copy `.env.example` to `.env` and populate your credentials:
   ```bash
   cp .env.example .env
   ```

### Development
Start the local development server:
```bash
pnpm dev
# or
npm run dev
```

---

## 📂 Project Structure
- `src/app`: App Router pages and dynamic routes.
- `src/components`: UI components (primitives, shared, and features).
- `src/lib`: Utility functions and local data schemas.
- `src/actions`: Secure server-side logic (Lead generation).
- `src/middleware.ts`: Staging protection and security logic.

---

## 📝 Governance
- **Maintainer**: Prixgen IT Team
- **Deployment**: Vercel (Production)
- **Revalidation**: Secure webhooks from Sanity.io.
