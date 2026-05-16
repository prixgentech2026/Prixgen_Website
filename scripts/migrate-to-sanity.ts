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
  industriesPageMockData,
  engineeringServicesPageMockData,
  solutionsPageMockData,
  privacyData,
  termsData,
  careersData,
  blogAuthors,
  blogCategories,
  blogPosts
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

async function uploadImage(url: string, retries = 3) {
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000';
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Uploading image (Attempt ${attempt}/${retries}): ${url}`);
      let buffer: Buffer;
      let filename: string;

      if (url.startsWith('file://') || url.startsWith('C:') || url.startsWith('/') || fs.existsSync(url)) {
        const filePath = url.startsWith('file://') ? url.replace('file:///', '').replace('file://', '') : url;
        
        if (fs.existsSync(filePath)) {
          buffer = fs.readFileSync(filePath);
          filename = path.basename(filePath);
        } else {
          console.warn(`[WARN] Local file ${filePath} not found. Using fallback image.`);
          const response = await fetch(FALLBACK_IMAGE);
          if (!response.ok) throw new Error(`Failed to fetch fallback image`);
          const arrayBuffer = await response.arrayBuffer();
          buffer = Buffer.from(arrayBuffer);
          filename = 'fallback.jpg';
        }
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
    } catch (error: any) {
      const isTransient = error.statusCode === 502 || error.statusCode === 503 || error.statusCode === 504 || error.statusCode === 429;
      
      if (isTransient && attempt < retries) {
        const delay = attempt * 2000;
        console.warn(`[RETRY] Sanity API error (${error.statusCode}). Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      console.error(`[ERROR] Failed to upload ${url} after ${attempt} attempts:`, error.message || error);
      return null;
    }
  }
  return null;
}

function addKeysToBlocks(blocks: any) {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((block: any) => {
    const newBlock = { ...block, _key: Math.random().toString(36).substr(2, 9) };
    if (newBlock.children && Array.isArray(newBlock.children)) {
      newBlock.children = newBlock.children.map((child: any) => ({
        ...child,
        _key: Math.random().toString(36).substr(2, 9)
      }));
    }
    return newBlock;
  });
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
    subheadline: addKeysToBlocks(homeData.subheadline),
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
    content: addKeysToBlocks(aboutData.content),
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
    const imageUrl = industry.featuredImage?.sourceUrl || industry.externalImageUrl;
    const imageId = imageUrl ? await uploadImage(imageUrl) : null;
    
    const summaryImageUrl = industry.summaryImage?.sourceUrl;
    const summaryImageId = summaryImageUrl ? await uploadImage(summaryImageUrl) : null;
    
    const doc = {
      _type: 'industry',
      _id: `industry-${industry.slug}`,
      title: industry.title,
      slug: { _type: 'slug', current: industry.slug },
      headline: industry.headline,
      externalImageUrl: industry.externalImageUrl,
      featuredImage: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        altText: industry.featuredImage?.altText || industry.title,
      } : undefined,
      summaryImage: summaryImageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: summaryImageId,
        },
        altText: industry.summaryImage?.altText || industry.title,
      } : undefined,
      content: addKeysToBlocks(industry.content),
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
    const imageUrl = solution.externalImageUrl || (solution.featuredImage ? solution.featuredImage.sourceUrl : null);
    const imageId = imageUrl ? await uploadImage(imageUrl) : null;

    const summaryImageUrl = solution.summaryImage?.sourceUrl;
    const summaryImageId = summaryImageUrl ? await uploadImage(summaryImageUrl) : null;
    
    const doc = {
      _type: 'solution',
      _id: `solution-${solution.slug}`,
      title: solution.title,
      slug: { _type: 'slug', current: solution.slug },
      headline: solution.headline,
      externalImageUrl: solution.externalImageUrl,
      featuredImage: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        altText: solution.featuredImage?.altText || solution.title,
      } : undefined,
      summaryImage: summaryImageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: summaryImageId,
        },
        altText: solution.summaryImage?.altText || solution.title,
      } : undefined,
      content: addKeysToBlocks(solution.content),
      features: solution.features ? solution.features.map((f: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...f })) : [],
      process: solution.process ? solution.process.map((p: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...p })) : [],
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
    const imageUrl = service.externalImageUrl || (service.featuredImage ? service.featuredImage.sourceUrl : null);
    const imageId = imageUrl ? await uploadImage(imageUrl) : null;
    
    const summaryImageUrl = service.summaryImage?.sourceUrl;
    const summaryImageId = summaryImageUrl ? await uploadImage(summaryImageUrl) : null;

    const doc = {
      _type: 'service',
      _id: `service-${service.slug}`,
      title: service.title,
      slug: { _type: 'slug', current: service.slug },
      headline: service.headline,
      externalImageUrl: service.externalImageUrl,
      featuredImage: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId,
        },
        altText: service.featuredImage?.altText || service.title,
      } : undefined,
      summaryImage: summaryImageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: summaryImageId,
        },
        altText: service.summaryImage?.altText || service.title,
      } : undefined,
      content: addKeysToBlocks(service.content),
      features: service.features ? service.features.map((f: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...f })) : [],
      process: service.process ? service.process.map((p: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...p })) : [],
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

async function migrateEngineeringServicesPage() {
  console.log('Migrating Engineering Services Page Data...');
  const doc = {
    _type: 'engineeringServicesPage',
    _id: 'engineeringServicesPage',
    title: engineeringServicesPageMockData.title,
    subtitle: engineeringServicesPageMockData.subtitle,
    heroSubheadline: engineeringServicesPageMockData.heroSubheadline,
    methodology: engineeringServicesPageMockData.methodology.map(m => ({ _key: Math.random().toString(36).substr(2, 9), ...m })),
    outcomes: engineeringServicesPageMockData.outcomes.map(o => ({ _key: Math.random().toString(36).substr(2, 9), ...o })),
    coreServices: engineeringServicesPageMockData.coreServices.map(s => ({ 
      _key: Math.random().toString(36).substr(2, 9), 
      _type: 'reference',
      _ref: `service-${s.slug}` 
    })),
    seo: engineeringServicesPageMockData.seo,
  };
  await client.createIfNotExists({ _type: 'engineeringServicesPage', _id: 'engineeringServicesPage' });
  await client.patch('engineeringServicesPage').set(doc).commit();
  console.log('Engineering Services Page Data Migrated.');
}

async function migrateSolutionsPage() {
  console.log('Migrating Solutions Page Data...');
  const doc = {
    _type: 'solutionsPage',
    _id: 'solutionsPage',
    title: solutionsPageMockData.title,
    subtitle: solutionsPageMockData.subtitle,
    heroSubheadline: solutionsPageMockData.heroSubheadline,
    methodology: solutionsPageMockData.methodology.map(m => ({ _key: Math.random().toString(36).substr(2, 9), ...m })),
    outcomes: solutionsPageMockData.outcomes.map(o => ({ _key: Math.random().toString(36).substr(2, 9), ...o })),
    coreSolutions: solutionsPageMockData.coreSolutions.map(s => {
      // Determine if this slug belongs to a solution or a service
      const engineeringSlugs = ["iiot-telemetry"];
      const serviceSlugs = ["ai-machine-learning"];
      let prefix = "solution";
      if (engineeringSlugs.includes(s.slug) || serviceSlugs.includes(s.slug)) {
        prefix = "service";
      }

      return { 
        _key: Math.random().toString(36).substr(2, 9), 
        _type: 'reference',
        _ref: `${prefix}-${s.slug}` 
      };
    }),
    seo: solutionsPageMockData.seo,
  };
  await client.createIfNotExists({ _type: 'solutionsPage', _id: 'solutionsPage' });
  await client.patch('solutionsPage').set(doc).commit();
  console.log('Solutions Page Data Migrated.');
}

async function migratePrivacyPage() {
  console.log('Migrating Privacy Page Data...');
  const doc = {
    _type: 'privacyPage',
    _id: 'privacyPage',
    ...privacyData,
    principles: privacyData.principles.map((p: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...p })),
    detailedSections: privacyData.detailedSections.map((s: any) => ({ 
      _key: Math.random().toString(36).substr(2, 9), 
      ...s,
      keyPoints: s.keyPoints || []
    })),
  };
  await client.createIfNotExists({ _type: 'privacyPage', _id: 'privacyPage' });
  await client.patch('privacyPage').set(doc).commit();
  console.log('Privacy Page Data Migrated.');
}

async function migrateTermsPage() {
  console.log('Migrating Terms Page Data...');
  const doc = {
    _type: 'termsPage',
    _id: 'termsPage',
    ...termsData,
    coreTerms: termsData.coreTerms.map((t: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...t })),
    detailedSections: termsData.detailedSections.map((s: any) => ({ 
      _key: Math.random().toString(36).substr(2, 9), 
      ...s,
      keyPoints: s.keyPoints || []
    })),
  };
  await client.createIfNotExists({ _type: 'termsPage', _id: 'termsPage' });
  await client.patch('termsPage').set(doc).commit();
  console.log('Terms Page Data Migrated.');
}

async function migrateCareersPage() {
  console.log('Migrating Careers Page Data...');
  const doc = {
    _type: 'careersPage',
    _id: 'careersPage',
    ...careersData,
    openings: careersData.openings.map((o: any) => ({ _key: Math.random().toString(36).substr(2, 9), ...o })),
  };
  await client.createIfNotExists({ _type: 'careersPage', _id: 'careersPage' });
  await client.patch('careersPage').set(doc).commit();
  console.log('Careers Page Data Migrated.');
}

async function migrateBlogCategories() {
  console.log('Migrating Blog Categories...');
  for (const category of blogCategories) {
    const doc = {
      _type: 'category',
      _id: `category-${category.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: category.title,
      description: category.description,
    };
    await client.createIfNotExists(doc);
    await client.patch(doc._id).set(doc).commit();
  }
  console.log('Blog Categories Migrated.');
}

async function migrateBlogAuthors() {
  console.log('Migrating Blog Authors...');
  for (const author of blogAuthors) {
    const imageId = author.image ? await uploadImage(author.image) : null;
    const doc = {
      _type: 'author',
      _id: `author-${author.slug}`,
      name: author.name,
      slug: { _type: 'slug', current: author.slug },
      image: imageId ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageId }
      } : undefined,
      position: author.position,
      bio: author.bio,
    };
    await client.createIfNotExists({ _type: 'author', _id: doc._id });
    await client.patch(doc._id).set(doc).commit();
  }
  console.log('Blog Authors Migrated.');
}

async function migrateBlogPosts() {
  console.log('Migrating Blog Posts...');
  for (const post of blogPosts) {
    const imageId = post.mainImage ? await uploadImage(post.mainImage) : null;
    const doc = {
      _type: 'post',
      _id: `post-${post.slug}`,
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: post.author ? {
        _type: 'reference',
        _ref: `author-${post.author.slug}`
      } : undefined,
      categories: post.categories?.map(cat => ({
        _key: Math.random().toString(36).substr(2, 9),
        _type: 'reference',
        _ref: `category-${cat.title.toLowerCase().replace(/\s+/g, '-')}`
      })),
      mainImage: imageId ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageId }
      } : undefined,
      body: addKeysToBlocks(post.body),
      linkedinUrl: post.linkedinUrl,
      seo: post.seo,
    };
    await client.createIfNotExists({ _type: 'post', _id: doc._id });
    await client.patch(doc._id).set(doc).commit();
  }
  console.log('Blog Posts Migrated.');
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
    await migrateEngineeringServicesPage();
    await migrateSolutionsPage();
    await migratePrivacyPage();
    await migrateTermsPage();
    await migrateCareersPage();
    await migrateBlogCategories();
    await migrateBlogAuthors();
    await migrateBlogPosts();
    console.log('ALL MIGRATIONS COMPLETED SUCCESSFULLY!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();
