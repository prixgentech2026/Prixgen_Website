/**
 * Component to inject JSON-LD schema into the page.
 */
export function JsonLd({ type, data }: { type: string; data: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
