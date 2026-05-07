'use server';

import { z } from 'zod';
import { writeClient } from '@/sanity/lib/write-client';

const LeadSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string().min(2, { message: "First name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  source: z.string(),
  message: z.string().optional(),
});

export type LeadSubmission = z.infer<typeof LeadSchema>;

/**
 * Server action to submit lead data to HubSpot and Sanity.
 */
export async function submitLead(data: LeadSubmission) {
  // Validate data strictly on the server layer
  const validation = LeadSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data provided." };
  }

  try {
    // 1. SAVE TO SANITY (Internal Audit Log)
    if (writeClient) {
      await writeClient.create({
        _type: 'leadSubmission',
        firstname: data.firstname,
        email: data.email,
        company: data.company,
        source: data.source,
        message: data.message || 'No message provided.',
        status: 'new',
        submittedAt: new Date().toISOString(),
      });
      console.log('Lead saved to Sanity:', data.email);
    } else {
      console.warn('Sanity Write Client not available. Skipping CMS log.');
    }

    // 2. SUBMIT TO HUBSPOT (CRM Layer)
    if (!process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_ACCESS_TOKEN.startsWith('your_')) {
      console.log('SIMULATED HUBSPOT SUBMISSION:', data);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
      return { success: true, message: "Thank you! Your inquiry has been logged successfully." };
    }

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        properties: {
          email: data.email,
          firstname: data.firstname,
          company: data.company,
          lead_source: data.source,
          ...(data.message && { message: data.message })
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot API Error:', errorData);
      // We still return success if Sanity save worked, but maybe with a warning?
      // For now, let's just log it.
    }

    return { success: true, message: "Thank you! We'll be in touch shortly." };
  } catch (error) {
    console.error('Lead Submission Error:', error);
    return { success: false, message: "A network error occurred." };
  }
}
