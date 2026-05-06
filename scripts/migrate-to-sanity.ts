import { createClient } from '@sanity/client';
import { 
  homeData, 
  aboutData, 
  contactData, 
  industriesData, 
  solutionsData, 
  servicesData,
  servicesPageMockData 
} from '../src/lib/data';

// Configuration from .env.local
const projectId = 'n8icbhxu';
const dataset = 'production';
const token = 'skX7V2yaZU3wi5Hq9FmPeXK4KpdBlSdUsGa81fj8FmhZMG6vpCNErX5ZBPCZOHrwPTzx2bvzYfqFDCTDQT848oDfkfkKqlBIh34U6ui4WylhPRlYR7gGWveQtb0Agtw5DCCLpSW6ulDFZ0CyKSjjOMPOABW5szjaQ2gHUTG5rKbZl3S8FwMX';

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-01',
});

async function uploadImage(url: string) {
  console.log(`Uploading image: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const asset = await client.assets.upload('image', buffer, {
      filename: url.split('/').pop() || 'image.jpg',
    });
    return asset._id;
  } catch (error) {
    console.error(`Error uploading image ${url}:`, error);
    return null;
  }
}

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

  await client.createOrReplace(doc);
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

  await client.createOrReplace(doc);
  console.log('About Data Migrated.');
}

async function migrateContact() {
  console.log('Migrating Contact Data...');
  const doc = {
    _type: 'contact',
    _id: 'contact',
    ...contactData,
  };
  await client.createOrReplace(doc);
  console.log('Contact Data Migrated.');
}

async function migrateIndustries() {
  console.log('Migrating Industries...');
  for (const industry of industriesData) {
    console.log(`Migrating Industry: ${industry.title}`);
    const imageId = await uploadImage(industry.featuredImage.sourceUrl);
    
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
    
    await client.createOrReplace(doc);
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
    
    await client.createOrReplace(doc);
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
    
    await client.createOrReplace(doc);
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
    coreServices: servicesPageMockData.coreServices.map(s => ({ _key: Math.random().toString(36).substr(2, 9), ...s })),
    seo: servicesPageMockData.seo,
  };
  await client.createOrReplace(doc);
  console.log('Services Page Data Migrated.');
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
    console.log('ALL MIGRATIONS COMPLETED SUCCESSFULLY!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();
