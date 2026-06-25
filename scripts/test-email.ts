import { sendLeadEmailNotification } from '../src/lib/email';

async function runTest() {
  console.log('Triggering Resend email test using configurations from .env.local...');
  console.log(`Target Recipient (SALES_HEAD_EMAIL): ${process.env.SALES_HEAD_EMAIL}`);
  console.log(`Sender (EMAIL_FROM): ${process.env.EMAIL_FROM}`);
  console.log(`API Key prefix: ${process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 7) + '...' : 'Not Set'}`);

  const testLead = {
    firstname: 'John Test',
    email: 'johndoe@example.com',
    company: 'Prixgen Diagnostic Tech',
    phone: '+91 99999 99999',
    source: 'Email Integration Diagnostic Test',
    message: 'This is a diagnostic lead notification verifying that Resend API connection is correctly configured.'
  };

  const result = await sendLeadEmailNotification(testLead);
  console.log('Diagnostic result:', result);
}

runTest();
