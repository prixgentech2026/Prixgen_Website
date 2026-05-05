import * as fs from 'fs';
import * as path from 'path';

// 0. Load environment variables from .env.local manually if not present
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^#\s=]+)\s*=\s*(.*)$/);
      if (match) {
        const key = match[1];
        let value = match[2].trim();
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

import { 
  homeData, 
  industriesData, 
  solutionsData, 
  servicesData,
  aboutData,
  contactData,
  servicesPageMockData
} from '../src/lib/data';

// 1. Initialize the Sanity Client
import { createClient } from '@sanity/client';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('❌ ERROR: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in environment variables.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-04-30',
  useCdn: false,
  token,
});

/**
 * Helper to upload an image from a URL to Sanity
 */
async function uploadImage(imageUrl: string) {
  if (!imageUrl || !imageUrl.startsWith('http')) return null;
  
  try {
    console.log(`   Uploading image: ${imageUrl.substring(0, 50)}...`);
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: path.basename(imageUrl.split('?')[0])
    });
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (error) {
    console.error(`   ⚠️ Failed to upload image ${imageUrl}:`, error);
    return null;
  }
}

/**
 * Process a document and upload its images
 */
async function processImages(item: any) {
  const processed = { ...item };
  
  if (item.featuredImage?.sourceUrl) {
    const asset = await uploadImage(item.featuredImage.sourceUrl);
    if (asset) {
      processed.featuredImage = {
        ...asset,
        altText: item.featuredImage.altText
      };
    }
  }

  if (item.summaryImage?.sourceUrl) {
    const asset = await uploadImage(item.summaryImage.sourceUrl);
    if (asset) {
      processed.summaryImage = {
        ...asset,
        altText: item.summaryImage.altText
      };
    }
  }

  if (item.heroImage?.sourceUrl) {
    const asset = await uploadImage(item.heroImage.sourceUrl);
    if (asset) {
      processed.heroImage = asset;
    }
  }

  return processed;
}

async function migrateData() {
  console.log('🚀 Starting Advanced Data Migration (with Image Processing)...\n');

  // ---------------------------------------------------------
  // MIGRATING HOME PAGE
  // ---------------------------------------------------------
  console.log('Migrating Home Page...');
  try {
    const processedHome = await processImages(homeData);
    await client.createOrReplace({
      _id: 'homePage',
      _type: 'home',
      ...processedHome,
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
    const processedAbout = await processImages(aboutData);
    await client.createOrReplace({
      _id: 'aboutPage',
      _type: 'about',
      ...processedAbout,
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
    const processedContact = await processImages(contactData);
    await client.createOrReplace({
      _id: 'contactPage',
      _type: 'contact',
      ...processedContact,
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
      const processed = await processImages(item);
      await client.createOrReplace({
        _id: `industry-${item.slug}`,
        _type: 'industry',
        ...processed,
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
      const processed = await processImages(item);
      await client.createOrReplace({
        _id: `solution-${item.slug}`,
        _type: 'solution',
        ...processed,
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
      const processed = await processImages(item);
      await client.createOrReplace({
        _id: `service-${item.slug}`,
        _type: 'service',
        ...processed,
        slug: { _type: 'slug', current: item.slug }
      });
      console.log(`✅ Service migrated: ${item.title}`);
    } catch (error) {
      console.error(`❌ Failed to migrate service ${item.title}:`, error);
    }
  }

  // ---------------------------------------------------------
  // MIGRATING SERVICES LANDING PAGE
  // ---------------------------------------------------------
  console.log('\nMigrating Services Landing Page...');
  try {
    const coreServiceRefs = servicesPageMockData.coreServices.map(service => ({
      _type: 'reference',
      _ref: `service-${service.slug}`,
      _key: `ref-${service.slug}`
    }));

    await client.createOrReplace({
      _id: 'servicesPage',
      _type: 'servicesPage',
      ...servicesPageMockData,
      coreServices: coreServiceRefs
    });
    console.log('✅ Services Landing Page migrated successfully.');
  } catch (error) {
    console.error('❌ Failed to migrate Services Page:', error);
  }

  console.log('\n🎉 Migration complete! Go check your Sanity Studio.');
}

migrateData();
