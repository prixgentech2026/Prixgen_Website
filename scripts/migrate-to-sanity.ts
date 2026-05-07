import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { 
  homeData, 
  aboutData, 
  contactData, 
  industriesData, 
  solutionsData, 
  servicesData,
  servicesPageMockData,
  industriesPageMockData
} from '../src/lib/data';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity configuration. Please run with: npx tsx --env-file .env.local scripts/migrate-to-sanity.ts');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-01',
});

async function uploadImage(url: string) {
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000';
  
  console.log(`Uploading image: ${url}`);
  try {
    let buffer: Buffer;
    let filename: string;

    if (url.startsWith('file://') || url.startsWith('C:') || url.startsWith('/') || fs.existsSync(url)) {
      const filePath = url.startsWith('file://') ? url.replace('file:///', '').replace('file://', '') : url;
      buffer = fs.readFileSync(filePath);
      filename = path.basename(filePath);
    } else {
      let response = await fetch(url);
      
      if (!response.ok) {
        console.warn(`[WARN] Failed to fetch ${url}. Using fallback image.`);
        response = await fetch(FALLBACK_IMAGE);
      }
      
      if (!response.ok) throw new Error(`Failed to fetch even the fallback image: ${response.statusText}`);
      
      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      filename = url.split('/').pop()?.split('?')[0] || 'image.jpg';
    }
    
    const asset = await client.assets.upload('image', buffer, {
      filename,
    });
    console.log(`[SUCCESS] Image uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`[ERROR] Failed to upload ${url}:`, error);
    return null;
  }
}

const PREMIUM_IMAGES: Record<string, string> = {
  'manufacturing': 'C:/Users/Dell/.gemini/antigravity/brain/f842cbc1-f7da-441f-bf56-d2950f6d5108/manufacturing_industry_premium_1778137573049.png',
  'retail': 'C:/Users/Dell/.gemini/antigravity/brain/f842cbc1-f7da-441f-bf56-d2950f6d5108/retail_omnichannel_premium_1778137593723.png',
  'chemicals': 'C:/Users/Dell/.gemini/antigravity/brain/f842cbc1-f7da-441f-bf56-d2950f6d5108/chemicals_processing_premium_1778137616364.png',
  'fmcg-distribution': 'C:/Users/Dell/.gemini/antigravity/brain/f842cbc1-f7da-441f-bf56-d2950f6d5108/fmcg_distribution_premium_1778137636665.png',
  'information-services': 'C:/Users/Dell/.gemini/antigravity/brain/f842cbc1-f7da-441f-bf56-d2950f6d5108/information_services_premium_1778137656742.png',
  'dairy': 'C:/Users/Dell/.gemini/antigravity/brain/f842cbc1-f7da-441f-bf56-d2950f6d5108/dairy_processing_premium_1778137680236.png',
  'electronics': 'C:/Users/Dell/.gemini/antigravity/brain/f842cbc1-f7da-441f-bf56-d2950f6d5108/electronics_manufacturing_premium_1778137704583.png',
};

async function migrateHome() {
  console.log('Migrating Home Data...');
  const imageId = await uploadImage(homeData.heroImage.asset as string);
  
  const doc = {
    _type: 'home',
    _id: 'home',
    title: homeData.title,
    heroImage: imageId ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageId,
      },
    } : undefined,
    subheadline: homeData.subheadline,
    heroPrimaryCTA: homeData.heroPrimaryCTA,
    heroSecondaryCTA: homeData.heroSecondaryCTA,
    socialProof: homeData.socialProof,
    clients: homeData.clients.map(c => ({ _key: Math.random().toString(36).substr(2, 9), ...c })),
    testimonials: homeData.testimonials.map(t => ({ _key: Math.random().toString(36).substr(2, 9), ...t })),
    ctaTitle: homeData.ctaTitle,
    ctaDescription: homeData.ctaDescription,
    ctaButtonText: homeData.ctaButtonText,
    seo: homeData.seo,
  };

  await client.createIfNotExists({ _type: 'home', _id: 'home' });
  await client.patch('home').set(doc).commit();
  console.log('Home Data Migrated.');
}

async function migrateAbout() {
  console.log('Migrating About Data...');
  const imageId = await uploadImage(aboutData.featuredImage.sourceUrl);

  const doc = {
    _type: 'about',
    _id: 'about',
    title: aboutData.title,
    subtitle: aboutData.subtitle,
    content: aboutData.content,
    vision: aboutData.vision,
    mission: aboutData.mission,
    stats: aboutData.stats.map(s => ({ _key: Math.random().toString(36).substr(2, 9), ...s })),
    whyChooseUsIntro: aboutData.whyChooseUsIntro,
    whyChooseUs: aboutData.whyChooseUs.map(w => ({ _key: Math.random().toString(36).substr(2, 9), ...w })),
    experienceSection: {
      ...aboutData.experienceSection,
      points: aboutData.experienceSection.points,
    },
    featuredImage: imageId ? {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageId,
      },
      altText: aboutData.featuredImage.altText,
    } : undefined,
    seo: aboutData.seo,
  };

  await client.createIfNotExists({ _type: 'about', _id: 'about' });
  await client.patch('about').set(doc).commit();
  console.log('About Data Migrated.');
}

async function migrateContact() {
  console.log('Migrating Contact Data...');
  const doc = {
    _type: 'contact',
    _id: 'contact',
    ...contactData,
  };
  await client.createIfNotExists({ _type: 'contact', _id: 'contact' });
  await client.patch('contact').set(doc).commit();
  console.log('Contact Data Migrated.');
}

async function migrateIndustries() {
  console.log('Migrating Industries...');
  for (const industry of industriesData) {
    console.log(`Migrating Industry: ${industry.title}`);
    const imageUrl = PREMIUM_IMAGES[industry.slug] || industry.featuredImage.sourceUrl;
    const imageId = await uploadImage(imageUrl);
    
    const doc = {
      _type: 'industry',
      _id: `industry-${industry.slug}`,
      title: industry.title,
      slug: { _type: 'slug', current: industry.slug },
      headline: industry.headline,
      featuredImage: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        altText: industry.featuredImage.altText,
      } : undefined,
      content: industry.content,
      features: industry.features.map((f: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...f })),
      process: industry.process.map((p: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...p })),
      seo: industry.seo,
    };
    
    await client.createIfNotExists({ _type: 'industry', _id: doc._id });
    await client.patch(doc._id).set(doc).commit();
  }
  console.log('Industries Migrated.');
}

async function migrateSolutions() {
  console.log('Migrating Solutions...');
  for (const solution of solutionsData) {
    console.log(`Migrating Solution: ${solution.title}`);
    const imageId = await uploadImage(solution.featuredImage.sourceUrl);
    
    const doc = {
      _type: 'solution',
      _id: `solution-${solution.slug}`,
      title: solution.title,
      slug: { _type: 'slug', current: solution.slug },
      headline: solution.headline,
      featuredImage: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        altText: solution.featuredImage.altText,
      } : undefined,
      content: solution.content,
      features: solution.features.map((f: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...f })),
      process: solution.process.map((p: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...p })),
      seo: solution.seo,
    };
    
    await client.createIfNotExists({ _type: 'solution', _id: doc._id });
    await client.patch(doc._id).set(doc).commit();
  }
  console.log('Solutions Migrated.');
}

async function migrateServices() {
  console.log('Migrating Services...');
  for (const service of servicesData) {
    console.log(`Migrating Service: ${service.title}`);
    const imageId = await uploadImage(service.featuredImage.sourceUrl);
    
    const doc = {
      _type: 'service',
      _id: `service-${service.slug}`,
      title: service.title,
      slug: { _type: 'slug', current: service.slug },
      headline: service.headline,
      featuredImage: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        altText: service.featuredImage.altText,
      } : undefined,
      content: service.content,
      features: service.features.map((f: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...f })),
      process: service.process.map((p: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...p })),
      seo: service.seo,
    };
    
    await client.createIfNotExists({ _type: 'service', _id: doc._id });
    await client.patch(doc._id).set(doc).commit();
  }
  console.log('Services Migrated.');
}

async function migrateServicesPage() {
  console.log('Migrating Services Page Data...');
  const doc = {
    _type: 'servicesPage',
    _id: 'servicesPage',
    title: servicesPageMockData.title,
    subtitle: servicesPageMockData.subtitle,
    heroSubheadline: servicesPageMockData.heroSubheadline,
    methodology: servicesPageMockData.methodology.map(m => ({ _key: Math.random().toString(36).substr(2, 9), ...m })),
    outcomes: servicesPageMockData.outcomes.map(o => ({ _key: Math.random().toString(36).substr(2, 9), ...o })),
    coreServices: servicesPageMockData.coreServices.map(s => ({ 
      _key: Math.random().toString(36).substr(2, 9), 
      _type: 'reference',
      _ref: `service-${s.slug}` 
    })),
    seo: servicesPageMockData.seo,
  };
  await client.createIfNotExists({ _type: 'servicesPage', _id: 'servicesPage' });
  await client.patch('servicesPage').set(doc).commit();
  console.log('Services Page Data Migrated.');
}

async function migrateIndustriesPage() {
  console.log('Migrating Industries Page Data...');
  const doc = {
    _type: 'industriesPage',
    _id: 'industriesPage',
    title: industriesPageMockData.title,
    subtitle: industriesPageMockData.subtitle,
    heroSubheadline: industriesPageMockData.heroSubheadline,
    methodology: industriesPageMockData.methodology.map(m => ({ _key: Math.random().toString(36).substr(2, 9), ...m })),
    outcomes: industriesPageMockData.outcomes.map(o => ({ _key: Math.random().toString(36).substr(2, 9), ...o })),
    coreIndustries: industriesPageMockData.coreIndustries.map(i => ({ 
      _key: Math.random().toString(36).substr(2, 9), 
      _type: 'reference',
      _ref: `industry-${i.slug}` 
    })),
    seo: industriesPageMockData.seo,
  };
  await client.createIfNotExists({ _type: 'industriesPage', _id: 'industriesPage' });
  await client.patch('industriesPage').set(doc).commit();
  console.log('Industries Page Data Migrated.');
}

async function runMigration() {
  try {
    await migrateHome();
    await migrateAbout();
    await migrateContact();
    await migrateIndustries();
    await migrateSolutions();
    await migrateServices();
    await migrateServicesPage();
    await migrateIndustriesPage();
    console.log('ALL MIGRATIONS COMPLETED SUCCESSFULLY!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();
