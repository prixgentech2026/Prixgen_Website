'use server';

import { writeClient } from '@/sanity/lib/write-client';

export async function submitJobApplication(formData: FormData) {
  if (!writeClient) {
    return { success: false, message: 'Server configuration error' };
  }

  try {
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const appliedFor = formData.get('appliedFor') as string;
    const resumeFile = formData.get('resume') as File;

    if (!fullName || !email || !resumeFile) {
      return { success: false, message: 'Missing required fields' };
    }

    // 1. Upload the resume file to Sanity Assets
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const asset = await writeClient.assets.upload('file', buffer, {
      filename: resumeFile.name,
      contentType: resumeFile.type,
    });

    // 2. Create the job application document
    const result = await writeClient.create({
      _type: 'jobApplication',
      fullName,
      email,
      appliedFor: appliedFor || 'General Application',
      resume: {
        _type: 'file',
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
      submittedAt: new Date().toISOString(),
    });

    console.log('Job application submitted:', result._id);
    return { success: true, message: 'Application submitted successfully!' };
  } catch (error) {
    console.error('Job application submission error:', error);
    return { success: false, message: 'Failed to submit application. Please try again.' };
  }
}
