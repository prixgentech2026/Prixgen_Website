import { groq } from 'next-sanity';

// Query for the Homepage
export const homeQuery = groq`*[_type == "home"][0]{
  title,
  "heroImage": {
    "url": heroImage.url,
    "asset": heroImage.asset->url
  },
  subheadline,
  heroPrimaryCTA,
  heroSecondaryCTA,
  socialProof,
  clients,
  testimonials,
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  seo
}`;

// Query for the About Us Page
export const aboutQuery = groq`*[_type == "about"][0]{
  title,
  subtitle,
  content,
  vision,
  mission,
  stats,
  whyChooseUs,
  whyChooseUsIntro,
  experienceSection,
  seo,
  "featuredImage": featuredImage.asset->{
    "sourceUrl": url,
    "altText": altText
  }
}`;

// Query for the Contact Page
export const contactQuery = groq`*[_type == "contact"][0]{
  title,
  description,
  address,
  email,
  phone,
  salesPhone,
  website,
  australiaAddress,
  australiaPhone,
  australiaEmail,
  seo
}`;

// Query for all Industry items (for list pages or sitemaps)
export const industriesQuery = groq`*[_type == "industry"]{
  slug,
  title,
  headline,
  seo,
  "featuredImage": featuredImage.asset->{
    "sourceUrl": url,
    "altText": altText
  }
}`;

// Query for a single Industry by slug
export const industryBySlugQuery = groq`*[_type == "industry" && slug.current == $slug][0]{
  title,
  headline,
  content,
  seo,
  "featuredImage": featuredImage.asset->{
    "sourceUrl": url,
    "altText": altText
  }
}`;

// Query for all Solutions
export const solutionsQuery = groq`*[_type == "solution"]{
  slug,
  title,
  headline,
  seo
}`;

// Query for a single Solution by slug
export const solutionBySlugQuery = groq`*[_type == "solution" && slug.current == $slug][0]{
  title,
  headline,
  content,
  features,
  process,
  seo,
  "featuredImage": {
    "sourceUrl": featuredImage.asset->url,
    "altText": featuredImage.altText
  },
  "summaryImage": {
    "sourceUrl": summaryImage.asset->url,
    "altText": summaryImage.altText
  }
}`;

// Query for all Services
export const servicesQuery = groq`*[_type == "service"]{
  slug,
  title,
  headline,
  seo
}`;

// Query for a single Service by slug
export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  title,
  headline,
  content,
  features,
  process,
  seo,
  "featuredImage": {
    "sourceUrl": featuredImage.asset->url,
    "altText": featuredImage.altText
  },
  "summaryImage": {
    "sourceUrl": summaryImage.asset->url,
    "altText": summaryImage.altText
  }
}`;

// Query for the Services Landing Page
export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  title,
  subtitle,
  heroSubheadline,
  methodology,
  outcomes,
  "coreServices": coreServices[]->{
    title,
    headline,
    "slug": slug.current
  },
  seo
}`;
