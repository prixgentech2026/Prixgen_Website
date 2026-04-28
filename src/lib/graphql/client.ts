/**
 * Helper to fetch data from WPGraphQL.
 */
export async function wpFetch<T>(query: string, variables = {}) {
  const url = process.env.WP_GRAPHQL_URL;

  // Handle missing URL gracefully for initial development
  if (!url || url.includes('YOUR_')) {
    console.warn('WP_GRAPHQL_URL is missing. Returning null for development.');
    return null as T;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { tags: ['wordpress'], revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`Failed to fetch from CMS: ${res.statusText}`);
      return null as T;
    }

    const json = await res.json();
    
    if (json.errors) {
      console.error('WPGraphQL Errors:', json.errors);
      return null as T;
    }

    return json.data as T;
  } catch (error) {
    console.error('Fetch Error:', error);
    return null as T;
  }
}
