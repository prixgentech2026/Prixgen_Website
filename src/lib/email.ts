import { LeadSubmission } from '@/actions/hubspot';

/**
 * Sends an email notification to the sales head when a new lead is submitted.
 * Uses native fetch to interact with the Resend API.
 */
export async function sendLeadEmailNotification(lead: LeadSubmission) {
  const salesHeadEmail = process.env.SALES_HEAD_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

  if (!resendApiKey || resendApiKey.startsWith('your_')) {
    console.log('\n==================================================');
    console.log('SIMULATED LEAD EMAIL SEND (RESEND_API_KEY is not configured):');
    console.log(`To: ${salesHeadEmail || 'Not configured (SALES_HEAD_EMAIL)'}`);
    console.log(`From: ${emailFrom}`);
    console.log(`Subject: New Lead Submitted: ${lead.firstname} from ${lead.company}`);
    console.log('Lead Details:', lead);
    console.log('==================================================\n');
    return { success: true, message: 'Email simulation successful.' };
  }

  if (!salesHeadEmail) {
    console.warn('[WARN] SALES_HEAD_EMAIL is not set. Skipping lead notification email.');
    return { success: false, message: 'Recipient email is not configured.' };
  }

  // Beautiful modern HTML email design matching Prixgen branding
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Lead Inquiry</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 75, 135, 0.05);
            border: 1px border #e2e8f0;
          }
          .header {
            background: linear-gradient(135deg, #004B87 0%, #0ea5e9 100%);
            padding: 32px;
            text-align: center;
          }
          .header h2 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .header p {
            color: rgba(255, 255, 255, 0.8);
            margin: 8px 0 0 0;
            font-size: 14px;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 0.1em;
          }
          .content {
            padding: 40px 32px;
          }
          .detail-row {
            margin-bottom: 24px;
            border-bottom: 1px solid #f1f5f9;
            padding-bottom: 16px;
          }
          .detail-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
          }
          .label {
            font-size: 11px;
            font-weight: bold;
            color: #0ea5e9;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 6px;
          }
          .value {
            font-size: 16px;
            color: #0f172a;
            font-weight: 600;
          }
          .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #004B87;
            padding: 20px;
            border-radius: 12px;
            font-size: 15px;
            color: #334155;
            line-height: 1.6;
            margin-top: 8px;
            font-weight: normal;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #f1f5f9;
            font-size: 12px;
            color: #64748b;
          }
          .footer a {
            color: #004B87;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p>Prixgen Intelligence Portal</p>
            <h2>New Business Inquiry</h2>
          </div>
          
          <div class="content">
            <div class="detail-row">
              <div class="label">Inquirer Name</div>
              <div class="value">${lead.firstname}</div>
            </div>
            
            <div class="detail-row">
              <div class="label">Company Name</div>
              <div class="value">${lead.company}</div>
            </div>
            
            <div class="detail-row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${lead.email}" style="color: #004B87; text-decoration: none;">${lead.email}</a></div>
            </div>
            
            <div class="detail-row">
              <div class="label">Phone Number</div>
              <div class="value">${lead.phone || 'Not Provided'}</div>
            </div>
            
            <div class="detail-row">
              <div class="label">Inquiry Source</div>
              <div class="value">${lead.source}</div>
            </div>
            
            <div class="detail-row" style="border-bottom: none; padding-bottom: 0;">
              <div class="label">Message Details</div>
              <div class="message-box">
                ${(lead.message || 'No message provided.').replace(/\n/g, '<br />')}
              </div>
            </div>
          </div>
          
          <div class="footer">
            Sent automatically by Prixgen Enterprise Web Engine.<br />
            Manage your leads in the <a href="https://www.prixgen.com/studio" target="_blank">Sanity Studio</a> or HubSpot CRM.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: `Prixgen Leads <${emailFrom}>`,
        to: salesHeadEmail,
        subject: `[New Inquiry] ${lead.firstname} - ${lead.company}`,
        html: htmlTemplate,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ERROR] Resend API Mail Send Failed:', errorText);
      return { success: false, message: `Resend error: ${errorText}` };
    }

    const resData = await response.json();
    console.log('[SUCCESS] Lead notification email sent via Resend. ID:', resData.id);
    return { success: true, id: resData.id };
  } catch (err: any) {
    console.error('[ERROR] Failed to dispatch Resend email:', err.message || err);
    return { success: false, message: err.message || err };
  }
}
