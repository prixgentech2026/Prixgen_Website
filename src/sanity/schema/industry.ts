import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'altText',
          title: 'Alt Text',
          type: 'string',
        })
      ]
    }),
    defineField({
      name: 'externalImageUrl',
      title: 'External Image URL (Fallback)',
      type: 'url',
      description: 'Use this to quickly link an Unsplash image without uploading.'
    }),
    defineField({
      name: 'summaryImage',
      title: 'Summary Image (Executive Section)',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'altText', title: 'Alt Text', type: 'string' })]
    }),
    defineField({
      name: 'whitepaperPdf',
      title: 'Whitepaper PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload or download the strategic whitepaper PDF for this industry.',
    }),
    defineField({
      name: 'whitepaperTitle',
      title: 'Whitepaper Display Title',
      type: 'string',
      description: 'Title shown on the gated download modal.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Description', type: 'text' },
          ]
        }
      ]
    }),
    defineField({
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Step Description', type: 'text' },
          ]
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDesc', title: 'Meta Description', type: 'text' }),
        defineField({ 
          name: 'keywords', 
          title: 'Meta Keywords', 
          type: 'array', 
          of: [{type: 'string'}],
          options: { layout: 'tags' }
        }),
      ]
    }),
  ],
});
