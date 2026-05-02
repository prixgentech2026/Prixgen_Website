import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-04-30';
const useCdn = process.env.NODE_ENV === 'production';

export const client = projectId 
  ? createClient({ projectId, dataset, apiVersion, useCdn }) 
  : null;
