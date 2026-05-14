import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'linkedinSettings',
  title: 'LinkedIn Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'accessToken',
      title: 'Access Token',
      type: 'string',
      description: 'The LinkedIn OAuth2 Access Token (expires every 60 days).',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }),
    defineField({
      name: 'orgId',
      title: 'Organization ID',
      type: 'string',
      description: 'The LinkedIn Organization URN (e.g., 12345678).',
    }),
  ],
});
