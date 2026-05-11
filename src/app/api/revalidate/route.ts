import { revalidateTag, revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint for Sanity content.
 */
export async function POST(request: Request) {
  const secret = request.headers.get('x-reval-secret');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { tag, path } = await request.json().catch(() => ({}));

  try {
    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    } else if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    } else {
      // Default fallback: revalidate the global sanity tag
      revalidateTag('sanity');
      console.log('Revalidated global sanity tag');
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: 'Revalidation triggered successfully'
    });
  } catch (err) {
    return NextResponse.json({ 
      revalidated: false, 
      message: 'Error revalidating' 
    }, { status: 500 });
  }
}
