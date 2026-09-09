'use server';

import { z } from 'zod';
import { writeClient } from '@/sanity/lib/write-client';
import { sendWhitepaperEmailNotification } from '@/lib/email';

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

    // 2. DISPATCH NOTIFICATION EMAIL TO KARTHIK@PRIXGEN.COM & PRIXGENTECH@GMAIL.COM
    try {
      await sendWhitepaperEmailNotification(validation.data);
    } catch (emailErr) {
      console.warn('[WARN] Email dispatch failed for whitepaper download:', emailErr);
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

