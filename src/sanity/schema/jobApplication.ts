const jobApplication = {
  name: 'jobApplication',
  title: 'Job Applications',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'appliedFor',
      title: 'Applied For (Position)',
      type: 'string',
    },
    {
      name: 'resume',
      title: 'Resume (PDF)',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'appliedFor'
    }
  }
}

export default jobApplication;
