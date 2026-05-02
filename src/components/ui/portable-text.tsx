import React from 'react';

/**
 * Basic Portable Text-like structure interfaces.
 */
export interface PortableTextSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: 'block';
  _key?: string;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
  children: PortableTextSpan[];
}

interface PortableTextProps {
  value: PortableTextBlock[] | string;
  className?: string;
}

/**
 * A lightweight renderer for Portable Text-like structures.
 * Falls back to string rendering if value is a string (for backward compatibility during migration).
 */
export const PortableText: React.FC<PortableTextProps> = ({ value, className }) => {
  if (typeof value === 'string') {
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  if (!Array.isArray(value)) return null;

  return (
    <div className={className}>
      {value.map((block, index) => {
        if (block._type !== 'block') return null;

        const { style = 'normal', children } = block;
        const key = block._key || `block-${index}`;

        const content = children.map((span, sIndex) => {
          let element = <React.Fragment key={`${key}-${sIndex}`}>{span.text}</React.Fragment>;
          
          if (span.marks?.includes('strong')) {
            element = <strong key={`${key}-${sIndex}`}>{element}</strong>;
          }
          if (span.marks?.includes('em')) {
            element = <em key={`${key}-${sIndex}`}>{element}</em>;
          }
          
          return element;
        });

        switch (style) {
          case 'h1':
            return <h1 key={key} className="text-4xl font-bold mb-4">{content}</h1>;
          case 'h2':
            return <h2 key={key} className="text-3xl font-bold mb-4">{content}</h2>;
          case 'h3':
            return <h3 key={key} className="text-2xl font-bold mb-3">{content}</h3>;
          case 'blockquote':
            return <blockquote key={key} className="border-l-4 border-prixgen-blue pl-4 italic my-4">{content}</blockquote>;
          default:
            return <p key={key} className="mb-4 leading-relaxed">{content}</p>;
        }
      })}
    </div>
  );
};
