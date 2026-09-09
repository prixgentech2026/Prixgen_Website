'use server';

import { z } from 'zod';
import { writeClient } from '@/sanity/lib/write-client';

const WhitepaperDownloadSchema = z.object({
  name: z.string().trim().min(2, { message: 'Please enter your full name (minimum 2 characters).' }),
  email: z.string().trim().email({ message: 'Please enter a valid business email address.' }),
  phone: z.string().trim().min(8, { message: 'Please enter a valid phone number with country code.' }),
  company: z.string().trim().min(2, { message: 'Please enter your company or plant name.' }),
  whitepaperTitle: z.string().optional().default('From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers'),
  slug: z.string().optional().default('pvc-manufacturing'),
  downloadPath: z.string().optional().default('/PVC_whitepaper.pdf'),
});

export type WhitepaperDownloadInput = z.infer<typeof WhitepaperDownloadSchema>;

export async function submitWhitepaperDownload(data: WhitepaperDownloadInput) {
  const validation = WhitepaperDownloadSchema.safeParse(data);
  if (!validation.success) {
    const errorMsg = validation.error.issues.map(e => e.message).join(', ');
    return { success: false, message: errorMsg || 'Invalid data provided.' };
  }

  const { name, email, phone, company, whitepaperTitle, slug, downloadPath } = validation.data;

  try {
    // 1. SAVE TO SANITY UNDER "whitepaperDownload" DOCUMENT TYPE
    if (writeClient) {
      try {
        const doc = await writeClient.create({
          _type: 'whitepaperDownload',
          name,
          email,
          phone,
          company,
          whitepaperTitle,
          slug,
          status: 'new',
          downloadedAt: new Date().toISOString(),
        });
        console.log('[SUCCESS] Whitepaper download recorded in Sanity:', doc._id, email, phone);
      } catch (sanityErr: any) {
        console.error('[ERROR] Failed writing whitepaper download to Sanity:', sanityErr.message || sanityErr);
      }
    } else {
      console.warn('[WARN] Sanity Write Client not initialized.');
    }

    // 2. DISPATCH NOTIFICATION EMAIL IF RESEND CONFIGURED
    const salesHeadEmail = process.env.SALES_HEAD_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

    if (resendApiKey && !resendApiKey.startsWith('your_') && salesHeadEmail) {
      const htmlTemplate = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Whitepaper Download Lead</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 40px 20px; }
              .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 75, 135, 0.08); border: 1px solid #e2e8f0; }
              .header { background: #004B87; padding: 28px; text-align: center; color: #ffffff; }
              .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
              .header p { color: rgba(255, 255, 255, 0.8); margin: 6px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
              .content { padding: 32px 28px; }
              .row { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
              .row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
              .label { font-size: 11px; font-weight: 700; color: #004B87; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
              .value { font-size: 15px; color: #0f172a; font-weight: 600; }
              .footer { background-color: #f8fafc; padding: 16px 28px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <p>Prixgen Industrial Practice</p>
                <h2>Whitepaper Download Lead</h2>
              </div>
              <div class="content">
                <div class="row">
                  <div class="label">Downloaded Publication</div>
                  <div class="value">${whitepaperTitle}</div>
                </div>
                <div class="row">
                  <div class="label">Full Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="row">
                  <div class="label">Work Email</div>
                  <div class="value"><a href="mailto:${email}" style="color: #004B87; text-decoration: none;">${email}</a></div>
                </div>
                <div class="row">
                  <div class="label">Phone Number (with Country Code)</div>
                  <div class="value"><a href="tel:${phone}" style="color: #004B87; text-decoration: none;">${phone}</a></div>
                </div>
                <div class="row">
                  <div class="label">Company / Plant</div>
                  <div class="value">${company}</div>
                </div>
                <div class="row">
                  <div class="label">Source Slug</div>
                  <div class="value">${slug}</div>
                </div>
              </div>
              <div class="footer">
                Logged in Sanity CMS under <strong>Whitepaper Downloads</strong>.
              </div>
            </div>
          </body>
        </html>
      `;

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: `Prixgen Leads <${emailFrom}>`,
            to: salesHeadEmail,
            subject: `[Whitepaper Lead] ${name} (${company}) - ${phone}`,
            html: htmlTemplate,
          }),
        });
      } catch (emailErr) {
        console.warn('[WARN] Email dispatch failed for whitepaper download:', emailErr);
      }
    }

    return {
      success: true,
      downloadUrl: downloadPath,
      message: 'Thank you! Your whitepaper is downloading.',
    };
  } catch (error: any) {
    console.error('[ERROR] submitWhitepaperDownload execution error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
