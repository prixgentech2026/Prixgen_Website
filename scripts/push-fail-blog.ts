import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity configuration. Please check your .env.local file.');
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
  try {
    console.log(`Uploading main image to Sanity: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = url.split('/').pop()?.split('?')[0] || 'why-erp-projects-fail.jpg';
    
    const asset = await client.assets.upload('image', buffer, { filename });
    console.log(`[SUCCESS] Image uploaded to Sanity: ${asset._id}`);
    return asset._id;
  } catch (error: any) {
    console.error(`[ERROR] Image upload failed:`, error.message || error);
    return null;
  }
}

async function run() {
  try {
    console.log('Verifying Author (Dr. Arvinth P.)...');
    const authorDoc = {
      _type: 'author',
      _id: 'author-arvinth-p',
      name: 'Dr. Arvinth P.',
      slug: { _type: 'slug', current: 'arvinth-p' },
      position: 'Chief Technology Officer',
      bio: [
        {
          _key: 'bio-block',
          _type: 'block',
          children: [
            {
              _key: 'bio-span',
              _type: 'span',
              text: 'Dr. Arvinth is the Chief Technology Officer at Prixgen, specializing in AI-driven industrial automation and enterprise architecture.'
            }
          ],
          style: 'normal'
        }
      ]
    };
    await client.createIfNotExists(authorDoc);
    await client.patch(authorDoc._id).set(authorDoc).commit();
    console.log('[SUCCESS] Author verified/created.');

    console.log('Verifying Categories...');
    const cat1 = {
      _type: 'category',
      _id: 'category-erp-insights',
      title: 'ERP Insights',
      description: 'Deep dives into Enterprise Resource Planning systems and best practices.'
    };
    const cat2 = {
      _type: 'category',
      _id: 'category-digital-transformation',
      title: 'Digital Transformation',
      description: 'Strategies for modernizing legacy industrial workflows.'
    };
    await client.createIfNotExists(cat1);
    await client.patch(cat1._id).set(cat1).commit();
    await client.createIfNotExists(cat2);
    await client.patch(cat2._id).set(cat2).commit();
    console.log('[SUCCESS] Categories verified/created.');

    const imageId = await uploadImage('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200');

    console.log('Creating/Updating the Blog Post Document...');
    const postDoc = {
      _type: 'post',
      _id: 'post-why-erp-projects-fail-myth-it-s-rarely-a-software-problem',
      title: "Why ERP Projects Fail (Myth: It's rarely a software problem)",
      slug: { _type: 'slug', current: 'why-erp-projects-fail-myth-it-s-rarely-a-software-problem' },
      excerpt: "Most organisations over-invest in software selection and underestimate what truly drives success: business processes, change management, and long-term planning.",
      publishedAt: '2025-01-01T00:00:00.000Z',
      author: {
        _type: 'reference',
        _ref: 'author-arvinth-p'
      },
      categories: [
        {
          _key: 'cat-ref-1',
          _type: 'reference',
          _ref: 'category-erp-insights'
        },
        {
          _key: 'cat-ref-2',
          _type: 'reference',
          _ref: 'category-digital-transformation'
        }
      ],
      mainImage: imageId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId
        },
        alt: "Why ERP Projects Fail"
      } : undefined,
      body: [
        {
          _key: 'body-block-1',
          _type: 'block',
          children: [
            {
              _key: 'body-span-1',
              _type: 'span',
              text: 'Custom rendered failure canvas. Edit layout elements inside the React app features folder.'
            }
          ],
          style: 'normal'
        }
      ]
    };

    await client.createIfNotExists({ _type: 'post', _id: postDoc._id });
    await client.patch(postDoc._id).set(postDoc).commit();
    console.log('[SUCCESS] Blog post pushed to Sanity successfully!');
    
  } catch (error) {
    console.error('[ERROR] Push operation failed:', error);
  }
}

run();
