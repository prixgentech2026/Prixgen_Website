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
      title: 'India Desk Phone',
      type: 'string',
    }),
    defineField({
      name: 'salesPhone',
      title: 'India Sales Phone',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Digital Presence URL',
      type: 'string',
    }),
    defineField({
      name: 'australiaAddress',
      title: 'Australia Address',
      type: 'text',
    }),
    defineField({
      name: 'australiaPhone',
      title: 'Australia Desk Phone',
      type: 'string',
    }),
    defineField({
      name: 'australiaEmail',
      title: 'Australia Email',
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
