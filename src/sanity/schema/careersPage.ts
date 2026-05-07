export default {
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'text',
    },
    {
      name: 'badge',
      title: 'Hero Badge',
      type: 'string',
    },
    {
      name: 'openings',
      title: 'Current Openings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Job Title', type: 'string' },
            { name: 'team', title: 'Team', type: 'string' },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'type', title: 'Job Type', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'title', title: 'Meta Title', type: 'string' },
        { name: 'metaDesc', title: 'Meta Description', type: 'text' },
      ],
    },
  ],
};
