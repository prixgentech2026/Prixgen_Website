import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// This would be triggered by a Vercel Cron job
// https://vercel.com/docs/cron-jobs

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-05-01',
});

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:'; // Need Org ID

export async function GET(request: Request) {
  // 1. Verify Authorization (Cron Secret)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 1. Fetch credentials from Sanity
    const settings = await sanityClient.fetch(`*[_type == "linkedinSettings"][0]`);
    
    if (!settings?.accessToken || !settings?.orgId) {
      throw new Error('LinkedIn credentials not found in Sanity. Please configure in Admin Dashboard.');
    }

    const accessToken = settings.accessToken;
    const orgId = settings.orgId;

    // 2. Fetch posts from LinkedIn
    // Note: V2 Shares API or Posts API
    const response = await fetch(`${LINKEDIN_API_URL}${orgId}&count=10&sortBy=CREATED`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`LinkedIn API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const linkedinPosts = data.elements || [];

    const results = {
      processed: 0,
      created: 0,
      skipped: 0,
      errors: [] as string[]
    };

    // 3. Process each post
    for (const liPost of linkedinPosts) {
      results.processed++;
      const liId = liPost.id;
      const text = liPost.text?.text || liPost.commentary || '';
      
      // Check if already exists
      const existing = await sanityClient.fetch(
        `*[_type == "post" && linkedinId == $liId][0]`,
        { liId }
      );

      if (existing) {
        results.skipped++;
        continue;
      }

      // 4. Create Sanity Document
      // Minimal implementation - can be expanded with AI to generate better titles/slugs
      const title = text.split('\n')[0].substring(0, 80) || 'LinkedIn Update';
      const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      try {
        await sanityClient.create({
          _type: 'post',
          title: title,
          slug: { _type: 'slug', current: `${slug}-${liId.substring(0, 8)}` },
          publishedAt: new Date(liPost.created?.time || Date.now()).toISOString(),
          excerpt: text.substring(0, 160),
          linkedinId: liId,
          body: [
            {
              _type: 'block',
              children: [{ _type: 'span', text: text }],
              markDefs: [],
              style: 'normal'
            }
          ]
        });
        results.created++;
      } catch (err: any) {
        results.errors.push(`Post ${liId}: ${err.message}`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('LinkedIn Sync Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
