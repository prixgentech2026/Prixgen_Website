import { createClient } from '@sanity/client';
import { 
  homeData, 
  industriesData, 
  solutionsData, 
  servicesData,
  aboutData,
  contactData
} from '../src/lib/data';

// 1. Initialize the Sanity Client
// We use process.env to grab the required variables.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌ ERROR: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in environment variables.');
  console.error('Make sure you have added them to your .env.local file and exported them if running locally.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-04-30',
  useCdn: false, // We must bypass the CDN to write data
  token,         // Write-access token
});

async function migrateData() {
  console.log('🚀 Starting Data Migration to Sanity...\n');

  // ---------------------------------------------------------
  // MIGRATING HOME PAGE
  // ---------------------------------------------------------
  console.log('Migrating Home Page...');
  try {
    await client.createOrReplace({
      _id: 'homePage', // Custom stable ID for singleton
      _type: 'home',
      ...homeData,
      clients: homeData.clients,
      testimonials: homeData.testimonials
    });
    console.log('✅ Home Page migrated successfully.');
  } catch (error) {
    console.error('❌ Failed to migrate Home Page:', error);
  }

  // ---------------------------------------------------------
  // MIGRATING ABOUT PAGE
  // ---------------------------------------------------------
  console.log('\nMigrating About Us Page...');
  try {
    await client.createOrReplace({
      _id: 'aboutPage',
      _type: 'about',
      ...aboutData,
      // We remove the featuredImage placeholder as it caused a reference error
      featuredImage: undefined 
    });
    console.log('✅ About Us Page migrated successfully.');
  } catch (error) {
    console.error('❌ Failed to migrate About Page:', error);
  }

  // ---------------------------------------------------------
  // MIGRATING CONTACT PAGE
  // ---------------------------------------------------------
  console.log('\nMigrating Contact Page...');
  try {
    await client.createOrReplace({
      _id: 'contactPage',
      _type: 'contact',
      ...contactData
    });
    console.log('✅ Contact Page migrated successfully.');
  } catch (error) {
    console.error('❌ Failed to migrate Contact Page:', error);
  }

  // ---------------------------------------------------------
  // MIGRATING INDUSTRIES
  // ---------------------------------------------------------
  console.log('\nMigrating Industries...');
  for (const item of industriesData) {
    try {
      await client.createOrReplace({
        // We use the slug as part of the ID so we don't create duplicates if run twice
        _id: `industry-${item.slug}`,
        _type: 'industry',
        ...item,
        // Sanity expects slugs to be objects with a 'current' property
        slug: { _type: 'slug', current: item.slug }
      });
      console.log(`✅ Industry migrated: ${item.title}`);
    } catch (error) {
      console.error(`❌ Failed to migrate industry ${item.title}:`, error);
    }
  }

  // ---------------------------------------------------------
  // MIGRATING SOLUTIONS
  // ---------------------------------------------------------
  console.log('\nMigrating Solutions...');
  for (const item of solutionsData) {
    try {
      await client.createOrReplace({
        _id: `solution-${item.slug}`,
        _type: 'solution',
        ...item,
        slug: { _type: 'slug', current: item.slug }
      });
      console.log(`✅ Solution migrated: ${item.title}`);
    } catch (error) {
      console.error(`❌ Failed to migrate solution ${item.title}:`, error);
    }
  }

  // ---------------------------------------------------------
  // MIGRATING SERVICES
  // ---------------------------------------------------------
  console.log('\nMigrating Services...');
  for (const item of servicesData) {
    try {
      await client.createOrReplace({
        _id: `service-${item.slug}`,
        _type: 'service',
        ...item,
        slug: { _type: 'slug', current: item.slug }
      });
      console.log(`✅ Service migrated: ${item.title}`);
    } catch (error) {
      console.error(`❌ Failed to migrate service ${item.title}:`, error);
    }
  }

  console.log('\n🎉 Migration complete! Go check your Sanity Studio.');
}

// Execute the function
migrateData();
