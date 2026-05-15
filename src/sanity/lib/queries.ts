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

// Query for the Solutions Landing Page
export const solutionsPageQuery = groq`*[_type == "solutionsPage"][0]{
  title,
  subtitle,
  heroSubheadline,
  methodology,
  outcomes,
  "coreSolutions": coreSolutions[]->{
    title,
    headline,
    "slug": slug.current,
    externalImageUrl,
    "featuredImage": {
      "sourceUrl": featuredImage.asset->url,
      "altText": featuredImage.altText
    }
  },
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
  mobile,
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
  externalImageUrl,
  "featuredImage": {
    "sourceUrl": featuredImage.asset->url,
    "altText": featuredImage.altText
  },
  "summaryImage": {
    "sourceUrl": summaryImage.asset->url,
    "altText": summaryImage.altText
  }
}`;

// Query for a single Industry by slug
export const industryBySlugQuery = groq`*[_type == "industry" && slug.current == $slug][0]{
  title,
  headline,
  content,
  features,
  process,
  seo,
  externalImageUrl,
  "featuredImage": {
    "sourceUrl": featuredImage.asset->url,
    "altText": featuredImage.altText
  },
  "summaryImage": {
    "sourceUrl": summaryImage.asset->url,
    "altText": summaryImage.altText
  }
}`;

// Query for all Solutions
export const solutionsQuery = groq`*[_type == "solution"]{
  "slug": slug.current,
  title,
  headline,
  seo,
  externalImageUrl,
  "featuredImage": {
    "sourceUrl": featuredImage.asset->url,
    "altText": featuredImage.altText
  }
}`;

// Query for a single Solution by slug
export const solutionBySlugQuery = groq`*[_type == "solution" && slug.current == $slug][0]{
  title,
  headline,
  content,
  features,
  process,
  seo,
  externalImageUrl,
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
  seo,
  externalImageUrl
}`;

// Query for a single Service by slug
export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  title,
  headline,
  "slug": slug.current,
  content,
  features,
  process,
  seo,
  externalImageUrl,
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
    "slug": slug.current,
    externalImageUrl
  },
  seo
}`;


// Query for the Industries Landing Page
export const industriesPageQuery = groq`*[_type == "industriesPage"][0]{
  title,
  subtitle,
  heroSubheadline,
  methodology,
  outcomes,
  "coreIndustries": coreIndustries[]->{
    title,
    headline,
    "slug": slug.current,
    "featuredImage": featuredImage.asset->url,
    externalImageUrl
  },
  seo
}`;

// Query for the Engineering Services Landing Page
export const engineeringServicesPageQuery = groq`*[_type == "engineeringServicesPage"][0]{
  title,
  subtitle,
  heroSubheadline,
  methodology,
  outcomes,
  "coreServices": coreServices[]->{
    title,
    headline,
    "slug": slug.current,
    externalImageUrl
  },
  seo
}`;

// Query for Privacy Policy Page
export const privacyQuery = groq`*[_type == "privacyPage"][0]{
  title,
  subtitle,
  heroDescription,
  principles,
  detailedSections,
  lastUpdated,
  documentId,
  seo
}`;

// Query for Terms of Service Page
export const termsQuery = groq`*[_type == "termsPage"][0]{
  title,
  subtitle,
  heroDescription,
  coreTerms,
  detailedSections,
  lastUpdated,
  referenceId,
  seo
}`;

export const careersQuery = groq`*[_type == "careersPage"][0]{
  title,
  subtitle,
  badge,
  openings,
  seo
}`;

// Query for all Blog Posts
export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "mainImage": mainImage.asset->url,
  "author": author->{
    name,
    "image": image.asset->url,
    position
  },
  "categories": categories[]->{
    title
  },
  linkedinUrl
}`;

// Query for a single Blog Post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body,
  "mainImage": mainImage.asset->url,
  "author": author->{
    name,
    "image": image.asset->url,
    position,
    bio
  },
  "categories": categories[]->{
    title
  },
  linkedinUrl,
  seo
}`;

