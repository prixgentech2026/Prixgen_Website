# Environment Setup & API Configuration

This document provides a detailed guide on how to acquire and configure the environment variables required for the Prixgen Enterprise platform.

## 🔑 Required Variables

Create a `.env` file in the project root and populate the following keys:

### 1. `NEXT_PUBLIC_SANITY_PROJECT_ID`
*   **Purpose**: Connects the frontend to your specific Sanity project.
*   **Value**: `n8icbhxu`

### 2. `SANITY_DATASET`
*   **Purpose**: Specifies which dataset (e.g., `production`) to fetch content from.

### 3. `HUBSPOT_ACCESS_TOKEN`
*   **Purpose**: Securely pushes lead generation data from the website forms to your HubSpot CRM.
*   **How to acquire**:
    1.  In HubSpot, go to **Settings** > **Integrations** > **Private Apps**.
    2.  Click **Create a private app**.
    3.  Give it a name (e.g., "Prixgen Website").
    4.  Under **Scopes**, enable:
        *   `crm.objects.contacts.write`
        *   `crm.objects.contacts.read`
    5.  Click **Create app** and copy the **Access Token**.

### 4. `SANITY_REVALIDATE_SECRET`
*   **Purpose**: Authenticates on-demand cache clearing requests from Sanity webhooks.

### 5. `STAGING_PASSWORD`
*   **Purpose**: Protects non-production environments from public access and search engine indexing.
*   **How to acquire**:
    1.  Choose any password.
    2.  When visiting a staging/preview URL, the browser will prompt for a username (`admin`) and this password.

### 6. `NEXT_PUBLIC_SITE_URL`
*   **Purpose**: Sets the base URL for SEO metadata, OpenGraph images, and sitemaps.
*   **How to acquire**:
    1.  Use `https://www.prixgen.com` for production.
    2.  Use your Vercel preview URL for staging tests.

---

## 🛡️ Security Best Practices

1.  **Never commit `.env`**: This file contains private secrets. It is already included in `.gitignore`.
2.  **Server Actions**: Notice that variables like `HUBSPOT_ACCESS_TOKEN` do **not** have the `NEXT_PUBLIC_` prefix. This ensures they are only ever accessible on the server and never leaked to the user's browser.
3.  **Vercel Configuration**: When deploying to Vercel, remember to add these same keys in the **Project Settings > Environment Variables** dashboard.
