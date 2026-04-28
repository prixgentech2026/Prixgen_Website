import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint for WordPress content.
 */
export async function POST(request: Request) {
  const secret = request.headers.get('x-reval-secret');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    revalidateTag('wordpress');
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
