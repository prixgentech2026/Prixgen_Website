import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint for Sanity content.
 */
export async function POST(request: Request) {
  const secretHeader = request.headers.get('x-reval-secret') || request.headers.get('id-token');
  
  if (secretHeader !== process.env.REVALIDATION_SECRET) {
    console.error('Revalidation failed: Invalid or missing secret token');
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { tag, path } = body;

    console.log('Revalidation request received:', { tag, path, body });

    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    } else if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    } else {
      // Default fallback: revalidate the global sanity tag
      revalidateTag('sanity');
      console.log('Revalidated global sanity tag (fallback)');
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      target: tag || path || 'global-sanity-tag'
    });
  } catch (err: any) {
    console.error('Revalidation error:', err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
