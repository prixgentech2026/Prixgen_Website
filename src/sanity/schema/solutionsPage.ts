import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'solutionsPage',
  title: 'Solutions Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main headline for the solutions page (e.g., Strategic ERP & AI Architectures)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string',
      description: 'The smaller label above the main headline (e.g., Architecture Suite)',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      description: 'The descriptive text below the main headline.',
    }),
    
    // Methodology Section
    defineField({
      name: 'methodology',
      title: 'Methodology Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', title: 'Step Number', type: 'string', placeholder: '01' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { 
            name: 'icon', 
            title: 'Icon Name', 
            type: 'string', 
            description: 'Lucide icon name (e.g., Search, PenTool, Code)' 
          }
        ]
      }]
    }),

    // Outcomes Section
    defineField({
      name: 'outcomes',
      title: 'Enterprise Outcomes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { 
            name: 'icon', 
            title: 'Icon Name', 
            type: 'string', 
            description: 'Lucide icon name (e.g., Activity, Users, LineChart)' 
          }
        ]
      }]
    }),

    // Core Solutions Section (References)
    defineField({
      name: 'coreSolutions',
      title: 'Core Solutions',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'solution' }]
      }]
    }),

    // SEO
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
