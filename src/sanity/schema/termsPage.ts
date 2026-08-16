const termsPageSchema = {
  name: 'termsPage',
  title: 'Terms of Service Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    },
    {
      name: 'coreTerms',
      title: 'Core Terms',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'content', title: 'Content', type: 'text' },
            { name: 'icon', title: 'Icon (Lucide name)', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'detailedSections',
      title: 'Detailed Legal Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'content', title: 'Section Content', type: 'text' },
            { 
              name: 'keyPoints', 
              title: 'Key Points', 
              type: 'array', 
              of: [{ type: 'string' }] 
            },
          ],
        },
      ],
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
    },
    {
      name: 'referenceId',
      title: 'Reference ID',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'metaDesc', title: 'Meta Description', type: 'text' },
        { 
          name: 'keywords', 
          title: 'Keywords', 
          type: 'array', 
          of: [{ type: 'string' }],
          options: { layout: 'tags' }
        },
      ],
    },
  ],
};

export default termsPageSchema;
