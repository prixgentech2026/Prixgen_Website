import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroPrimaryCTA',
      title: 'Primary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'heroSecondaryCTA',
      title: 'Secondary CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'socialProof',
      title: 'Social Proof Text',
      type: 'text',
    }),
    defineField({
      name: 'clients',
      title: 'Client List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [{ name: 'name', title: 'Company Name', type: 'string' }]
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Success Stories (Testimonials)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Quote', type: 'text' },
            { name: 'author', title: 'Author', type: 'string' },
            { name: 'title', title: 'Author Title', type: 'string' },
          ]
        }
      ]
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Bottom CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Bottom CTA Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Bottom CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDesc', title: 'Meta Description', type: 'text' }),
        defineField({ name: 'keywords', title: 'Meta Keywords', type: 'string', description: 'Comma-separated keywords (e.g. ERP, manufacturing, consulting)' }),
      ]
    }),
  ],
});
