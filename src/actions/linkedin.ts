'use server';

import { createClient } from '@sanity/client';
import { revalidatePath } from 'next/cache';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-05-01',
});

export async function updateLinkedInSettings(formData: FormData) {
  const accessToken = formData.get('accessToken') as string;
  const orgId = formData.get('orgId') as string;

  if (!accessToken || !orgId) {
    return { success: false, error: 'All fields are required' };
  }

  try {
    // 1. Get current settings ID if it exists
    const current = await sanityClient.fetch(`*[_type == "linkedinSettings"][0]._id`);
    
    if (current) {
      await sanityClient
        .patch(current)
        .set({
          accessToken,
          orgId,
          lastUpdated: new Date().toISOString()
        })
        .commit();
    } else {
      await sanityClient.create({
        _type: 'linkedinSettings',
        accessToken,
        orgId,
        lastUpdated: new Date().toISOString()
      });
    }

    revalidatePath('/admin/linkedin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to update LinkedIn settings:', error);
    return { success: false, error: error.message };
  }
}

export async function getLinkedInSettings() {
  try {
    return await sanityClient.fetch(`*[_type == "linkedinSettings"][0]{
      accessToken,
      orgId,
      lastUpdated
    }`);
  } catch (error) {
    return null;
  }
}
