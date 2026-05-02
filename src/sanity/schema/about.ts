import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Main Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'vision',
      title: 'Our Vision',
      type: 'text',
    }),
    defineField({
      name: 'mission',
      title: 'Our Mission',
      type: 'text',
    }),
    defineField({
      name: 'stats',
      title: 'Company Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'suffix', title: 'Suffix', type: 'string' },
          ]
        }
      ]
    }),
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon (Lucide name or URL)', type: 'string' },
          ]
        }
      ]
    }),
    defineField({
      name: 'whyChooseUsIntro',
      title: 'Why Choose Us Introduction',
      type: 'text',
    }),
    defineField({
      name: 'experienceSection',
      title: 'Experience Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'points', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] },
      ]
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
