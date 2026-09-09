import nodemailer from 'nodemailer';
import { LeadSubmission } from '@/actions/hubspot';

export interface WhitepaperDownloadEmailData {
  name: string;
  email: string;
  phone: string;
  company: string;
  whitepaperTitle?: string;
  slug?: string;
  downloadPath?: string;
}

interface DispatchMailOptions {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string | string[];
}

/**
 * Helper to get clean array of recipient emails
 */
function getRecipientEmails(customEnvKey?: string): string[] {
  const envVal = (customEnvKey && process.env[customEnvKey]) || process.env.SALES_HEAD_EMAIL || '';
  const parsed = envVal
    .split(',')
    .map((e) => e.trim())
    .filter((e) => Boolean(e) && e.includes('@'));

  if (parsed.length > 0) {
    return parsed;
  }

  // Default fallback if env is missing or empty
  return ['karthik@prixgen.com', 'prixgentech@gmail.com'];
}

/**
 * Universal Mail Dispatcher:
 * 1. Prioritizes Gmail SMTP (nodemailer) if SMTP_PASS / GMAIL_APP_PASSWORD is set
 * 2. Falls back to Resend API if RESEND_API_KEY is available
 * 3. Falls back to local console simulation otherwise
 */
async function dispatchEmail({ to, subject, html, replyTo }: DispatchMailOptions) {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'prixgentech@gmail.com';
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const emailFrom = process.env.EMAIL_FROM || `"Prixgen Tech" <${smtpUser}>`;

  // 1. GMAIL SMTP VIA NODEMAILER
  if (smtpPass && !smtpPass.startsWith('your_')) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass.replace(/\s+/g, ''), // clean any accidental whitespace in app password
        },
      });

      const info = await transporter.sendMail({
        from: emailFrom,
        to: to.join(', '),
        replyTo: Array.isArray(replyTo) ? replyTo.join(', ') : replyTo,
        subject,
        html,
      });

      console.log(`[SUCCESS] Email sent via Gmail SMTP (${smtpUser}) to ${to.join(', ')} - MessageID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (smtpErr: any) {
      console.error('[ERROR] Gmail SMTP sending failed:', smtpErr.message || smtpErr);
      return { success: false, error: smtpErr.message || smtpErr };
    }
  }

  // 2. FALLBACK TO RESEND API
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && !resendApiKey.startsWith('your_')) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: emailFrom.includes('resend.dev') ? emailFrom : `Prixgen Leads <onboarding@resend.dev>`,
          to,
          reply_to: Array.isArray(replyTo) ? replyTo : replyTo ? [replyTo] : undefined,
          subject,
          html,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[ERROR] Resend API Mail Send Failed:', errorText);
        return { success: false, message: `Resend error: ${errorText}` };
      }

      const resData = await response.json();
      console.log('[SUCCESS] Email sent via Resend. ID:', resData.id);
      return { success: true, id: resData.id };
    } catch (err: any) {
      console.error('[ERROR] Failed to dispatch Resend email:', err.message || err);
      return { success: false, message: err.message || err };
    }
  }

  // 3. CONSOLE SIMULATION
  console.log('\n==================================================');
  console.log('SIMULATED EMAIL DISPATCH (No SMTP_PASS or RESEND_API_KEY configured):');
  console.log(`To: ${to.join(', ')}`);
  console.log(`From: ${emailFrom}`);
  console.log(`Subject: ${subject}`);
  console.log('==================================================\n');
  return { success: true, message: 'Email simulated.' };
}

/**
 * Sends an email notification to the sales team when a new lead is submitted.
 */
export async function sendLeadEmailNotification(lead: LeadSubmission) {
  const recipientList = getRecipientEmails();

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
            border: 1px solid #e2e8f0;
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
            color: rgba(255, 255, 255, 0.85);
            margin: 8px 0 0 0;
            font-size: 13px;
            text-transform: uppercase;
            font-weight: 700;
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
              <div class="value"><a href="tel:${lead.phone || ''}" style="color: #004B87; text-decoration: none;">${lead.phone || 'Not Provided'}</a></div>
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
            Sent automatically by Prixgen Web Engine.<br />
            Manage your leads in <a href="https://www.prixgen.com/studio" target="_blank">Sanity Studio</a> or HubSpot CRM.
          </div>
        </div>
      </body>
    </html>
  `;

  return dispatchEmail({
    to: recipientList,
    subject: `[New Inquiry] ${lead.firstname} - ${lead.company}`,
    html: htmlTemplate,
    replyTo: lead.email ? [lead.email, 'prixgentech@gmail.com'] : ['prixgentech@gmail.com'],
  });
}

/**
 * Sends an email notification when a viewer downloads a whitepaper.
 * Notifies karthik@prixgen.com and prixgentech@gmail.com with complete viewer details.
 */
export async function sendWhitepaperEmailNotification(data: WhitepaperDownloadEmailData) {
  const recipientList = getRecipientEmails('WHITEPAPER_LEADS_EMAIL');
  const whitepaperTitle = data.whitepaperTitle || 'Prixgen Industrial Whitepaper';
  const downloadTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Whitepaper Download Notification</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
            background-color: #0f172a; 
            color: #1e293b; 
            margin: 0;
            padding: 40px 16px; 
          }
          .container { 
            max-width: 620px; 
            margin: 0 auto; 
            background: #ffffff; 
            border-radius: 20px; 
            overflow: hidden; 
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25); 
            border: 1px solid #e2e8f0; 
          }
          .header { 
            background: linear-gradient(135deg, #004B87 0%, #0284c7 100%); 
            padding: 36px 28px; 
            text-align: center; 
            color: #ffffff; 
          }
          .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.35);
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 4px 12px;
            border-radius: 100px;
            margin-bottom: 12px;
          }
          .header h2 { 
            margin: 0; 
            font-size: 22px; 
            font-weight: 800; 
            letter-spacing: -0.02em;
          }
          .header p { 
            color: rgba(255, 255, 255, 0.85); 
            margin: 8px 0 0 0; 
            font-size: 13px; 
          }
          .content { 
            padding: 32px 28px; 
          }
          .highlight-card {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .highlight-card .icon {
            font-size: 20px;
          }
          .highlight-card .text {
            font-size: 13px;
            color: #166534;
            font-weight: 600;
          }
          .row { 
            margin-bottom: 18px; 
            padding-bottom: 14px; 
            border-bottom: 1px solid #f1f5f9; 
          }
          .row:last-child { 
            border-bottom: none; 
            margin-bottom: 0; 
            padding-bottom: 0; 
          }
          .label { 
            font-size: 11px; 
            font-weight: 700; 
            color: #0284c7; 
            text-transform: uppercase; 
            letter-spacing: 0.08em; 
            margin-bottom: 4px; 
          }
          .value { 
            font-size: 15px; 
            color: #0f172a; 
            font-weight: 600; 
          }
          .action-btn {
            display: inline-block;
            background: #004B87;
            color: #ffffff !important;
            padding: 12px 24px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 700;
            font-size: 13px;
            margin-top: 16px;
            text-align: center;
          }
          .footer { 
            background-color: #f8fafc; 
            padding: 20px 28px; 
            text-align: center; 
            border-top: 1px solid #f1f5f9; 
            font-size: 12px; 
            color: #64748b; 
          }
          .footer a {
            color: #004B87;
            text-decoration: none;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">Live Download Lead</div>
            <h2>Strategic Whitepaper Downloaded</h2>
            <p>A new prospect has requested and downloaded your publication.</p>
          </div>

          <div class="content">
            <div class="highlight-card">
              <span class="icon">📄</span>
              <span class="text"><strong>${whitepaperTitle}</strong></span>
            </div>

            <div class="row">
              <div class="label">Prospect Full Name</div>
              <div class="value">${data.name}</div>
            </div>

            <div class="row">
              <div class="label">Company / Manufacturing Plant</div>
              <div class="value">${data.company}</div>
            </div>

            <div class="row">
              <div class="label">Work Email Address</div>
              <div class="value">
                <a href="mailto:${data.email}" style="color: #004B87; text-decoration: none; font-weight: 700;">
                  ${data.email}
                </a>
              </div>
            </div>

            <div class="row">
              <div class="label">Direct Contact Number (with Country Code)</div>
              <div class="value">
                <a href="tel:${data.phone}" style="color: #004B87; text-decoration: none; font-weight: 700;">
                  ${data.phone}
                </a>
              </div>
            </div>

            <div class="row">
              <div class="label">Industry / Slug</div>
              <div class="value">${data.slug || 'General'}</div>
            </div>

            <div class="row">
              <div class="label">Downloaded At (IST)</div>
              <div class="value">${downloadTimestamp}</div>
            </div>

            <div style="text-align: center; margin-top: 24px;">
              <a href="https://www.prixgen.com/studio/structure/whitepaperDownload" target="_blank" class="action-btn">
                Open in Sanity Studio Leads →
              </a>
            </div>
          </div>

          <div class="footer">
            Logged automatically in Sanity CMS under <strong>Whitepaper Downloads</strong>.<br />
            Notifications dispatched to: <strong>${recipientList.join(', ')}</strong>
          </div>
        </div>
      </body>
    </html>
  `;

  return dispatchEmail({
    to: recipientList,
    subject: `[Whitepaper Lead] ${data.name} (${data.company}) - ${data.phone}`,
    html: htmlTemplate,
    replyTo: [data.email, 'prixgentech@gmail.com'],
  });
}

