import { NextResponse } from 'next/server';
import { sendWhitepaperEmailNotification } from '@/lib/email';

/**
 * Sanity Webhook Endpoint for Whitepaper Downloads
 * Triggered automatically when a whitepaperDownload document is created or updated in Sanity Studio.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    console.log('[SANITY WEBHOOK] Received payload:', body);

    // Sanity webhooks can send the document directly or wrapped under { body: ... }
    const doc = body?.body || body;

    // Check if this is a whitepaper download document
    if (doc?._type === 'whitepaperDownload' || doc?.name || doc?.email) {
      const { name, email, phone, company, whitepaperTitle, slug, downloadPath } = doc;

      if (email && name) {
        await sendWhitepaperEmailNotification({
          name: String(name),
          email: String(email),
          phone: String(phone || 'Not Provided'),
          company: String(company || 'Not Specified'),
          whitepaperTitle: String(whitepaperTitle || 'PVC & Plastics Connected Operating Model Whitepaper'),
          slug: String(slug || 'pvc-manufacturing'),
          downloadPath: String(downloadPath || '/PVC_whitepaper.pdf'),
        });

        console.log('[SANITY WEBHOOK SUCCESS] Dispatched email notification for:', email);
        return NextResponse.json({ success: true, message: 'Notification email dispatched.' });
      }
    }

    return NextResponse.json({ success: true, message: 'Ignored non-matching document payload.' });
  } catch (err: any) {
    console.error('[SANITY WEBHOOK ERROR]', err.message || err);
    return NextResponse.json({ success: false, error: err.message || 'Internal error' }, { status: 500 });
  }
}
