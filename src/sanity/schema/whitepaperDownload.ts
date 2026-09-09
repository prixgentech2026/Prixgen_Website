const whitepaperDownload = {
  name: 'whitepaperDownload',
  title: 'Whitepaper Downloads',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'whitepaperTitle',
      title: 'Whitepaper Title',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'slug',
      title: 'Source Slug / Industry',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Follow-up Needed', value: 'follow_up' },
        ],
      },
      initialValue: 'new',
    },
    {
      name: 'downloadedAt',
      title: 'Downloaded At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      description: 'whitepaperTitle',
    },
    prepare(selection: any) {
      const { title, subtitle, description } = selection;
      return {
        title: title || 'Anonymous Download',
        subtitle: `${subtitle || 'No Company'} • ${description || 'Whitepaper'}`,
      };
    },
  },
};

export default whitepaperDownload;
