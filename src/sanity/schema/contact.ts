import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contact',
  title: 'Contact Us',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Hero Description',
      type: 'text',
    }),
    defineField({
      name: 'address',
      title: 'Headquarters Address',
      type: 'text',
    }),
    defineField({
      name: 'email',
      title: 'Strategic Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Global Desk Phone',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDesc', title: 'Meta Description', type: 'text' }),
      ]
    }),
  ],
});
