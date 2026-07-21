import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { mockSuccessStories } from '../src/lib/data';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity configuration in environment. Run this script via package.json migrate or specify --env-file.');
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

async function migrateSuccessStories() {
  console.log('Starting Success Stories migration...');
  
  for (const story of mockSuccessStories) {
    console.log(`Migrating: "${story.title}"...`);
    
    // 1. Upload main image
    const mainImageId = story.mainImage ? await uploadImage(story.mainImage) : null;
    
    // 2. Upload client logo
    const clientLogoId = story.clientLogo ? await uploadImage(story.clientLogo) : null;
    
    // 3. Construct Document
    const doc = {
      _type: 'successStory',
      _id: `success-story-${story.slug}`,
      title: story.title,
      slug: { _type: 'slug', current: story.slug },
      subtitle: story.subtitle,
      clientName: story.clientName,
      clientLogo: clientLogoId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: clientLogoId
        }
      } : undefined,
      industry: story.industry,
      mainImage: mainImageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImageId
        }
      } : undefined,
      metrics: story.metrics?.map(metric => ({
        _key: Math.random().toString(36).substr(2, 9),
        value: metric.value,
        label: metric.label
      })),
      challenge: addKeysToBlocks(story.challenge),
      features: story.features?.map(feature => ({
        _key: Math.random().toString(36).substr(2, 9),
        title: feature.title,
        description: feature.description
      })),
      body: addKeysToBlocks(story.body),
      publishedAt: story.publishedAt,
      seo: story.seo,
    };
    
    // 4. Upsert doc to Sanity
    await client.createIfNotExists({ _type: 'successStory', _id: doc._id });
    await client.patch(doc._id).set(doc).commit();
    console.log(`[SUCCESS] Migrated story: "${story.title}" to Sanity Studio.`);
  }
  
  console.log('Success Stories migration completed successfully!');
}

migrateSuccessStories().catch(err => {
  console.error('Migration crashed:', err);
  process.exit(1);
});
