import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SANITY_PDF_URL = 'https://cdn.sanity.io/files/yyxkchao/production/5a30dbd630c0927a2cab4d687a2e0ab908e148e1.pdf?dl=Prixgen_PVC_Manufacturing_Operating_Model.pdf';

export async function GET() {
  try {
    // 1. Check local file on disk
    const possiblePaths = [
      path.join(process.cwd(), 'Reports', 'PVC_whitepaper.pdf'),
      path.join(process.cwd(), 'public', 'downloads', 'PVC_whitepaper.pdf'),
    ];

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Prixgen_PVC_Manufacturing_Operating_Model.pdf"',
            'Content-Length': fileBuffer.length.toString(),
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    }

    // 2. Fallback to Cloud CDN direct download
    return NextResponse.redirect(SANITY_PDF_URL);
  } catch (error) {
    console.error('Download error, redirecting to CDN:', error);
    return NextResponse.redirect(SANITY_PDF_URL);
  }
}
