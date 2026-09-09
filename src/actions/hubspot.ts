'use server';

import { z } from 'zod';
import { writeClient } from '@/sanity/lib/write-client';
import { sendLeadEmailNotification } from '@/lib/email';

const LeadSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string().min(2, { message: "First name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  phone: z.string().optional(),
  source: z.string(),
  message: z.string().optional(),
});

export type LeadSubmission = z.infer<typeof LeadSchema>;

/**
 * Server action to log lead submissions to Sanity CMS and dispatch automated email notifications.
 */
export async function submitLead(data: LeadSubmission) {
  const validation = LeadSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data provided." };
  }

  try {
    // 1. SAVE TO SANITY
    if (writeClient) {
      try {
        await writeClient.create({
          _type: 'leadSubmission',
          firstname: data.firstname,
          email: data.email,
          company: data.company,
          phone: data.phone || '',
          source: data.source,
          message: data.message || 'No message provided.',
          status: 'new',
          submittedAt: new Date().toISOString(),
        });
        console.log('[SUCCESS] Lead saved to Sanity:', data.email);
      } catch (sanityError: any) {
        console.warn('Sanity write failed, retrying without phone field:', sanityError.message || sanityError);
        try {
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
          console.log('[SUCCESS] Lead saved to Sanity (fallback):', data.email);
        } catch (retryError) {
          console.error('Sanity write failed completely:', retryError);
        }
      }
    } else {
      console.warn('Sanity Write Client not available. Skipping CMS log.');
    }

    // 2. DISPATCH AUTOMATED EMAIL NOTIFICATION
    try {
      await sendLeadEmailNotification(data);
      console.log('[SUCCESS] Dispatched lead email notification for:', data.email);
    } catch (emailError) {
      console.error('[WARN] Email dispatch failed inside server action:', emailError);
    }

    return { success: true, message: "Thank you! We'll be in touch shortly." };
  } catch (error) {
    console.error('Lead Submission Error:', error);
    return { success: false, message: "A network error occurred." };
  }
}


