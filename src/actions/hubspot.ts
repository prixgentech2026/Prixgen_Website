'use server';

import { z } from 'zod';

const LeadSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string().min(2, { message: "First name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  source: z.string(),
});

export type LeadSubmission = z.infer<typeof LeadSchema>;

/**
 * Server action to submit lead data to HubSpot.
 */
export async function submitLead(data: LeadSubmission) {
  // Validate data strictly on the server layer
  const validation = LeadSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data provided." };
  }

  try {
    // LOCAL MOCK: If no token or placeholder, simulate success for development
    if (!process.env.HUBSPOT_ACCESS_TOKEN || process.env.HUBSPOT_ACCESS_TOKEN.startsWith('your_')) {
      console.log('SIMULATED LEAD SUBMISSION:', data);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
      return { success: true, message: "SIMULATED: Thank you! We'll be in touch shortly." };
    }

    // DECISION: We use the HubSpot Contacts API v3.
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
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('HubSpot API Error:', errorData);
      return { success: false, message: "Failed to submit. Please try again later." };
    }

    return { success: true, message: "Thank you! We'll be in touch shortly." };
  } catch (error) {
    console.error('HubSpot Submission Error:', error);
    return { success: false, message: "A network error occurred." };
  }
}
