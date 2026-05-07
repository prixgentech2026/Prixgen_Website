import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-04-30';
const token = process.env.SANITY_API_TOKEN;

/**
 * Sanity client with write permissions.
 * ONLY for server-side use.
 */
export const writeClient = (projectId && token)
  ? createClient({ 
      projectId, 
      dataset, 
      apiVersion, 
      useCdn: false,
      token 
    }) 
  : null;
