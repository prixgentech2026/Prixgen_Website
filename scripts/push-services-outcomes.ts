import { createClient } from '@sanity/client';
import { servicesPageMockData } from '../src/lib/data';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity configuration in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-01',
});

async function pushOutcomes() {
  console.log('Fetching existing servicesPage document...');
  try {
    const existingDoc = await client.fetch('*[_type == "servicesPage"][0]');
    
    if (!existingDoc) {
      console.log('No servicesPage document found. Creating one...');
      const newDoc = {
        _type: 'servicesPage',
        _id: 'servicesPage',
        title: servicesPageMockData.title,
        subtitle: servicesPageMockData.subtitle,
        heroSubheadline: servicesPageMockData.heroSubheadline,
        methodology: servicesPageMockData.methodology.map(m => ({ _key: Math.random().toString(36).substr(2, 9), ...m })),
        outcomes: servicesPageMockData.outcomes.map(o => ({ _key: Math.random().toString(36).substr(2, 9), ...o })),
        seo: servicesPageMockData.seo,
      };
      await client.create(newDoc);
      console.log('Services Page document created successfully.');
    } else {
      console.log('Updating outcomes in existing servicesPage document...');
      await client
        .patch(existingDoc._id)
        .set({
          outcomes: servicesPageMockData.outcomes.map(o => ({ _key: Math.random().toString(36).substr(2, 9), ...o }))
        })
        .commit();
      console.log('Outcomes updated successfully!');
    }
  } catch (error) {
    console.error('Error updating Sanity:', error);
  }
}

pushOutcomes();
