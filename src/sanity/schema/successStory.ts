import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'successStory',
  title: 'Success Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title of the success story.',
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
      name: 'subtitle',
      title: 'Subheadline',
      type: 'string',
      description: 'A brief subtitle or hook summarizing the narrative.',
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Name of the client company or organisation.',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Logo of the client company.',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'The industry segment (e.g. Food & Beverage, PVC Manufacturing).',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and screen readers.',
        },
        {
          name: 'fitMode',
          type: 'string',
          title: 'Image Framing & Cropping Mode',
          description: 'Control how this image is rendered on the website. Use "Full Uncropped" to keep 100% of wide group/team photos.',
          options: {
            list: [
              { title: 'Full Uncropped & High Quality (Preserves entire image, zero crop - recommended for team/client photos)', value: 'contain' },
              { title: 'Natural Dynamic Aspect Ratio (Scales smoothly to full width)', value: 'natural' },
              { title: 'Cover Banner (Fills frame box, applies hotspot)', value: 'cover' },
            ],
            layout: 'radio',
          },
          initialValue: 'contain',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Image Caption (Optional)',
          description: 'Displayed beneath the image on the case study page.',
        }
      ],
      description: 'High-resolution cover image for the success story. Hotspot and framing options preserve full image quality without cropping.',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics / Results',
      type: 'array',
      description: 'Key numerical stats or outcomes (e.g. "-9 pts Food cost gap eliminated").',
      of: [
        {
          type: 'object',
          name: 'metricItem',
          title: 'Metric Item',
          fields: [
            { name: 'value', title: 'Stat Value', type: 'string', description: 'e.g. -9 pts, 2 hrs, 100%' },
            { name: 'label', title: 'Stat Label', type: 'string', description: 'e.g. Food cost gap eliminated, Month-end close' }
          ]
        }
      ]
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'array',
      description: 'Rich text describing the problem space or challenge faced by the client.',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Engineered Solutions / Features',
      type: 'array',
      description: 'Specific Odoo modules or engineering fixes implemented.',
      of: [
        {
          type: 'object',
          name: 'featureItem',
          title: 'Feature Item',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string', description: 'e.g. Multiple KOTs' },
            { name: 'description', title: 'Feature Description', type: 'text', description: 'What this module/feature did' }
          ]
        }
      ]
    }),
    defineField({
      name: 'body',
      title: 'Body Narrative',
      type: 'array',
      description: 'Detailed narrative of the project lifecycle and implementation.',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
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

  preview: {
    select: {
      title: 'title',
      client: 'clientName',
      media: 'clientLogo',
    },
    prepare(selection) {
      const { client } = selection;
      return { ...selection, subtitle: client ? `Client: ${client}` : 'Success Story' };
    },
  },
});
