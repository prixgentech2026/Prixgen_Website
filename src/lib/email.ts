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
  from?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
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
async function dispatchEmail({ to, subject, html, replyTo, from, attachments }: DispatchMailOptions) {
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || 'prixgentech@gmail.com';
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const emailFrom = from || process.env.EMAIL_FROM || `"Prixgen Tech" <${smtpUser}>`;

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
        attachments: attachments && attachments.length > 0 ? attachments : undefined,
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
  const submissionTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>New Lead Inquiry</title>
      </head>
      <body style="margin: 0; padding: 24px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; border-top: 4px solid #004B87;">
          <tr>
            <td style="padding: 24px 28px 16px; border-bottom: 1px solid #e5e7eb;">
              <div style="font-size: 11px; font-weight: 700; color: #004B87; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Prixgen Web Inquiries</div>
              <h2 style="margin: 0; font-size: 20px; color: #111827; font-weight: 700;">New Lead Inquiry Received</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 140px; vertical-align: top; font-weight: 500;">Contact Name</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${lead.firstname}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Company</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${lead.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Email Address</td>
                  <td style="padding: 8px 0; vertical-align: top;"><a href="mailto:${lead.email}" style="color: #004B87; text-decoration: none; font-weight: 600;">${lead.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Phone Number</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${lead.phone ? `<a href="tel:${lead.phone}" style="color: #004B87; text-decoration: none; font-weight: 600;">${lead.phone}</a>` : 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Inquiry Source</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${lead.source}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Submitted At (IST)</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${submissionTimestamp}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 16px;">
                    <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; margin-bottom: 6px;">Message</div>
                    <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px 14px; font-size: 13px; color: #374151; white-space: pre-wrap; line-height: 1.5;">${lead.message || 'No message provided.'}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 28px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              This is an automated notification from the Prixgen website to <strong>${recipientList.join(', ')}</strong>.
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return dispatchEmail({
    to: recipientList,
    subject: `[New Lead] ${lead.firstname} - ${lead.company}`,
    html: htmlTemplate,
    replyTo: lead.email ? [lead.email, 'prixgentech@gmail.com'] : ['prixgentech@gmail.com'],
  });
}

export interface JobApplicationEmailData {
  fullName: string;
  email: string;
  appliedFor: string;
  resumeFileName?: string;
  resumeBuffer?: Buffer;
}

/**
 * Sends an email notification when a job candidate applies on the careers page.
 * Dispatches from prixgentech@gmail.com directly to HR (hr@prixgen.com) with the Resume PDF attached!
 */
export async function sendJobApplicationEmailNotification(app: JobApplicationEmailData) {
  const hrEmail = (process.env.HR_EMAIL || 'hr@prixgen.com').trim();
  const recipientList = [hrEmail];
  const submissionTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>New Job Application</title>
      </head>
      <body style="margin: 0; padding: 24px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; border-top: 4px solid #004B87;">
          <tr>
            <td style="padding: 24px 28px 16px; border-bottom: 1px solid #e5e7eb;">
              <div style="font-size: 11px; font-weight: 700; color: #004B87; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Careers Portal</div>
              <h2 style="margin: 0; font-size: 20px; color: #111827; font-weight: 700;">New Job Application Received</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 150px; vertical-align: top; font-weight: 500;">Candidate Full Name</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${app.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Applied Position</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${app.appliedFor}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Email Address</td>
                  <td style="padding: 8px 0; vertical-align: top;"><a href="mailto:${app.email}" style="color: #004B87; text-decoration: none; font-weight: 600;">${app.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Candidate Resume</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">
                    📎 Attached directly: <strong>${app.resumeFileName || 'Resume.pdf'}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Applied At (IST)</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${submissionTimestamp}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 28px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; line-height: 1.5;">
              Candidate resume PDF is attached directly to this email.<br />
              Notification dispatched directly to: <strong>${hrEmail}</strong>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return dispatchEmail({
    to: recipientList,
    from: `"Prixgen HR Team" <prixgentech@gmail.com>`,
    subject: `[Job Application] ${app.fullName} - ${app.appliedFor}`,
    html: htmlTemplate,
    replyTo: [app.email, hrEmail],
    attachments: app.resumeBuffer
      ? [
          {
            filename: app.resumeFileName || 'Resume.pdf',
            content: app.resumeBuffer,
            contentType: 'application/pdf',
          },
        ]
      : undefined,
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
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Whitepaper Download Notification</title>
      </head>
      <body style="margin: 0; padding: 24px; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; border-top: 4px solid #004B87;">
          <tr>
            <td style="padding: 24px 28px 16px; border-bottom: 1px solid #e5e7eb;">
              <div style="font-size: 11px; font-weight: 700; color: #004B87; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Whitepaper Download Lead</div>
              <h2 style="margin: 0; font-size: 20px; color: #111827; font-weight: 700;">Whitepaper Downloaded</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 28px;">
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; color: #166534; font-size: 14px; font-weight: 600;">
                📄 ${whitepaperTitle}
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.6;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; width: 140px; vertical-align: top; font-weight: 500;">Prospect Name</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Company</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${data.company}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Work Email</td>
                  <td style="padding: 8px 0; vertical-align: top;"><a href="mailto:${data.email}" style="color: #004B87; text-decoration: none; font-weight: 600;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Phone Number</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;"><a href="tel:${data.phone}" style="color: #004B87; text-decoration: none; font-weight: 600;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Category / Slug</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${data.slug || 'General'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; vertical-align: top; font-weight: 500;">Downloaded At (IST)</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; vertical-align: top;">${downloadTimestamp}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 28px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
              This is an automated notification from the Prixgen Whitepapers library to <strong>${recipientList.join(', ')}</strong>.
            </td>
          </tr>
        </table>
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

