import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-04-30';
// We disable CDN to ensure on-demand revalidation always fetches fresh data from Sanity.
// Next.js handles its own fetch cache, so this is the most reliable configuration.
const useCdn = false;

export const client = projectId 
  ? createClient({ projectId, dataset, apiVersion, useCdn }) 
  : null;
