import { client } from '@/sanity/lib/client';

// Bypass Next.js fetch caching in development so Sanity updates show instantly
if (client && process.env.NODE_ENV === 'development') {
  const originalFetch = client.fetch.bind(client);
  client.fetch = ((query: string, params?: any, options?: any) => {
    return originalFetch(query, params, { ...options, cache: 'no-store' });
  }) as any;
}

import {
  homeQuery,
  industryBySlugQuery,
  solutionBySlugQuery,
  serviceBySlugQuery,
  industriesQuery,
  solutionsQuery,
  servicesQuery,
  servicesPageQuery,
  industriesPageQuery,
  engineeringServicesPageQuery,
  solutionsPageQuery,
  aboutQuery,
  contactQuery,
  privacyQuery,
  termsQuery,
  careersQuery,
  postsQuery,
  postBySlugQuery,
  successStoriesQuery,
  successStoryBySlugQuery
} from '@/sanity/lib/queries';

export interface SEOData {
  title: string;
  metaDesc: string;
  keywords?: string[];
}

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

export interface PrivacyPageData {
  title: string;
  subtitle: string;
  heroDescription: string;
  principles: {
    title: string;
    icon: string;
    content: string;
  }[];
  detailedSections: {
    title: string;
    content: string;
    keyPoints?: string[];
  }[];
  lastUpdated: string;
  referenceId: string;
  seo?: SEOData;
}

export interface TermsPageData {
  title: string;
  subtitle: string;
  heroDescription: string;
  coreTerms: {
    title: string;
    icon: string;
    content: string;
  }[];
  detailedSections: {
    title: string;
    content: string;
    keyPoints?: string[];
  }[];
  lastUpdated: string;
  referenceId: string;
  seo?: SEOData;
}

export interface CareersPageData {
  title: string;
  subtitle: string;
  badge: string;
  openings: {
    title: string;
    team: string;
    location: string;
    type: string;
  }[];
  seo?: SEOData;
}

export interface BlogAuthor {
  name: string;
  slug?: string;
  image?: string;
  position?: string;
  bio?: any;
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  mainImage?: string;
  author?: BlogAuthor;
  categories?: { title: string }[];
  body?: any;
  linkedinUrl?: string;
  seo?: SEOData;
}

export interface SuccessStoryMetric {
  value: string;
  label: string;
}

export interface SuccessStoryFeature {
  title: string;
  description: string;
}

export interface SuccessStory {
  title: string;
  slug: string;
  subtitle?: string;
  clientName?: string;
  clientLogo?: string;
  industry?: string;
  mainImage?: string;
  metrics?: SuccessStoryMetric[];
  challenge?: any;
  features?: SuccessStoryFeature[];
  body?: any;
  publishedAt: string;
  seo?: SEOData;
}

/**
 * SANITY FETCHING LAYER
 * These functions fetch data from Sanity if a Project ID is provided.
 * Otherwise, they fallback to the local mock data defined below.
 */

export async function getHomeData() {
  if (!client) return homeData;
  try {
    const data = await client.fetch(homeQuery, {}, { next: { tags: ['sanity'] } });
    return data || homeData;
  } catch (error) {
    console.error('Sanity Fetch Error (Home):', error);
    return homeData;
  }
}

export async function getAboutData() {
  if (!client) return aboutData;
  try {
    const data = await client.fetch(aboutQuery, {}, { next: { tags: ['sanity'] } });
    return data || aboutData;
  } catch (error) {
    console.error('Sanity Fetch Error (About):', error);
    return aboutData;
  }
}

export async function getContactData() {
  if (!client) return contactData;
  try {
    const data = await client.fetch(contactQuery, {}, { next: { tags: ['sanity'] } });
    return data || contactData;
  } catch (error) {
    console.error('Sanity Fetch Error (Contact):', error);
    return contactData;
  }
}

export async function getCareersData() {
  if (!client) return careersData;
  try {
    const data = await client.fetch(careersQuery, {}, { next: { tags: ['sanity'] } });
    return data || careersData;
  } catch (error) {
    console.error('Sanity Fetch Error (Careers):', error);
    return careersData;
  }
}

export async function getPrivacyData() {
  if (!client) return privacyData;
  try {
    const data = await client.fetch(privacyQuery, {}, { next: { tags: ['sanity'] } });
    return data || privacyData;
  } catch (error) {
    console.error('Sanity Fetch Error (Privacy):', error);
    return privacyData;
  }
}

export async function getTermsData() {
  if (!client) return termsData;
  try {
    const data = await client.fetch(termsQuery, {}, { next: { tags: ['sanity'] } });
    return data || termsData;
  } catch (error) {
    console.error('Sanity Fetch Error (Terms):', error);
    return termsData;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  if (!client) return blogPosts;
  try {
    const data = await client.fetch(postsQuery, {}, { next: { tags: ['sanity'] } });
    return data || blogPosts;
  } catch (error) {
    console.error('Sanity Fetch Error (Posts):', error);
    return blogPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) return blogPosts.find(p => p.slug === slug) || null;
  try {
    const data = await client.fetch(postBySlugQuery, { slug }, { next: { tags: ['sanity'] } });
    return data || blogPosts.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error(`Sanity Fetch Error (Post: ${slug}):`, error);
    return blogPosts.find(p => p.slug === slug) || null;
  }
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (!client) return mockSuccessStories;
  try {
    const data = await client.fetch(successStoriesQuery, {}, { next: { tags: ['sanity'] } });
    return data || mockSuccessStories;
  } catch (error) {
    console.error('Sanity Fetch Error (SuccessStories):', error);
    return mockSuccessStories;
  }
}

export async function getSuccessStoryBySlug(slug: string): Promise<SuccessStory | null> {
  if (!client) return mockSuccessStories.find(s => s.slug === slug) || null;
  try {
    const data = await client.fetch(successStoryBySlugQuery, { slug }, { next: { tags: ['sanity'] } });
    return data || mockSuccessStories.find(s => s.slug === slug) || null;
  } catch (error) {
    console.error(`Sanity Fetch Error (SuccessStory: ${slug}):`, error);
    return mockSuccessStories.find(s => s.slug === slug) || null;
  }
}

export async function getIndustries() {
  if (!client) return industriesData;
  try {
    const data = await client.fetch(industriesQuery, {}, { next: { tags: ['sanity'] } });
    return data && data.length > 0 ? data.map((item: any) => ({
      ...item,
      slug: item.slug?.current || item.slug
    })) : industriesData;
  } catch (error) {
    console.error('Sanity Fetch Error (Industries):', error);
    return industriesData;
  }
}

export async function getIndustryBySlug(slug: string) {
  if (!client) {
    return industriesData.find(i => i.slug === slug);
  }
  try {
    const data = await client.fetch(industryBySlugQuery, { slug }, { next: { tags: ['sanity'] } });
    if (!data) return industriesData.find(i => i.slug === slug);

    return {
      ...data,
      seo: data.seo || industriesData.find(i => i.slug === slug)?.seo
    };
  } catch (error) {
    console.error(`Sanity Fetch Error (Industry: ${slug}):`, error);
    return industriesData.find(i => i.slug === slug);
  }
}

export async function getSolutions() {
  if (!client) return solutionsData;
  try {
    const data = await client.fetch(solutionsQuery, {}, { next: { tags: ['sanity'] } });
    return data && data.length > 0 ? data.map((item: any) => ({
      ...item,
      slug: item.slug?.current || item.slug
    })) : solutionsData;
  } catch (error) {
    console.error('Sanity Fetch Error (Solutions):', error);
    return solutionsData;
  }
}


export async function getServices() {
  const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
  if (!client) return servicesData.filter(s => !engineeringSlugs.includes(s.slug));
  try {
    const data = await client.fetch(servicesQuery, {}, { next: { tags: ['sanity'] } });
    const allServices = data && data.length > 0 ? data.map((item: any) => ({
      ...item,
      slug: item.slug?.current || item.slug
    })) : servicesData;
    return allServices.filter((s: any) => !engineeringSlugs.includes(s.slug));
  } catch (error) {
    console.error('Sanity Fetch Error (Services):', error);
    return servicesData.filter(s => !engineeringSlugs.includes(s.slug));
  }
}

export async function getServiceBySlug(slug: string) {
  const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
  if (engineeringSlugs.includes(slug)) return null;

  if (!client) {
    return servicesData.find(s => s.slug === slug);
  }
  try {
    const data = await client.fetch(serviceBySlugQuery, { slug }, { next: { tags: ['sanity'] } });
    if (!data) return servicesData.find(s => s.slug === slug);

    return {
      ...data,
      seo: data.seo || servicesData.find(s => s.slug === slug)?.seo
    };
  } catch (error) {
    console.error(`Sanity Fetch Error (Service: ${slug}):`, error);
    return servicesData.find(s => s.slug === slug);
  }
}

export async function getSolutionBySlug(slug: string) {
  if (!client) {
    return solutionsData.find(s => s.slug === slug);
  }
  try {
    const data = await client.fetch(solutionBySlugQuery, { slug }, { next: { tags: ['sanity'] } });
    if (!data) return solutionsData.find(s => s.slug === slug);

    return {
      ...data,
      seo: data.seo || solutionsData.find(s => s.slug === slug)?.seo
    };
  } catch (error) {
    console.error(`Sanity Fetch Error (Solution: ${slug}):`, error);
    return solutionsData.find(s => s.slug === slug);
  }
}

export async function getServicesPageData() {
  if (!client) return servicesPageMockData;
  try {
    const data = await client.fetch(servicesPageQuery, {}, { next: { tags: ['sanity'] } });
    if (!data) return servicesPageMockData;

    // Ensure we show all services even if Sanity only has a few
    let cleanCoreServices = (data.coreServices || []).filter((s: any) => s !== null);

    // If we have fewer than expected, let's just fetch all of them
    if (cleanCoreServices.length === 0 || cleanCoreServices.length < servicesPageMockData.coreServices.length) {
      const allServices = await getServices();
      if (allServices && allServices.length > 0) {
        cleanCoreServices = allServices.map((s: any) => ({
          title: s.title,
          headline: s.headline,
          slug: s.slug,
          externalImageUrl: s.externalImageUrl || s.image
        }));
      }
    }

    return {
      ...data,
      seo: data.seo || servicesPageMockData.seo,
      coreServices: cleanCoreServices.length >= servicesPageMockData.coreServices.length
        ? cleanCoreServices
        : servicesPageMockData.coreServices,
      outcomes: (data.outcomes && data.outcomes.length >= servicesPageMockData.outcomes.length)
        ? data.outcomes
        : servicesPageMockData.outcomes
    };
  } catch (error) {
    console.error('Sanity Fetch Error (Services Page):', error);
    return servicesPageMockData;
  }
}

export async function getIndustriesPageData() {
  if (!client) return industriesPageMockData;
  try {
    const data = await client.fetch(industriesPageQuery, {}, { next: { tags: ['sanity'] } });
    if (!data) return industriesPageMockData;

    // Ensure we show all industries even if Sanity only has a few
    let cleanCoreIndustries = (data.coreIndustries || []).filter((i: any) => i !== null);

    // If we have fewer than expected, let's just fetch all of them
    if (cleanCoreIndustries.length === 0 || cleanCoreIndustries.length < industriesPageMockData.coreIndustries.length) {
      const allIndustries = await getIndustries();
      if (allIndustries && allIndustries.length > 0) {
        cleanCoreIndustries = allIndustries.map((i: any) => ({
          title: i.title,
          headline: i.headline,
          slug: i.slug,
          externalImageUrl: i.externalImageUrl || i.image,
          featuredImage: i.featuredImage?.sourceUrl
        }));
      }
    }

    return {
      ...data,
      seo: data.seo || industriesPageMockData.seo,
      coreIndustries: cleanCoreIndustries.length >= industriesPageMockData.coreIndustries.length
        ? cleanCoreIndustries
        : industriesPageMockData.coreIndustries,
      outcomes: (data.outcomes && data.outcomes.length >= industriesPageMockData.outcomes.length)
        ? data.outcomes
        : industriesPageMockData.outcomes
    };
  } catch (error) {
    console.error('Sanity Fetch Error (Industries Page):', error);
    return industriesPageMockData;
  }
}

export async function getEngineeringServicesPageData() {
  if (!client) return engineeringServicesPageMockData;
  try {
    const data = await client.fetch(engineeringServicesPageQuery, {}, { next: { tags: ['sanity'] } });
    if (!data) return engineeringServicesPageMockData;

    // Ensure we show all services even if Sanity only has a few
    let cleanCoreServices = (data.coreServices || []).filter((s: any) => s !== null);

    // If we have fewer than expected, let's just fetch all engineering services
    if (cleanCoreServices.length === 0 || cleanCoreServices.length < engineeringServicesPageMockData.coreServices.length) {
      const allServices = await getEngineeringServices();
      if (allServices && allServices.length > 0) {
        cleanCoreServices = allServices.map((s: any) => ({
          title: s.title,
          headline: s.headline,
          slug: s.slug,
          externalImageUrl: s.externalImageUrl || s.image,
          featuredImage: s.featuredImage?.sourceUrl
        }));
      }
    }

    return {
      ...data,
      seo: data.seo || engineeringServicesPageMockData.seo,
      coreServices: cleanCoreServices.length >= engineeringServicesPageMockData.coreServices.length
        ? cleanCoreServices
        : engineeringServicesPageMockData.coreServices,
      outcomes: (data.outcomes && data.outcomes.length >= engineeringServicesPageMockData.outcomes.length)
        ? data.outcomes
        : engineeringServicesPageMockData.outcomes
    };
  } catch (error) {
    console.error('Sanity Fetch Error (Engineering Services Page):', error);
    return engineeringServicesPageMockData;
  }
}

export async function getSolutionsPageData() {
  if (!client) return solutionsPageMockData;
  try {
    const data = await client.fetch(solutionsPageQuery, {}, { next: { tags: ['sanity'] } });
    if (!data) return solutionsPageMockData;

    // Ensure we show all solutions even if Sanity only has a few
    let cleanCoreSolutions = (data.coreSolutions || []).filter((s: any) => s !== null);

    // If we have fewer than expected, let's just fetch all solutions
    if (cleanCoreSolutions.length === 0 || cleanCoreSolutions.length < solutionsPageMockData.coreSolutions.length) {
      const allSolutions = await getSolutions();
      if (allSolutions && allSolutions.length > 0) {
        cleanCoreSolutions = allSolutions.map((s: any) => ({
          title: s.title,
          headline: s.headline,
          slug: s.slug,
          externalImageUrl: s.externalImageUrl,
          featuredImage: s.featuredImage
        }));
      }
    }

    return {
      ...data,
      seo: data.seo || solutionsPageMockData.seo,
      coreSolutions: cleanCoreSolutions.length >= solutionsPageMockData.coreSolutions.length
        ? cleanCoreSolutions
        : solutionsPageMockData.coreSolutions,
      outcomes: (data.outcomes && data.outcomes.length >= solutionsPageMockData.outcomes.length)
        ? data.outcomes
        : solutionsPageMockData.outcomes
    };
  } catch (error) {
    console.error('Sanity Fetch Error (Solutions Page):', error);
    return solutionsPageMockData;
  }
}

export async function getEngineeringServices() {
  const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
  const engineeringMock = servicesData.filter(s => engineeringSlugs.includes(s.slug));

  if (!client) return engineeringMock;

  try {
    const results = await Promise.all(
      engineeringSlugs.map(slug => client!.fetch(serviceBySlugQuery, { slug }, { next: { tags: ['sanity'] } }))
    );
    const fetched = results
      .map((data, i) => {
        if (!data) return engineeringMock.find(s => s.slug === engineeringSlugs[i]) || null;
        return {
          ...data,
          slug: engineeringSlugs[i], // serviceBySlugQuery doesn't project slug, add it back
          seo: data.seo || engineeringMock.find(s => s.slug === engineeringSlugs[i])?.seo
        };
      })
      .filter(Boolean);
    return fetched.length > 0 ? fetched : engineeringMock;
  } catch (error) {
    console.error('Sanity Fetch Error (Engineering Services):', error);
    return engineeringMock;
  }
}

export async function getEngineeringServiceBySlug(slug: string) {
  const engineeringSlugs = ["iiot-telemetry", "automation", "cloud-infrastructure"];
  const mockFallback = servicesData.find(s => s.slug === slug) || null;

  if (!engineeringSlugs.includes(slug)) return null;
  if (!client) return mockFallback;

  try {
    const data = await client.fetch(serviceBySlugQuery, { slug }, { next: { tags: ['sanity'] } });
    if (!data) return mockFallback;
    return {
      ...data,
      seo: data.seo || mockFallback?.seo
    };
  } catch (error) {
    console.error(`Sanity Fetch Error (Engineering Service: ${slug}):`, error);
    return mockFallback;
  }
}

/**
 * MOCK DATA (Fallback)
 */



export interface PageData {
  slug: string;
  title: string;
  headline: string;
  content: PortableTextBlock[];
  seo: SEOData;
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  };
}

export interface ServicesPageData {
  title: string;
  subtitle: string;
  heroSubheadline: string;
  methodology: {
    step: string;
    title: string;
    description: string;
    icon: string;
  }[];
  outcomes: {
    title: string;
    description: string;
    icon: string;
  }[];
  coreServices: {
    title: string;
    headline: string;
    slug: string;
    externalImageUrl?: string;
    featuredImage?: any;
  }[];
  seo: SEOData;
}

export interface IndustriesPageData {
  title: string;
  subtitle: string;
  heroSubheadline: string;
  methodology: {
    step: string;
    title: string;
    description: string;
    icon: string;
  }[];
  outcomes: {
    title: string;
    description: string;
    icon: string;
  }[];
  coreIndustries: {
    title: string;
    headline: string;
    slug: string;
    image?: string;
    externalImageUrl?: string;
    featuredImage?: any;
  }[];
  seo: SEOData;
}

export interface EngineeringServicesPageData {
  title: string;
  subtitle: string;
  heroSubheadline: string;
  methodology: {
    step: string;
    title: string;
    description: string;
    icon: string;
  }[];
  outcomes: {
    title: string;
    description: string;
    icon: string;
  }[];
  coreServices: {
    title: string;
    headline: string;
    slug: string;
    externalImageUrl?: string;
    featuredImage?: any;
  }[];
  seo: SEOData;
}

export interface SolutionsPageData {
  title: string;
  subtitle: string;
  heroSubheadline: string;
  methodology: {
    step: string;
    title: string;
    description: string;
    icon: string;
  }[];
  outcomes: {
    title: string;
    description: string;
    icon: string;
  }[];
  coreSolutions: {
    title: string;
    headline: string;
    slug: string;
    externalImageUrl?: string;
    featuredImage?: any;
  }[];
  seo: SEOData;
}

export const clientsData = [
  { name: "Licious" }, { name: "Curefit" }, { name: "Zetwerk" },
  { name: "Designcafe" }, { name: "Ravago" }, { name: "BI Worldwide" },
  { name: "Murudeshwar Ceramics" }, { name: "Vahini Irrigations" }
];

export const testimonialsData = [
  {
    quote: "We replaced all legacy SAP, Tally, and Daily Tracker applications with Odoo Enterprise Edition. Now, all our teams are interconnected, and everything is happening paperless. Thanks to Prixgen's professional efforts and expert knowledge.",
    author: "Karan Shetty",
    title: "Executive Director, Murudeshwar Ceramics Limited"
  },
  {
    quote: "The COVID-19 shift forced us to adapt quickly. Odoo ERP drastically reduced reporting and reconciliation time for my team. Prixgen configured the platform without disrupting our current practices. A strong implementation partner with exceptional product knowledge.",
    author: "Kshiraj Prakash",
    title: "Finance Controller, BI Worldwide"
  },
  {
    quote: "Our experience with Prixgen has been exceptional. The breadth and depth of the offering has met all our requirements, and the team has been incredibly responsive to all our needs.",
    author: "Hemraj Sencha",
    title: "Managing Director, Vahini Irrigations"
  }
];

export const homeData = {
  title: "Intelligent Operations. Unified Enterprise.",
  heroImage: {
    _type: 'image',
    asset: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
  },
  subheadline: [
    {
      _type: 'block',
      style: 'normal',
      children: [{ _type: 'span', text: "We architect, deploy, and manage scalable ERP and supply chain ecosystems for global manufacturing and FMCG leaders. Powered by AI, GenAI, and IoT, our solutions fuse Odoo and SAP with proven industrial intelligence." }]
    }
  ],
  heroPrimaryCTA: "Schedule an Architecture Audit",
  heroSecondaryCTA: "Read the 2026 Manufacturing Benchmark",
  socialProof: "Trusted by leading industrial operators across APAC and Australia to process billions in supply chain volume.",
  clients: clientsData,
  testimonials: testimonialsData,
  ctaTitle: "Ready to architect your operational intelligence?",
  ctaDescription: "Join 100+ industrial leaders who have unified their global operations. Start your transformation with a zero-cost architecture audit.",
  ctaButtonText: "Book an Architecture Audit",
  seo: {
    title: "Odoo Gold Partner, SAP Experts, Software Consulting, Managed Cloud & AI/ML | Prixgen",
    metaDesc: "Global enterprise IT consultants specializing in Odoo, SAP, software consulting, managed cloud, AI/ML, and IIoT integration for manufacturing, FMCG, and industrial sectors.",
    keywords: [
      "Odoo Gold Partner",
      "SAP Implementation",
      "Enterprise ERP",
      "Industrial IoT",
      "Supply Chain Digital Transformation",
      "Software Consulting",
      "Managed Cloud",
      "AI & ML"
    ]
  }
};

export const aboutData = {
  title: "Global Architects of Enterprise Intelligence.",
  subtitle: "Pioneering enterprise intelligence through a specialized fusion of IoT, BI, and Analytics.",
  content: [
    {
      _type: 'block',
      children: [{ _type: 'span', text: "Prixgen ensures the best ROI for companies by streamlining business processes. Driven by the idea of providing innovative solutions through ERP, IIoT, and AI, we are an elite team of IT professionals with over 20+ years of combined experience in enterprise implementations." }]
    },
    {
      _type: 'block',
      children: [{ _type: 'span', text: "We don't just deploy software; we future-proof your digital journey. Our methodology is rooted in architectural integrity and zero-tolerance for operational friction." }]
    }
  ],
  vision: "Build enterprise solutions, experience the modern technology",
  mission: "\"PRIXGEN\" being enterprise information solutions provider, understands the client business processes and meticulously planning the business solutions by augmenting and crafting a niche IoT platform for the customers.",
  stats: [
    { label: "Years Experience", value: "20+" },
    { label: "Implementations", value: "100+" },
    { label: "Architect Team", value: "Elite" },
    { label: "Odoo Partner", value: "Gold" },
  ],
  whyChooseUsIntro: "We provide an uncompromising technical edge for industrial leaders who demand reliability and scale.",
  whyChooseUs: [
    {
      title: "Assured Services",
      description: "Zero-latency support and multi-layered quality assurance for your entire enterprise stack."
    },
    {
      title: "Future-Proofed Innovation",
      description: "Architectures designed to evolve with AI, machine learning, and global supply chain shifts."
    },
    {
      title: "Expert Engineering",
      description: "Clean code and modular scalability from a team with decades of industrial expertise."
    }
  ],
  experienceSection: {
    title: "20 Years of Industrial Excellence",
    description: "Our journey has been defined by rescuing failed implementations and architecting unified global ecosystems.",
    points: [
      "Certified Gold Partners for Odoo.",
      "Proprietary AI and IIoT telemetry extraction models.",
      "Global delivery centers across APAC and EMEA."
    ]
  },
  featuredImage: {
    sourceUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    altText: "The Prixgen Elite Team"
  },
  seo: {
    title: "Global Architects of Enterprise Intelligence | Prixgen",
    metaDesc: "Elite team of ERP consultants with 20+ years of expertise in IIoT, AI, and large-scale industrial digital transformation.",
    keywords: ["ERP Consultants", "Digital Transformation Agency", "Industrial AI Experts", "Odoo Partners India"]
  }
};

export const contactData = {
  title: "Let's Transform Your Operations.",
  description: "Whether you are rescuing a failed implementation, architecting a new global ecosystem, or exploring proprietary AI solutions, our senior consultants are ready to assist.",
  address: "No 2622, Krishna Kaveri Complex, Panchayat, opposite to Bogadi, Mysuru, Karnataka 570026",
  email: "info@prixgen.com",
  phone: "+91 (0821) 2548666",
  mobile: "+91 95138 41111",
  salesPhone: "+91 99300 57159",
  website: "https://www.prixgen.com",
  australiaAddress: "Unit 3 / 5 Murphy Street, Oconnor, Perth, WA 6163, Australia",
  australiaPhone: "08 9337 7907",
  australiaEmail: "info@prixgen.com.au",
  seo: {
    title: "ERP Architecture Audit & Strategy Consulting | Prixgen",
    metaDesc: "Schedule a zero-cost architecture audit for your enterprise. Discuss Odoo, SAP, or IIoT roadmaps with our senior consultants.",
    keywords: ["ERP Audit", "IT Strategy Consulting", "Contact Prixgen", "Australia ERP Services"]
  }
};

export const industriesData: any[] = [
  {
    slug: "manufacturing",
    title: "Discrete & Process Manufacturing",
    headline: "Engineering the Smart Factory of the Future.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", altText: "Manufacturing" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop", altText: "Modern Industrial Facility" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Manufacturing is no longer just about physical production; it's about digital intelligence. We help discrete and process manufacturers transition to Industry 5.0 by integrating their shop-floor machinery with enterprise-grade ERP systems. Our solutions provide real-time visibility into production cycles, allowing for precise tracking of work-in-progress (WIP) and automated quality control." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in optimizing complex Bills of Materials (BOM) and routing logic, ensuring that your production planning is as efficient as possible. By implementing IIoT sensors and edge computing, we enable predictive maintenance that identifies equipment failure before it causes costly downtime. Our manufacturing architectures are designed for high-stakes environments where precision and uptime are the primary drivers of profitability." }]
      }
    ],
    features: [
      { title: "BOM Optimization", description: "Complex multi-level Bill of Materials management and costing." },
      { title: "Shop Floor Control", description: "Real-time production tracking and operator management." },
      { title: "Predictive Maintenance", description: "AI-backed monitoring to eliminate unplanned downtime." },
      { title: "Quality Assurance", description: "Automated inspection points throughout the production cycle." }
    ],
    process: [
      { title: "Floor Audit", description: "Physical assessment of production lines and data touchpoints." },
      { title: "Digital Integration", description: "Syncing shop-floor hardware with core ERP logic." },
      { title: "Performance Scaling", description: "Optimizing throughput through continuous data analysis." }
    ],
    seo: {
      title: "Industry 5.0 ERP for Manufacturing & Process Engineering",
      metaDesc: "Achieve Zero Operational Friction with integrated shop-floor telemetry and high-precision manufacturing ERP architectures.",
      keywords: ["Industry 5.0", "Manufacturing ERP", "Smart Factory", "Shop Floor Control", "BOM Optimization"]
    }
  },
  {
    slug: "chemicals",
    title: "Chemicals & Process Manufacturing",
    headline: "Precision, Compliance, and Batch Intelligence.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1532187875605-1ef6c237f146?auto=format&fit=crop&q=80&w=1000", altText: "Chemical Industry" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6ad?q=80&w=2000&auto=format&fit=crop", altText: "Chemical Process Control" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Process manufacturing in the chemical industry demands zero-tolerance for error. We deploy architectures that natively handle complex batch management, strict regulatory compliance, and dynamic shelf-life tracking, eliminating fragmented legacy spreadsheets." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our chemical ERP solutions include integrated Quality Management Systems (QMS) that automatically enforce compliance checks at every stage of the production process. We provide real-time batch costing and yield analysis, helping you optimize resource utilization and reduce waste. With Prixgen, your chemical operations achieve a new level of technical precision and regulatory confidence." }]
      }
    ],
    features: [
      { title: "Batch Management", description: "Granular tracking of raw materials and finished goods by batch." },
      { title: "Regulatory Compliance", description: "Automated enforcement of industry standards and safety protocols." },
      { title: "Yield Analysis", description: "Real-time monitoring of production efficiency and waste reduction." },
      { title: "Shelf-Life Tracking", description: "Dynamic management of perishable and volatile chemical components." }
    ],
    process: [
      { title: "Compliance Audit", description: "Reviewing regulatory requirements and safety touchpoints." },
      { title: "Batch Logic Design", description: "Architecting the tracking and costing modules for your specific products." },
      { title: "System Validation", description: "Rigorous testing to ensure data integrity and compliance enforcement." }
    ],
    seo: {
      title: "Chemical ERP Solutions & Batch Manufacturing Compliance",
      metaDesc: "Precision ERP architectures for complex batch management, regulatory compliance (QMS), and dynamic shelf-life tracking.",
      keywords: ["Chemical ERP", "Batch Management", "Regulatory Compliance", "Process Manufacturing"]
    }
  },
  {
    slug: "consumer-goods-distribution",
    title: "FMCG & Distribution",
    headline: "Velocity and Visibility in Consumer Goods.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=1000", altText: "FMCG" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop", altText: "FMCG Distribution Hub" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In the fast-moving consumer goods industry, latency is a liability. We deploy hyper-scalable supply chain architectures that optimize inventory routing, accelerate fulfillment, and protect profit margins from procurement to delivery. Our FMCG solutions are built to handle the complexity of high-volume, multi-channel distribution with zero-fault accuracy." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "By integrating real-time demand forecasting with your procurement cycle, we ensure you maintain optimal stock levels across all distribution hubs. Our warehouse management modules are optimized for the high-velocity picking and packing required in the FMCG sector, while our logistics tracking provides end-to-end visibility into every shipment. With Prixgen, your supply chain becomes a high-speed engine of growth." }]
      }
    ],
    features: [
      { title: "Demand Forecasting", description: "Machine-learning backed inventory planning for high-volume SKUs." },
      { title: "Omnichannel Sync", description: "Unified inventory across retail, e-commerce, and wholesale." },
      { title: "Automated Fulfillment", description: "High-speed picking and packing workflows for distribution centers." },
      { title: "Margin Protection", description: "Real-time tracking of procurement costs and logistics overhead." }
    ],
    process: [
      { title: "Supply Chain Mapping", description: "Identifying latency points in your current distribution network." },
      { title: "System Engineering", description: "Deploying high-velocity inventory and fulfillment architectures." },
      { title: "Visibility Rollout", description: "Implementing real-time tracking for stakeholders across the chain." }
    ],
    seo: {
      title: "High-Velocity FMCG Supply Chain & WMS Solutions",
      metaDesc: "Hyper-scalable supply chain architectures designed for rapid fulfillment, inventory routing, and margin protection.",
      keywords: ["FMCG Supply Chain", "WMS Solutions", "Inventory Routing", "Distribution Automation"]
    }
  },
  {
    slug: "retail",
    title: "Retail Operations",
    headline: "Omnichannel Retail Architecture.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000", altText: "Retail" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Modern retail is no longer just about the storefront; it's about a unified omnichannel experience. We help retailers transform legacy operations into synchronized digital ecosystems where inventory, customer data, and financial reporting are all linked in real-time. Our solutions ensure that whether a customer buys in-store, online, or via mobile, the experience and data remain consistent." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in integrating complex point-of-sale (POS) systems with back-end ERPs, providing a 'single pane of glass' view into your entire retail operation. This integration enables advanced features like click-and-collect, cross-store returns, and real-time loyalty program management. Our retail architectures are designed to help you scale your store count and digital presence with zero operational friction." }]
      }
    ],
    features: [
      { title: "Unified Inventory", description: "Real-time stock visibility across all physical and digital channels." },
      { title: "POS Integration", description: "Deep syncing of storefront sales with back-end financial systems." },
      { title: "Loyalty Management", description: "Personalized customer experiences and reward tracking." },
      { title: "Click-and-Collect", description: "Automated workflows for modern consumer fulfillment models." }
    ],
    process: [
      { title: "Channel Audit", description: "Assessing current performance across physical and digital storefronts." },
      { title: "Unified Design", description: "Architecting the central data hub for all retail operations." },
      { title: "Experience Deployment", description: "Rolling out synchronized features to staff and customers." }
    ],
    seo: {
      title: "Omnichannel Retail ERP & POS Integration | Prixgen",
      metaDesc: "Transform legacy retail into unified omnichannel ecosystems with real-time inventory visibility and POS syncing.",
      keywords: ["Omnichannel Retail", "Retail ERP", "POS Integration", "Unified Commerce"]
    }
  },
  {
    slug: "dairy",
    title: "Dairy & Perishables",
    headline: "Time-Critical Supply Chain Management.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1550583760-d80392be8c42?auto=format&fit=crop&q=80&w=1000", altText: "Dairy Industry" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The dairy and perishable industry operates on an extreme clock where minutes can impact product safety and profit margins. We implement specialized cold-chain ERP tracking and routing modules designed for this level of time-sensitivity. Our solutions ensure that every batch is tracked from farm to shelf, with integrated temperature monitoring and shelf-life alerts." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our perishable-specific routing logic optimizes delivery paths to ensure maximum freshness and minimum waste. We integrate batch-level financial tracking, allowing you to monitor margins on a granular level and identify any leakage in your cold chain. With Prixgen, you gain the technical precision needed to lead in the complex perishables market." }]
      }
    ],
    features: [
      { title: "Cold-Chain Tracking", description: "Integrated temperature and location monitoring for perishables." },
      { title: "Batch-Level Margin", description: "Tracking profitability for every specific production lot." },
      { title: "Freshness Alerts", description: "Automated notifications for items nearing shelf-life limits." },
      { title: "Specialized Routing", description: "Time-optimized logistics for perishable distribution." }
    ],
    process: [
      { title: "Chain Assessment", description: "Physical audit of temperature control and tracking points." },
      { title: "Module Customization", description: "Configuring ERP logic for perishable-specific workflows." },
      { title: "Integrity Rollout", description: "Implementing end-to-end monitoring for quality assurance." }
    ],
    seo: {
      title: "Time-Critical Dairy & Perishable Supply Chain ERP | Prixgen",
      metaDesc: "Specialized cold-chain ERP tracking and time-sensitive logistics for the dairy and perishables industry.",
      keywords: ["Cold Chain Logistics", "Dairy ERP", "Perishables Tracking", "Supply Chain Visibility"]
    }
  },
  {
    slug: "information-services",
    title: "Information Services",
    headline: "Digital Infrastructure and Enterprise Software.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000", altText: "Information Services" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In the information age, data is the most valuable asset. We architect high-availability digital infrastructures that allow information-heavy enterprises to process, secure, and monetize their data assets. Our solutions focus on eliminating data silos and creating a unified digital core that supports rapid innovation and global scale." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "From managing complex software-as-a-service (SaaS) environments to deploying enterprise-wide knowledge management systems, we provide the technical depth required to lead in the information sector. Our architectures are designed for high throughput and zero-latency access, ensuring that your teams have the intelligence they need, exactly when they need it." }]
      }
    ],
    features: [
      { title: "Data Core Sync", description: "Unifying fragmented data sources into a single source of truth." },
      { title: "SaaS Governance", description: "Optimizing software ecosystems for maximum ROI and performance." },
      { title: "Knowledge Management", description: "Intelligent systems for capturing and sharing enterprise intelligence." },
      { title: "Scalable Infrastructure", description: "Cloud-native architectures built for high-growth digital environments." }
    ],
    process: [
      { title: "Data Audit", description: "Identifying silos and security vulnerabilities in your digital stack." },
      { title: "Architecture Blueprint", description: "Designing the unified digital core for your enterprise." },
      { title: "Scale Deployment", description: "Rolling out the new infrastructure with zero downtime." }
    ],
    seo: {
      title: "Enterprise Data Architecture & High-Availability IT | Prixgen",
      metaDesc: "Architecting high-availability digital cores and SaaS governance for information-heavy industrial enterprises.",
      keywords: ["Data Architecture", "SaaS Governance", "IT Infrastructure", "Digital Core"]
    }
  },
  {
    slug: "electronics",
    title: "Electronics",
    headline: "High-Precision Engineering and Assembly.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000", altText: "Electronics" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The electronics industry demands a level of precision and supply chain agility that traditional systems often fail to deliver. We implement specialized ERP architectures that handle micro-BOM management, complex component sourcing, and high-velocity assembly lines. Our solutions provide end-to-end traceability for every component, ensuring quality and compliance in a fast-moving market." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "By integrating real-time shop-floor data with procurement and inventory modules, we help electronics manufacturers minimize waste and optimize their production cycles. Our architectures support advanced manufacturing techniques like surface-mount technology (SMT) and automated optical inspection (AOI), providing the visibility needed to maintain high yields and competitive margins. With Prixgen, your electronics operations achieve the technical precision required for global leadership." }]
      }
    ],
    features: [
      { title: "Micro-BOM Management", description: "Handling thousands of components with absolute precision and costing." },
      { title: "Component Traceability", description: "End-to-end tracking from raw material to finished electronic unit." },
      { title: "SMT Integration", description: "Direct syncing of assembly line machinery with enterprise dashboards." },
      { title: "Global Sourcing Sync", description: "Managing complex vendor networks and lead times in real-time." }
    ],
    process: [
      { title: "Engineering Audit", description: "Reviewing assembly line data points and BOM complexity." },
      { title: "Logic Customization", description: "Tailoring ERP modules for electronics-specific workflows." },
      { title: "Precision Deployment", description: "Rolling out the synchronized system across the production floor." }
    ],
    seo: {
      title: "Electronics Manufacturing ERP & Assembly Traceability",
      metaDesc: "High-precision ERP for micro-BOM management, assembly line automation, and component-level traceability.",
      keywords: ["Electronics ERP", "SMT Integration", "Micro-BOM", "Component Traceability"]
    }
  },
  {
    slug: "pvc-manufacturing",
    title: "PVC Manufacturing",
    headline: "Transforming PVC Manufacturing with Intelligent Enterprise Operations.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000", altText: "PVC Manufacturing" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop", altText: "Modern Industrial Facility" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "PVC manufacturers currently struggle with severe margin erosion, a lack of real-time operational visibility, and significant process inefficiencies that collectively undermine profitability and production stability. The Prixgen PVC Manufacturing Solution systematically addresses these leakages by integrating weighbridges, recipe management, and automated dealer networks." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Through dynamic resin pricing engines, digital recipe variance control, and direct IoT connectivity, our solutions eliminate manual entry errors, reduce powder dust loss, and automate collections. With Prixgen, PVC operations achieve end-to-end traceability and a direct boost to EBITDA." }]
      }
    ],
    features: [
      { title: "Dynamic Pricing Engine", description: "Enforce automated quotation workflows and credit control automation to secure profitability against volatile resin pricing." },
      { title: "MRP-based Recipe Management", description: "Optimize recipe consistencies, batch traceability, and scrap accounting to prevent powder loss and regrind ratio misuse." },
      { title: "IoT Weighbridge Link & Gate Passes", description: "Connect scales to digital systems to automate net weight gate passes and dispatch syncing." },
      { title: "Dealer Management System (DMS)", description: "Automate secondary sales, rules-based schemes, claims approvals, and reduce dispute delays." }
    ],
    process: [
      { title: "Process Audit", description: "Identify raw material wastage, weighbridge setups, and secondary sales gaps." },
      { title: "Solution Blueprint", description: "Outline custom integrations for scales, recipe controls, and ERP distribution loops." },
      { title: "Phased Implementation", description: "Seamlessly deploy automated quote workflows, MRP calculations, and dealer network digitization." },
      { title: "EBITDA & ROI Tracking", description: "Monitor scrap reductions, quotation speed improvements, and collection cycle compressions." }
    ],
    seo: {
      title: "PVC Manufacturing ERP & Digital Supply Chain | Prixgen",
      metaDesc: "Scale your PVC manufacturing operations with automated weighbridge integration, dynamic resin pricing, recipe controls, and dealer networks.",
      keywords: ["PVC Manufacturing", "Weighbridge Integration", "Dealer Management System", "Recipe Management", "PVC ERP"]
    }
  }
];

export const solutionsData: any[] = [
  {
    slug: "odoo",
    title: "Odoo Enterprise Integration",
    headline: "Odoo Architecture, Engineered for Scale.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", altText: "Odoo ERP" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "As a certified Odoo Gold Partner, we don't just install software; we engineer complex operational engines. We specialize in high-stakes Odoo Enterprise migrations and greenfield implementations for multi-national organizations. Our approach focuses on minimal customization of the core, ensuring long-term maintainability while delivering maximum functional depth." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "From multi-warehouse inventory routing to automated global procurement and localized financial reporting, we turn Odoo into an uncompromising enterprise engine. Our elite team of developers and consultants ensures that every module is optimized for performance, providing your team with the real-time data needed to make decisive business moves." }]
      }
    ],
    features: [
      { title: "Multi-Entity Consolidation", description: "Seamless financial and operational syncing across global subsidiaries." },
      { title: "Advanced WMS", description: "AI-optimized warehouse routing and real-time inventory tracking." },
      { title: "Automated Procurement", description: "Smart reordering rules and vendor management integration." },
      { title: "Custom BI Dashboards", description: "Tailored reporting engines for executive-level decision making." }
    ],
    process: [
      { title: "GAP Analysis", description: "Detailed mapping of business requirements against Odoo standards." },
      { title: "Architectural Design", description: "Designing the data flows and integration touchpoints." },
      { title: "Agile Deployment", description: "Phased rollout with continuous feedback and optimization." }
    ],
    seo: {
      title: "Odoo Enterprise Implementation & Customization (Gold Partner)",
      metaDesc: "Engineering complex Odoo engines for multi-national scale. Specialists in migrations, WMS, and custom BI dashboards.",
      keywords: ["Odoo Gold Partner", "Odoo Migration", "Custom Odoo Development", "Enterprise Odoo"]
    }
  },
  {
    slug: "sap",
    title: "SAP Ecosystems",
    headline: "Unlocking the Full Value of SAP.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000", altText: "SAP Solutions" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We guide mid-market and enterprise clients through the complexities of SAP Business One and S/4HANA deployments. Our methodology begins with a Phase-Zero architectural audit, identifying hidden inefficiencies in your current stack before a single line of code is moved. We focus on creating a 'clean core' that allows for rapid scaling and easy integration with external systems." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Whether you are migrating from legacy systems or optimizing an existing SAP environment, our consultants bring decades of industrial expertise to the table. We ensure that your SAP ecosystem aligns perfectly with your long-term operational strategy, providing the stability and visibility required for global industrial leadership." }]
      }
    ],
    features: [
      { title: "SAP S/4HANA Migration", description: "Secure and optimized transition to the latest SAP core." },
      { title: "Architectural Audits", description: "Phase-zero assessments to identify scaling bottlenecks." },
      { title: "Inter-company Sync", description: "Unified data flow across complex corporate structures." },
      { title: "Compliance Mapping", description: "Ensuring global regulatory standards are natively enforced." }
    ],
    process: [
      { title: "Strategic Audit", description: "Deep-dive into current operational gaps and data silos." },
      { title: "Blueprint Engineering", description: "Developing the technical roadmap for your SAP ecosystem." },
      { title: "Managed Rollout", description: "Carefully orchestrated implementation with zero business disruption." }
    ],
    seo: {
      title: "SAP Business One Migration & Strategic ERP Consulting",
      metaDesc: "Unlocking SAP value through Phase-Zero architectural audits and strategic S/4HANA migration services.",
      keywords: ["SAP Business One", "S/4HANA Migration", "SAP Consulting", "Enterprise SAP"]
    }
  },
  {
    slug: "microsoft-dynamics",
    title: "Microsoft Dynamics 365",
    headline: "Unified CRM and ERP Capabilities.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=1000", altText: "Dynamics 365" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Break down data silos and modernize your business with Microsoft Dynamics 365. We deploy intelligent cloud applications that unify financial management, supply chain operations, and customer insights into a single pane of glass. Our solutions leverage the full power of the Microsoft Power Platform, including Power BI and Power Automate, to create a truly connected enterprise." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in tailoring Dynamics 365 Business Central and F&O for industrial environments, ensuring that your field service, sales, and manufacturing teams are all working from a single source of truth. With Prixgen, your Microsoft ecosystem becomes a driver of innovation, providing the agility needed to respond to changing market demands." }]
      }
    ],
    features: [
      { title: "Power Platform Sync", description: "Deep integration with Power BI, Apps, and Automate." },
      { title: "Unified CRM & ERP", description: "Seamless data flow between customer facing and back-end teams." },
      { title: "Cloud Architecture", description: "Scalable, secure, and always-on enterprise environment." },
      { title: "Predictive Analytics", description: "Leveraging Azure AI for demand and financial forecasting." }
    ],
    process: [
      { title: "Ecosystem Mapping", description: "Evaluating current Microsoft 365 usage and integration points." },
      { title: "Tailored Architecture", description: "Building the custom modules and data flows for your industry." },
      { title: "Success Rollout", description: "Comprehensive training and phased deployment for maximum adoption." }
    ],
    seo: {
      title: "Microsoft Dynamics 365 & Power BI Integration | Prixgen",
      metaDesc: "Unified financial management and supply chain operations using Dynamics 365 and the Microsoft Power Platform.",
      keywords: ["Dynamics 365", "Power BI Integration", "Business Central", "Microsoft ERP"]
    }
  },
  {
    slug: "lecca-ai",
    title: "Lecca: Computer Vision & AI",
    headline: "AI-Powered Industrial Image Processing.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000", altText: "Lecca AI" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Lecca is our proprietary AI platform designed specifically for industrial environments. We use advanced computer vision to automate quality control, safety monitoring, and asset tracking. By processing visual data at the edge, Lecca provides real-time alerts that prevent accidents and ensure that every product leaving your facility meets the highest standards." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our AI models are trained on hundreds of thousands of industrial data points, making them highly resilient to the challenging lighting and environmental conditions of a factory floor. Lecca integrates directly with your core ERP, turning visual observations into actionable data points for your management team. Experience the next generation of industrial intelligence with Lecca." }]
      }
    ],
    features: [
      { title: "Automated QC", description: "Visual inspection at production speed with zero-error tolerance." },
      { title: "Safety Monitoring", description: "Real-time detection of PPE compliance and hazardous conditions." },
      { title: "Asset Tracking", description: "AI-powered identification and location tracking of industrial assets." },
      { title: "Edge Processing", description: "Low-latency analysis performed directly on-site for immediate action." }
    ],
    process: [
      { title: "Vision Audit", description: "Identifying high-value automation points on your production line." },
      { title: "Model Training", description: "Developing custom AI models for your specific product or environment." },
      { title: "Hardware Sync", description: "Deploying cameras and edge computing units for live monitoring." }
    ],
    seo: {
      title: "Industrial Computer Vision & AI Quality Control | Prixgen",
      metaDesc: "Automate safety monitoring and quality control with Lecca, our proprietary industrial computer vision platform.",
      keywords: ["Industrial AI", "Computer Vision", "Automated Quality Control", "Lecca AI"]
    }
  },
  {
    slug: "power-bi",
    title: "Power BI",
    headline: "Real-time industrial intelligence and predictive visualization.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1000", altText: "Power BI" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Transform raw industrial data into actionable executive insights with Power BI. We design high-performance data models that connect directly to your Odoo or SAP core, providing real-time visibility into production KPIs, financial health, and supply chain performance. Our custom dashboards are engineered for high-stakes decision making, featuring predictive trend analysis and automated alerting." }]
      }
    ],
    features: [
      { title: "Real-time Dashboards", description: "Live monitoring of industrial KPIs and operational health." },
      { title: "Predictive Modeling", description: "Anticipating market shifts and demand fluctuations." },
      { title: "ERP Data Bridge", description: "Direct, secure connection to Odoo, SAP, and Dynamics data." }
    ],
    process: [
      { title: "Data Audit", description: "Identifying key metrics and data sources for visualization." },
      { title: "Architecture Design", description: "Building the secure data pipeline and modeling logic." },
      { title: "Executive Rollout", description: "Deploying high-visibility dashboards to leadership teams." }
    ],
    seo: {
      title: "Industrial Intelligence & Predictive BI Dashboards | Prixgen",
      metaDesc: "Transform shop-floor data into executive insights with custom Power BI data models and real-time KPI dashboards.",
      keywords: ["Power BI Dashboards", "Predictive Analytics", "Industrial BI", "ERP Reporting"]
    }
  },
  {
    slug: "dynamics-nav",
    title: "Dynamics NAV Modernization",
    headline: "Modernize your legacy ERP with cloud-ready extensions.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000", altText: "Dynamics NAV" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Don't let legacy software hold back your enterprise growth. We specialize in modernizing Dynamics NAV environments, extending their lifespan with modern cloud integrations and AI layers. Whether you are looking to migrate to Business Central or optimize your current NAV deployment, our architects provide the technical bridge needed for high-availability performance." }]
      }
    ],
    features: [
      { title: "Cloud Extensions", description: "Adding modern web and mobile capabilities to legacy NAV." },
      { title: "Database Optimization", description: "Enhancing performance for high-volume industrial workloads." },
      { title: "Integration Bridge", description: "Connecting NAV to modern IIoT and AI ecosystems." }
    ],
    process: [
      { title: "Legacy Audit", description: "Assessing the current health and customization depth of your NAV stack." },
      { title: "Modernization Roadmap", description: "Defining the phased approach to cloud and AI integration." },
      { title: "Secure Deployment", description: "Rolling out updates with zero data loss or operational downtime." }
    ],
    seo: {
      title: "Dynamics NAV Modernization & Support | Prixgen",
      metaDesc: "Extending the power of legacy Dynamics NAV with modern cloud and AI architectures.",
      keywords: ["Dynamics NAV", "ERP Modernization", "NAV Support", "Legacy System Bridge"]
    }
  },
  {
    slug: "image-processing",
    title: "Advanced Image Processing",
    headline: "Advanced computer vision for quality control and inspection.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000", altText: "Image Processing" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our image processing solutions bring high-precision computer vision to the shop floor. We design systems that automatically detect defects, verify assembly steps, and monitor safety compliance in real-time. By utilizing custom AI models trained on your specific products, we eliminate the variability of human inspection and ensure 100% quality assurance." }]
      }
    ],
    features: [
      { title: "Automated Inspection", description: "High-speed defect detection and assembly verification." },
      { title: "Precision Measurement", description: "Sub-millimeter visual auditing for critical industrial components." },
      { title: "Safety Surveillance", description: "AI-backed monitoring of PPE compliance and danger zones." }
    ],
    process: [
      { title: "Optics Survey", description: "Defining camera and lighting requirements for your environment." },
      { title: "Algorithm Training", description: "Developing custom vision models for your unique products." },
      { title: "Real-time Integration", description: "Connecting vision signals to your production line and ERP." }
    ],
    seo: {
      title: "Industrial Image Processing & Computer Vision | Prixgen",
      metaDesc: "High-precision computer vision solutions for automated quality control.",
      keywords: ["Image Processing", "Industrial Vision", "Quality Control AI", "Surface Inspection"]
    }
  },
  {
    slug: "prixgen-warehouse-management-solution",
    title: "Warehouse Management",
    headline: "Intelligent Inventory and Fulfillment Automation.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000", altText: "Warehouse Management Systems" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop", altText: "Warehouse Efficiency" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Eliminate manual errors and optimize warehouse space with our intelligent WMS architectures. Prixgen's WMS solutions provide zero-latency visibility into every SKU in your facility, enabling real-time inventory tracking and automated fulfillment routes. We design systems that handle the complexity of high-volume, multi-channel distribution with ease." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our intelligent picking algorithms minimize travel time for warehouse staff, while automated slotting optimization ensures that your high-velocity items are always in the most accessible locations. We integrate seamlessly with your existing ERP, ensuring that your physical inventory and digital records are always perfectly in sync, eliminating the 'ghost stock' issues that plague traditional warehouses." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Beyond software, we provide the technical expertise to deploy modern hardware—from RFID systems to mobile data terminals—that empowers your workforce. With a Prixgen-designed WMS, your warehouse becomes a high-performance hub that accelerates your entire supply chain." }]
      }
    ],
    features: [
      { title: "Automated Picking", description: "Intelligent route planning to minimize picker travel time." },
      { title: "Real-time Tracking", description: "Zero-latency visibility into every SKU in your facility." },
      { title: "Slotting Optimization", description: "Dynamic reorganization of stock based on velocity." },
      { title: "ERP Syncing", description: "Perfect alignment between physical stock and digital records." }
    ],
    process: [
      { title: "Facility Blueprinting", description: "Digital mapping of your warehouse for WMS configuration." },
      { title: "Hardware Deployment", description: "Setting up RFID, scanning, and mobile data terminals." },
      { title: "Go-Live Support", description: "On-site assistance during the critical transition period." }
    ],
    seo: {
      title: "Intelligent Warehouse Management Systems (WMS) \| Prixgen",
      metaDesc: "Next-generation WMS for automated picking, slotting optimization, and real-time inventory tracking.",
      keywords: ["Intelligent WMS", "Warehouse Automation", "Inventory Tracking", "Fulfillment Software"]
    }
  }
];

export const servicesData: any[] = [
  {
    slug: "business-strategy",
    title: "Business Strategy & Transformation",
    headline: "Architecting Long-term Value and Market Leadership.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", altText: "Business Transformation" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop", altText: "Modernizing Enterprise Systems" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In an era of unprecedented digital disruption, a static business strategy is no longer viable. We partner with enterprise leaders to redefine their operational models, identifying high-impact opportunities for digital transformation and sustainable growth. Our approach goes beyond simple efficiency gains; we focus on building resilient business architectures that can adapt to rapid market shifts while maintaining high margins and customer loyalty." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our strategic framework is built on three pillars: Operational Agility, Technical Excellence, and Market Innovation. By conducting deep-dive audits of your existing value chain, we pinpoint bottlenecks that hinder growth and replace them with streamlined, automated workflows. This transformation ensures that your organization remains competitive in a global economy that rewards speed and precision." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We don't just provide a roadmap; we govern the entire implementation process. From aligning executive vision to ensuring front-line adoption, our consultants work side-by-side with your teams to deliver measurable ROI. Whether you are looking to enter new markets or optimize your core operations, Prixgen provides the strategic clarity needed to achieve market leadership." }]
      }
    ],
    features: [
      { title: "Market Analysis", description: "Deep-dive competitive intelligence and market trend forecasting." },
      { title: "Operational Audit", description: "Identifying inefficiencies in current business processes." },
      { title: "Transformation Roadmap", description: "Phased implementation plans for digital modernization." },
      { title: "ROI Projection", description: "Data-backed forecasting of transformation benefits." }
    ],
    process: [
      { title: "Discovery & Alignment", description: "We align with your executive vision and identify core business objectives." },
      { title: "Strategic Architecture", description: "Designing the new operational model and technical requirements." },
      { title: "Implementation Governance", description: "Managing the transition with minimal operational disruption." }
    ],
    seo: {
      title: "Business Strategy & Digital Transformation | Prixgen",
      metaDesc: "Strategic consultancy for long-term value creation and operational optimization.",
      keywords: ["Business Transformation", "Digital Strategy", "Legacy Modernization", "Process Re-engineering"]
    }
  },
  {
    slug: "it-consulting",
    title: "IT & Management Consulting",
    headline: "Aligning Technology with Business Strategy.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", altText: "IT Consulting" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop", altText: "IT Strategy Session" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "A company's technology should accelerate its strategy, not constrain it. Our IT and Management Consulting services are designed to bridge the gap between technical infrastructure and business objectives. We conduct deep architectural audits to identify workflow bottlenecks, eliminate technical debt, and build a modern roadmap for digital transformation that scales with your growth." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In today's complex technical landscape, choosing the right stack is critical. We assist organizations in navigating the myriad of software and hardware options, ensuring that every investment delivers long-term value. Our expertise spans legacy system modernization, hybrid cloud migrations, and the implementation of high-velocity DevOps cultures that reduce time-to-market for your internal applications." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Security and compliance are integrated into everything we do. Beyond optimization, we ensure your IT infrastructure is hardened against modern threats and compliant with global data regulations. With Prixgen as your consulting partner, your technology becomes a powerful engine for innovation rather than a maintenance burden." }]
      }
    ],
    features: [
      { title: "Enterprise Architecture Audit", description: "Deep-dive assessment of your current technical debt, system bottlenecks, and scalability potential." },
      { title: "Legacy System Modernization", description: "Seamless migration of mission-critical workflows from aging infrastructure to high-velocity cloud stacks." },
      { title: "Strategic Tech-Stack Governance", description: "Expert guidance on software selection and license optimization to ensure maximum ROI on IT spend." },
      { title: "Cybersecurity Hardening", description: "Comprehensive vulnerability mapping and implementation of zero-trust security frameworks." },
      { title: "Cloud Infrastructure Strategy", description: "Designing resilient, auto-scaling hybrid cloud environments for industrial-scale operations." }
    ],
    process: [
      { title: "Discovery & Technical Audit", description: "We conduct an exhaustive review of your existing hardware, software assets, and team workflows." },
      { title: "Strategic Design & Gap Analysis", description: "Developing a phased modernization roadmap that aligns technical capabilities with business growth goals." },
      { title: "Governance & Continuous Optimization", description: "Providing ongoing oversight and technical advisory to ensure your architecture evolves with market demands." }
    ],
    seo: {
      title: "Strategic IT & Management Consulting | Prixgen",
      metaDesc: "Aligning technology with business strategy through deep architectural audits.",
      keywords: ["IT Consulting", "Strategic IT", "Architecture Audit", "IT Governance"]
    }
  },
  {
    slug: "accounting-advisory",
    title: "Accounting & Financial Advisory",
    headline: "Precision, Compliance, and Financial Intelligence.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000", altText: "Accounting Advisory" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Modern enterprises require real-time financial visibility to make informed decisions at the speed of the market. We deploy integrated accounting architectures that ensure multi-currency compliance, automated reconciliation, and machine-learning backed financial forecasting. Our advisory services go beyond record-keeping; we turn your financial data into a strategic asset." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Managing complex global corporate groups requires a unified financial view. We specialize in multi-entity consolidation and tax compliance across different jurisdictions, reducing the risk of regulatory friction. By automating high-frequency financial tasks, we free your finance team to focus on high-value analysis and strategic capital allocation." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our systems are designed for maximum audit-readiness and transparency. With Prixgen, you gain a robust financial foundation that supports rapid scaling and provides stakeholders with the technical confidence they demand. We ensure your financial stack is as sophisticated as your business goals." }]
      }
    ],
    features: [
      { title: "Multi-Entity Consolidation", description: "Unified financial reporting for global corporate groups." },
      { title: "Tax Compliance", description: "Automated regulatory reporting and multi-jurisdictional compliance." },
      { title: "Cash Flow Analytics", description: "Real-time tracking of liquidity and operational spend." },
      { title: "Audit Readiness", description: "Ensuring all financial data is accurate and verifiable." }
    ],
    process: [
      { title: "Financial Diagnostics", description: "Reviewing current accounting workflows and compliance status." },
      { title: "System Engineering", description: "Implementing automated financial control systems." },
      { title: "Continuous Advisory", description: "Ongoing strategic financial guidance and performance review." }
    ],
    seo: {
      title: "Enterprise Accounting Advisory & Systems | Prixgen",
      metaDesc: "Achieve financial precision and compliance with Prixgen's integrated accounting architectures.",
      keywords: ["Accounting Advisory", "Financial Compliance", "Multi-entity Reporting", "ERP Finance"]
    }
  },
  {
    slug: "management-consulting",
    title: "Management Consulting",
    headline: "Operational Excellence through Process Engineering.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000", altText: "Management Consulting" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We optimize your human and technical capital by re-engineering core business processes for maximum efficiency and zero operational friction. Our management consulting practice is built on the principle that operational excellence is the foundation of market leadership. We work with you to eliminate organizational silos and create a culture of continuous improvement." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our process engineering approach identifies 'hidden' costs in your current workflows—manual tasks, redundant approvals, and communication gaps—and replaces them with lean, automated alternatives. We don't just recommend changes; we help you navigate the complex change management required to ensure these new processes stick and deliver long-term value." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "By defining and tracking the right KPIs, we provide your leadership team with a clear view of operational performance. Whether you are scaling a startup or modernizing a legacy enterprise, Prixgen ensures your management structure is lean, agile, and perfectly aligned with your strategic vision." }]
      }
    ],
    features: [
      { title: "Change Management", description: "Guiding organizations through complex cultural and structural shifts." },
      { title: "KPI Engineering", description: "Defining and tracking the metrics that actually drive growth." },
      { title: "Talent Optimization", description: "Aligning human resources with strategic business goals." },
      { title: "Process Automation", description: "Eliminating manual touchpoints in high-frequency workflows." }
    ],
    process: [
      { title: "Process Mapping", description: "Visualizing current workflows and identifying friction points." },
      { title: "Solution Design", description: "Creating the 'To-Be' model for maximum efficiency." },
      { title: "Scale & Sustain", description: "Standardizing improvements across the entire enterprise." }
    ],
    seo: {
      title: "Management Consulting & Process Engineering | Prixgen",
      metaDesc: "Driving operational excellence and efficiency through expert management consulting.",
      keywords: ["Management Consulting", "Process Engineering", "Operational Excellence", "KPI Design"]
    }
  },
  {
    slug: "supply-chain-consulting",
    title: "Supply Chain Consulting",
    headline: "End-to-End Logistics and Supply Chain Optimization.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1000", altText: "Supply Chain Consulting" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In a global economy where disruptions are the new normal, your supply chain is your competitive edge. We architect resilient, high-velocity logistics networks that reduce latency and protect margins. Our consultants bring deep expertise in network design, supplier governance, and real-time logistics analytics to ensure your physical products move as fast as your digital data." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We help organizations optimize their inventory levels, reducing carrying costs without sacrificing service levels. By implementing advanced demand forecasting and supply chain visibility tools, we enable you to anticipate disruptions and react with agility. Our network design services ensure your warehouse and distribution hubs are located for maximum efficiency and minimum transportation costs." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Integrating your supply chain into your core ERP and WMS is essential for end-to-end transparency. Prixgen provides the technical bridge needed to sync your physical operations with your digital strategy, resulting in a supply chain that is not just a cost center, but a driver of profitability." }]
      }
    ],
    features: [
      { title: "Inventory Optimization", description: "Reducing carrying costs while ensuring 100% service levels." },
      { title: "Network Design", description: "Architecting optimal warehouse and distribution hub locations." },
      { title: "Supplier Governance", description: "Implementing rigorous quality and performance standards." },
      { title: "Logistics Analytics", description: "Real-time visibility into global shipment status and costs." }
    ],
    process: [
      { title: "Network Audit", description: "Analyzing current transportation and storage performance." },
      { title: "Resilience Strategy", description: "Identifying and mitigating potential supply chain disruptions." },
      { title: "Digital Integration", description: "Connecting supply chain data to your core ERP/WMS." }
    ],
    seo: {
      title: "Supply Chain Strategy & Optimization | Prixgen",
      metaDesc: "Architecting resilient, high-velocity logistics networks for global industrial leaders.",
      keywords: ["Supply Chain Strategy", "Logistics Optimization", "Inventory Control", "Demand Sensing"]
    }
  },
  {
    slug: "prixgen-warehouse-management-solution",
    title: "Warehouse Management Systems (WMS)",
    headline: "Intelligent Inventory and Fulfillment Automation.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000", altText: "Warehouse Management Systems" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Eliminate manual errors and optimize warehouse space with our intelligent WMS architectures. Prixgen's WMS solutions provide zero-latency visibility into every SKU in your facility, enabling real-time inventory tracking and automated fulfillment routes. We design systems that handle the complexity of high-volume, multi-channel distribution with ease." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our intelligent picking algorithms minimize travel time for warehouse staff, while automated slotting optimization ensures that your high-velocity items are always in the most accessible locations. We integrate seamlessly with your existing ERP, ensuring that your physical inventory and digital records are always perfectly in sync, eliminating the 'ghost stock' issues that plague traditional warehouses." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Beyond software, we provide the technical expertise to deploy modern hardware—from RFID systems to mobile data terminals—that empowers your workforce. With a Prixgen-designed WMS, your warehouse becomes a high-performance hub that accelerates your entire supply chain." }]
      }
    ],
    features: [
      { title: "Automated Picking", description: "Intelligent route planning to minimize picker travel time." },
      { title: "Real-time Tracking", description: "Zero-latency visibility into every SKU in your facility." },
      { title: "Slotting Optimization", description: "Dynamic reorganization of stock based on velocity." },
      { title: "ERP Syncing", description: "Perfect alignment between physical stock and digital records." }
    ],
    process: [
      { title: "Facility Blueprinting", description: "Digital mapping of your warehouse for WMS configuration." },
      { title: "Hardware Deployment", description: "Setting up RFID, scanning, and mobile data terminals." },
      { title: "Go-Live Support", description: "On-site assistance during the critical transition period." }
    ],
    seo: {
      title: "Enterprise WMS & Warehouse Automation | Prixgen",
      metaDesc: "Next-generation warehouse management systems for intelligent inventory and fulfillment.",
    }
  },
  {
    slug: "hiring-odoo-developers",
    title: "Dedicated Odoo Talent Services",
    headline: "Stop hiring generic module customizers. Augment your technical capacity with pre-vetted Odoo architects capable of building intelligent data pipelines, high-throughput WMS, and industrial IoT hardware loops.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000", altText: "Odoo Developers" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Finding elite Odoo talent is a primary bottleneck in digital transformation. We provide instant access to our pre-vetted hub of senior Odoo developers and ERP architects who have built complex enterprise systems across global industries. Operating from our Mysuru engineering hub, our team integrates seamlessly across APAC, EMEA, and US time zones to scale your technical capability with zero operational friction." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our engineers are not just coders; they are business-aware ERP architects. We specialize in high-stakes customizations: integrating Odoo databases with machine learning pipelines, connecting edge devices (RFID, IoT, scales) to warehouse modules, and designing low-latency API orchestrations with legacy mainframes." }]
      }
    ],
    features: [
      { title: "Industrial WMS & Logistics", description: "Architect high-velocity inventory routes, custom picking/putaway algorithms, and real-time multi-warehouse sync." },
      { title: "Physical IoT & RFID Telemetry", description: "Connect Odoo directly to the shop floor. We design low-level interfaces for scales, scanners, and PLCs using MQTT and OPC UA." },
      { title: "AI/ML Forecasting Pipelines", description: "Integrate custom machine learning models into Odoo's database for predictive ordering and automated demand sensing." },
      { title: "Zero-Latency API Orchestration", description: "Build hardened middleware bridges connecting Odoo to Salesforce, SAP, Shopify, and legacy mainframes with automated retries." }
    ],
    process: [
      { title: "Technical Assessment & Discovery", description: "We align on your system architecture, scoping document, current code repository, and developer seniority requirements." },
      { title: "Developer Selection & Pod Assignment", description: "Review resumes and interview pre-vetted engineers. Once selected, we assign your supporting Architect, DevOps, and DBA resources." },
      { title: "Agile Kickoff & Workspace Sync", description: "Developers join your Slack, configure their local dev environments, sync with your Jira backlog, and begin daily sprint standups." }
    ],
    seo: {
      title: "Hire Dedicated Odoo Developers & Engineering Pods | Prixgen",
      metaDesc: "Augment your team with senior Odoo developers and dedicated engineering pods (Architect, DBA, DevOps included) with SLA-backed delivery. Odoo Gold Partner expertise.",
      keywords: ["Hire Odoo Developers", "Odoo Engineering Pod", "Enterprise Odoo Architects", "Dedicated ERP Developers", "Odoo Staff Augmentation", "PostgreSQL Odoo DBA"]
    }
  },
  {
    slug: "iiot-telemetry",
    title: "IIoT & Telemetry Engineering",
    headline: "Unlocking Real-Time Intelligence from the Shop Floor.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", altText: "IIoT Engineering" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2000&auto=format&fit=crop", altText: "Industrial Data Intelligence" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The future of manufacturing lies in the bridge between physical machinery and digital intelligence. Our IIoT and Telemetry Engineering services extract high-frequency data from your shop floor, transforming raw machine signals into actionable insights. We design secure, scalable architectures that enable predictive maintenance and provide real-time production visibility." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We specialize in connecting legacy machinery via modern industrial protocols like MQTT and OPC UA, ensuring that your entire plant is integrated into your digital dashboard. By utilizing edge computing, we process critical machine data locally, enabling zero-latency control systems and reducing the bandwidth required for cloud-based analytics. Our custom dashboards provide plant managers with a 360-degree view of production health." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Predictive maintenance is no longer a luxury; it is a necessity for protecting your equipment ROI. Our systems identify potential failures before they result in costly downtime, allowing you to schedule repairs during planned maintenance windows. With Prixgen's IIoT engineering, your factory floor becomes a data-driven engine of efficiency." }]
      }
    ],
    features: [
      { title: "Sensor Integration", description: "Connecting legacy machinery via industrial protocols (MQTT, OPC UA)." },
      { title: "Edge Computing", description: "Processing data locally for zero-latency machine control." },
      { title: "Predictive Analytics", description: "Identifying equipment failure before it causes downtime." },
      { title: "Custom Dashboards", description: "High-visibility production monitoring for plant managers." }
    ],
    process: [
      { title: "Field Survey", description: "Physical assessment of machinery and connectivity options." },
      { title: "Infrastructure Setup", description: "Deploying gateways, sensors, and secure edge devices." },
      { title: "Data Visualization", description: "Building the digital twin and real-time alerts." }
    ],
    seo: {
      title: "IIoT Engineering & Real-Time Machine Telemetry | Prixgen",
      metaDesc: "Extracting shop-floor intelligence through custom IIoT and telemetry architectures.",
      keywords: ["IIoT Engineering", "Machine Telemetry", "Predictive Maintenance", "MQTT", "OPC UA"]
    }
  },
  {
    slug: "automation",
    title: "Factory & Industrial Automation",
    headline: "Robotics and Intelligent Control Systems.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1000", altText: "Industrial Automation" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop", altText: "Advanced Robotics" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We design and deploy automated control systems that reduce human error and maximize production throughput in high-stakes manufacturing environments. From robotic arm integration to complete assembly line automation, our engineering team builds the intelligent systems that drive the modern factory. We focus on zero-fault logic and high-speed execution." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our expertise includes the deployment of Collaborative Robots (cobots) and Autonomous Mobile Robots (AMRs) that work safely alongside your human workforce. We provide custom PLC programming and HMI design, ensuring that your operators have intuitive, powerful control over complex machine operations. Our AI-backed vision systems enable high-precision quality control and automated inspection, reducing scrap and increasing yields." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "We utilize advanced 3D simulation to validate automation logic before a single machine is moved on the factory floor. This 'Digital Twin' approach reduces commissioning time and ensures that your automation project delivers the projected ROI from day one. Prixgen is your partner in engineering the future of autonomous manufacturing." }]
      }
    ],
    features: [
      { title: "Robotic Integration", description: "Deploying cobots and autonomous mobile robots (AMRs)." },
      { title: "PLC Programming", description: "Custom logic for complex industrial control systems." },
      { title: "Vision Systems", description: "AI-backed quality control and automated inspection." },
      { title: "HMI Design", description: "Intuitive interfaces for complex machine operations." }
    ],
    process: [
      { title: "Workflow Simulation", description: "Testing automation logic in a 3D digital environment." },
      { title: "Hardware Integration", description: "On-site installation and mechanical synchronization." },
      { title: "Stress Testing", description: "Validating systems under peak production loads." }
    ],
    seo: {
      title: "Industrial Automation & Robotics Systems | Prixgen",
      metaDesc: "Engineering intelligent factory automation and robotic control systems.",
      keywords: ["Industrial Automation", "Robotics", "PLC Programming", "Factory Automation"]
    }
  },
  {
    slug: "cloud-infrastructure",
    title: "Managed Industrial Cloud Infrastructure",
    headline: "High-Availability Ecosystems for Mission-Critical Apps.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", altText: "Cloud Infrastructure" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop", altText: "Secure Cloud Ecosystem" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Prixgen architects and manages secure, industrial-grade cloud environments optimized for ERP performance and data integrity. We understand that for an industrial enterprise, downtime is not just an inconvenience—it's a massive financial loss. That's why our infrastructure is built for high-availability, with zero-data-loss failover and automated disaster recovery protocols." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our hybrid cloud architectures allow you to maintain the security of on-premise data while leveraging the scalability and performance of the public cloud. We perform continuous performance tuning, optimizing your database and application servers to ensure that your mission-critical apps run with zero latency. Our 24/7 managed security service provides proactive threat detection and mitigation, keeping your industrial data safe from modern cyber threats." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "With Prixgen managing your cloud infrastructure, your technical team is free to focus on innovation instead of server maintenance. We provide a stable, high-performance ecosystem that supports your entire digital transformation roadmap, ensuring that your technical foundation is as strong as your business strategy." }]
      }
    ],
    features: [
      { title: "Hybrid Cloud Architecture", description: "Combining on-premise security with cloud scalability." },
      { title: "Disaster Recovery", description: "Automated backups and zero-data-loss failover protocols." },
      { title: "Performance Tuning", description: "Optimizing database and application server latency." },
      { title: "Managed Security", description: "24/7 monitoring and threat detection for your infrastructure." }
    ],
    process: [
      { title: "Cloud Strategy", description: "Defining the right infrastructure for your workload needs." },
      { title: "Migration Execution", description: "Moving data and apps with zero downtime." },
      { title: "Performance Lifecycle", description: "Continuous monitoring and resource optimization." }
    ],
    seo: {
      title: "Industrial Cloud Hosting & Infrastructure | Prixgen",
      metaDesc: "Architecting high-availability cloud environments for Zero Operational Friction.",
      keywords: ["Industrial Cloud", "ERP Hosting", "Disaster Recovery", "Managed IT Services"]
    }
  },
  {
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    headline: "Empower your enterprise with predictive analytics and generative AI.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop", altText: "AI & Machine Learning" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop", altText: "Enterprise Intelligence" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Artificial Intelligence and Machine Learning are no longer buzzwords; they are essential tools for gaining a competitive edge. We help organizations harness the power of AI to drive data-backed decision making, automate repetitive tasks, and unlock new revenue streams. From predictive analytics to natural language processing and generative AI, we build models that solve real-world industrial problems." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our approach integrates AI directly into your existing enterprise architecture. Whether you need an intelligent supply chain forecasting model, an automated customer support agent, or deep visual inspection algorithms on the factory floor, our data scientists and engineers deploy solutions that deliver measurable ROI." }]
      }
    ],
    features: [
      { title: "Predictive Analytics", description: "Anticipating market trends, demand shifts, and equipment failures." },
      { title: "Generative AI", description: "Automating content, code, and reporting workflows." },
      { title: "Computer Vision", description: "High-precision automated inspection and safety monitoring." },
      { title: "Data Integration", description: "Feeding AI models with clean, structured data from your ERP." }
    ],
    process: [
      { title: "Data Audit", description: "Assessing the quality and structure of your enterprise data." },
      { title: "Model Training", description: "Developing and refining AI algorithms tailored to your use case." },
      { title: "Enterprise Deployment", description: "Integrating AI seamlessly into your operational workflows." }
    ],
    seo: {
      title: "AI & Machine Learning Solutions | Prixgen",
      metaDesc: "Drive innovation and efficiency with enterprise-grade predictive analytics and Generative AI.",
      keywords: ["AI", "Machine Learning", "Generative AI", "Predictive Analytics", "Computer Vision"]
    }
  },
  {
    slug: "business-transformation",
    title: "Business Transformation",
    headline: "Comprehensive digital transformation strategies to modernize legacy systems.",
    featuredImage: { sourceUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", altText: "Business Transformation" },
    summaryImage: { sourceUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop", altText: "Modernizing Enterprise Systems" },
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "True digital transformation requires more than just upgrading software; it demands a fundamental shift in how your organization operates. We partner with executive teams to design and execute comprehensive transformation strategies that modernize legacy systems, optimize cross-functional workflows, and build scalable, future-proof operations." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Our holistic approach covers every aspect of transformation: technology architecture, process re-engineering, and cultural change management. We identify high-impact areas where digital tools can eliminate friction, reduce costs, and enhance the customer experience, ensuring that your enterprise remains agile and competitive in a rapidly evolving market." }]
      }
    ],
    features: [
      { title: "Legacy Modernization", description: "Seamless transition from outdated systems to modern cloud architectures." },
      { title: "Process Re-engineering", description: "Redesigning workflows for maximum efficiency and automation." },
      { title: "Change Management", description: "Guiding your teams through cultural and operational shifts." },
      { title: "Strategic Roadmap", description: "Phased implementation plans aligned with your business objectives." }
    ],
    process: [
      { title: "Strategic Discovery", description: "Aligning transformation goals with your core business vision." },
      { title: "Architecture Design", description: "Mapping out the new technological and operational ecosystem." },
      { title: "Agile Execution", description: "Iterative rollout with continuous measurement and refinement." }
    ],
    seo: {
      title: "Digital Business Transformation | Prixgen",
      metaDesc: "Modernize legacy systems and optimize operations with holistic transformation strategies.",
      keywords: ["Business Transformation", "Digital Strategy", "Legacy Modernization", "Process Re-engineering"]
    }
  }
];

export const servicesPageMockData: ServicesPageData = {
  title: "Enterprise Application Services",
  subtitle: "Architectural Services",
  heroSubheadline: "Prixgen Preferred Care: We traverse a stringent, economical, and customer-driven methodology to enable technical confidence and exact solutions.",
  methodology: [
    { step: "01", title: "Discover : We Listen", description: "We define and discuss your goals and challenges, helping you envision new, innovative ways to improve operational experiences.", icon: "Search" },
    { step: "02", title: "Design : We Strategize", description: "We design successful, outcomes-based learning and operational strategies tailored specifically to the needs of our enterprise partners.", icon: "PenTool" },
    { step: "03", title: "Develop : We Create", description: "We offer thoughtful, relevant, and engaging development services, crafting a technical solution that works best for your exact needs.", icon: "Code" }
  ],
  outcomes: [
    { title: "Increase Efficiency", description: "Automate day-to-day tasks, eliminate repetitive processes, and streamline cross-departmental workflows within a single platform.", icon: "Activity" },
    { title: "Promote Collaboration", description: "Break down data silos. Link remote teams, headquarters, and offshore units through secure internet, intranet, and IoT highways.", icon: "Users" },
    { title: "Accurate Forecasting", description: "Leverage centralized databases and advanced analytics to ensure data integrity and generate realistic, machine-learning-backed forecasts.", icon: "LineChart" },
    { title: "Lower Operational Costs", description: "Anticipate disruptions and manage impact effectively. Real-time data across production and supply chain keeps operating costs strictly within budget.", icon: "TrendingUp" },
    { title: "Data Security & Compliance", description: "Guard against breaches with single-warehouse access controls, while meeting myriad business requirements through built-in regulatory reporting.", icon: "ShieldCheck" },
    { title: "SaaS Advantages", description: "Scale effortlessly, access data anywhere, integrate existing apps, and eliminate maintenance downtime with a low capital outlay.", icon: "Server" }
  ],
  coreServices: [
    { title: "Business Strategy", headline: "Long-term value creation and optimization.", slug: "business-strategy" },
    { title: "IT Consulting", headline: "Aligning technology with enterprise goals.", slug: "it-consulting" },
    { title: "Accounting Advisory", headline: "Financial precision and compliance.", slug: "accounting-advisory" },
    { title: "Management Consulting", headline: "Operational excellence and efficiency.", slug: "management-consulting" },
    { title: "Supply Chain Consulting", headline: "End-to-end logistics optimization.", slug: "supply-chain-consulting" },
    { title: "WMS", headline: "Intelligent warehouse management systems.", slug: "prixgen-warehouse-management-solution" },
    { title: "Hiring Odoo Developers", headline: "Dedicated talent for Odoo ecosystems.", slug: "hiring-odoo-developers" },
    { title: "IIoT & Telemetry", headline: "Real-time shop-floor intelligence.", slug: "iiot-telemetry" },
    { title: "Factory Automation", headline: "Robotics and automated control systems.", slug: "automation" },
    { title: "Cloud Infrastructure", headline: "High-availability industrial cloud.", slug: "cloud-infrastructure" },
    { title: "AI & Machine Learning", headline: "Empower your enterprise with predictive analytics and generative AI.", slug: "ai-machine-learning" },
    { title: "Business Transformation", headline: "Comprehensive digital transformation strategies to modernize legacy systems.", slug: "business-transformation" }
  ],
  seo: {
    title: "Services | Enterprise Application Services | Prixgen",
    metaDesc: "Prixgen Preferred Care methodology: Discover, Design, and Develop outcomes-based learning and operational strategies for modern industrial enterprises.",
    keywords: ["IT Modernization", "Enterprise Services", "Business Strategy Consulting", "Industrial Cloud"]
  }
};

export const industriesPageMockData: IndustriesPageData = {
  title: "Transforming Global Industries",
  subtitle: "Market Verticals",
  heroSubheadline: "We architect resilient, data-driven ecosystems across the world's most demanding industrial sectors.",
  methodology: [
    { step: "01", title: "Analyze : Industrial Audit", description: "We conduct deep-dive technical audits of your existing shop-floor and supply chain workflows.", icon: "Search" },
    { step: "02", title: "Architect : Digital Core", description: "We design high-availability digital cores that unify legacy hardware with modern cloud intelligence.", icon: "PenTool" },
    { step: "03", title: "Automate : Scale Operations", description: "We deploy autonomous systems and AI models that drive measurable throughput and efficiency.", icon: "Settings" }
  ],
  outcomes: [
    { title: "Zero Operational Friction", description: "Eliminate data silos and manual bottlenecks across your global production network.", icon: "Zap" },
    { title: "Predictive Intelligence", description: "Shift from reactive repairs to predictive maintenance using shop-floor telemetry.", icon: "LineChart" },
    { title: "High-Precision Costing", description: "Gain absolute visibility into batch-level profitability and resource utilization.", icon: "BarChart3" },
    { title: "Regulatory Confidence", description: "Automated compliance reporting and end-to-end traceability for every unit.", icon: "ShieldCheck" },
    { title: "Supply Chain Resilience", description: "Anticipate disruptions with real-time demand sensing and inventory optimization.", icon: "Network" },
    { title: "Rapid Modernization", description: "Transform legacy factories into smart facilities with minimal operational downtime.", icon: "Factory" }
  ],
  coreIndustries: [
    { title: "Manufacturing", headline: "Industry 5.0 Smart Factories.", slug: "manufacturing", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" },
    { title: "Retail", headline: "Omnichannel Commerce Architecture.", slug: "retail", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" },
    { title: "Chemicals", headline: "Precision Batch Intelligence.", slug: "chemicals", image: "https://images.unsplash.com/photo-1532187875605-1ef6c237f146?auto=format&fit=crop&q=80&w=1000" },
    { title: "PVC Manufacturing", headline: "Intelligent PVC Operations & Logistics.", slug: "pvc-manufacturing", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000" },
    { title: "FMCG & Distribution", headline: "High-Velocity Distribution.", slug: "consumer-goods-distribution", image: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=1000" },
    { title: "Information Services", headline: "Digital Infrastructure & Data.", slug: "information-services", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" },
    { title: "Dairy", headline: "Time-Critical Logistics.", slug: "dairy", image: "https://images.unsplash.com/photo-1550583760-d80392be8c42?auto=format&fit=crop&q=80&w=1000" },
    { title: "Electronics", headline: "High-Precision Engineering.", slug: "electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" }
  ],
  seo: {
    title: "Industries | Enterprise Digital Transformation | Prixgen",
    metaDesc: "Discover how Prixgen architects operational intelligence for Manufacturing, Retail, Chemicals, PVC Manufacturing, FMCG, Dairy, and Electronics.",
    keywords: ["Industrial Transformation", "Market Verticals", "Smart Factory", "Digital Supply Chain", "PVC Manufacturing ERP"]
  }
};

export const engineeringServicesPageMockData: EngineeringServicesPageData = {
  title: "Engineering Services",
  subtitle: "Precision Engineering",
  heroSubheadline: "Fusing mechanical precision with digital intelligence. We architect the telemetry and control systems that drive the factory of the future.",
  methodology: [
    { step: "01", title: "Analyze : Industrial Audit", description: "We conduct deep-dive technical audits of your existing shop-floor and supply chain workflows.", icon: "Search" },
    { step: "02", title: "Architect : Digital Core", description: "We design high-availability digital cores that unify legacy hardware with modern cloud intelligence.", icon: "PenTool" },
    { step: "03", title: "Automate : Scale Operations", description: "We deploy autonomous systems and AI models that drive measurable throughput and efficiency.", icon: "Settings" }
  ],
  outcomes: [
    { title: "Real-time Telemetry", description: "High-frequency data ingestion from every shop-floor sensor for absolute visibility.", icon: "Activity" },
    { title: "Predictive Control", description: "Edge-computing models that anticipate machinery failure before it impacts throughput.", icon: "Zap" },
    { title: "Autonomous Routing", description: "Self-optimizing material handling systems that adapt to real-time production shifts.", icon: "Network" },
    { title: "Closed-Loop Quality", description: "Vision-AI systems that detect and divert defects in sub-millisecond cycles.", icon: "ShieldCheck" },
    { title: "Energy Optimization", description: "Smart grid integration that reduces industrial carbon footprint and utility overheads.", icon: "TrendingUp" },
    { title: "Rapid Reconfigurability", description: "Modular digital architecture that allows for instant line-side adjustments.", icon: "Settings" }
  ],
  coreServices: [
    { title: "IIoT & Telemetry", headline: "Real-time shop-floor intelligence.", slug: "iiot-telemetry" },
    { title: "Factory Automation", headline: "Robotics and automated control systems.", slug: "automation" },
    { title: "Cloud Infrastructure", headline: "High-availability industrial cloud.", slug: "cloud-infrastructure" }
  ],
  seo: {
    title: "Engineering Services | Industrial Intelligence & Automation | Prixgen",
    metaDesc: "Prixgen's engineering services deliver high-frequency IIoT telemetry, factory automation, and bespoke industrial technical solutions.",
    keywords: ["Engineering Services", "Industrial Intelligence", "Factory Automation", "Industrial IoT"]
  }
};

export const solutionsPageMockData: SolutionsPageData = {
  title: "Strategic ERP & AI Architectures",
  subtitle: "Architecture Suite",
  heroSubheadline: "We engineer integrated enterprise ecosystems that bridge the gap between legacy operations and future-ready digital intelligence.",
  methodology: [
    { step: "01", title: "Analyze : Process Mapping", description: "We conduct deep-dive technical audits of your existing business processes and data flow.", icon: "Search" },
    { step: "02", title: "Architect : Solution Design", description: "We design a scalable architecture that integrates core ERP with modern AI and data layers.", icon: "PenTool" },
    { step: "03", title: "Automate : System Rollout", description: "We deploy the integrated solution with a focus on seamless transition and immediate ROI.", icon: "Settings" }
  ],
  outcomes: [
    { title: "Unified Data Core", description: "Single source of truth across finance, supply chain, and manufacturing operations.", icon: "Database" },
    { title: "Operational Velocity", description: "Drastically reduce cycle times through automated workflows and real-time decisioning.", icon: "Zap" },
    { title: "Financial Integrity", description: "Real-time visibility into batch-level profitability and automated financial reporting.", icon: "BarChart3" },
    { title: "Supply Chain Agility", description: "Anticipate market shifts with AI-driven demand sensing and inventory optimization.", icon: "Network" },
    { title: "Regulatory Mastery", description: "Built-in compliance and traceability for global standards and local regulations.", icon: "ShieldCheck" },
    { title: "Scalable Growth", description: "Future-proof architecture that scales seamlessly with your business expansion.", icon: "TrendingUp" }
  ],
  coreSolutions: [
    { title: "Odoo", headline: "Gold Partner precision for scale.", slug: "odoo", externalImageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1000" },
    { title: "SAP", headline: "Intelligent core management.", slug: "sap", externalImageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000" },
    { title: "Microsoft Dynamics", headline: "Unified business applications.", slug: "microsoft-dynamics", externalImageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" },
    { title: "Power BI", headline: "Real-time industrial intelligence and predictive visualization.", slug: "power-bi", externalImageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1000" },
    { title: "Dynamics NAV", headline: "Modernize your legacy ERP with cloud-ready extensions.", slug: "dynamics-nav", externalImageUrl: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000" },
    { title: "IIoT", headline: "Real-time industrial intelligence.", slug: "iiot-telemetry", externalImageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000" },
    { title: "AI & ML", headline: "Proprietary industrial intelligence.", slug: "ai-machine-learning", externalImageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000" },
    { title: "Image Processing", headline: "Advanced computer vision for quality control and inspection.", slug: "image-processing", externalImageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000" },
    { title: "Lecca", headline: "Industrial computer vision and AI intelligence.", slug: "lecca-ai", externalImageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000" }
  ],
  seo: {
    title: "Solutions | Enterprise Resource Planning & AI | Prixgen",
    metaDesc: "Explore Prixgen's comprehensive suite of enterprise solutions including Odoo, SAP, and Tally, integrated with modern AI intelligence.",
  }
};

export const privacyData: PrivacyPageData = {
  title: "Privacy Policy",
  subtitle: "Compliance & Trust",
  heroDescription: "At Prixgen Enterprise, we treat your data with the same precision and integrity we apply to our engineering. Our policy outlines how we safeguard your information in an era of digital intelligence.",
  principles: [
    { title: "Data Collection", icon: "Eye", content: "We collect information necessary to provide our enterprise services, including contact details, professional credentials, and technical logs required for system optimization." },
    { title: "Information Usage", icon: "Server", content: "Your data is used strictly for service delivery, infrastructure maintenance, and communicating critical system updates or strategic business insights." },
    { title: "Security Protocols", icon: "Lock", content: "We implement multi-layered encryption, zero-trust architecture, and rigorous access controls to ensure your industrial data remains sovereign and secure." },
    { title: "Third-Party Disclosure", icon: "Globe", content: "Prixgen does not sell or trade enterprise data. We only share information with vetted partners essential for service orchestration under strict NDAs." }
  ],
  detailedSections: [
    {
      title: "Our Commitment to Security",
      content: "We leverage advanced cybersecurity frameworks to protect your sensitive operational data. Our systems are regularly audited to meet global enterprise standards.",
      keyPoints: ["AES-256 Encryption", "ISO 27001 Alignment"]
    },
    {
      title: "User Rights and Control",
      content: "You maintain absolute control over your information. Under regional data protection laws, you have the right to access, rectify, or erase your data from our systems.",
      keyPoints: ["Request a copy of your stored data", "Update outdated information", "Revoke consent", "Request total data deletion"]
    }
  ],
  lastUpdated: "May 2026",
  referenceId: "PXG-PRV-2026-V1",
  seo: {
    title: "Privacy Policy | Prixgen Enterprise",
    metaDesc: "Read our commitment to data protection and enterprise-grade privacy standards.",
    keywords: ["Privacy Policy", "Data Protection", "Enterprise Privacy", "GDPR Compliance"]
  }
};

export const termsData: TermsPageData = {
  title: "Terms of Service",
  subtitle: "Legal Framework",
  heroDescription: "Our terms are designed to foster transparent, high-performance partnerships. By engaging with Prixgen, you agree to a framework of mutual accountability and engineering excellence.",
  coreTerms: [
    { title: "Service Delivery", icon: "Zap", content: "We commit to delivering high-availability enterprise solutions. Service levels (SLAs) are defined per project engagement to ensure peak operational performance." },
    { title: "Intellectual Property", icon: "FileCheck", content: "All proprietary methodologies and digital assets developed by Prixgen remain our property, while clients retain full ownership of their operational data." },
    { title: "Payment & Terms", icon: "Clock", content: "Standard billing cycles are monthly or milestone-based. Late payments may result in service suspension to maintain infrastructure integrity." },
    { title: "Termination", icon: "Gavel", content: "Either party may terminate the agreement with written notice, subject to project-specific offboarding protocols and data transition safeguards." }
  ],
  detailedSections: [
    {
      title: "Acceptance of Terms",
      content: "By accessing the Prixgen platform or commissioning our engineering services, you acknowledge that you have read, understood, and agreed to be bound by these Terms."
    },
    {
      title: "Professional Conduct & Use",
      content: "Clients are expected to maintain professional integrity and provide accurate operational data required for service execution.",
      keyPoints: ["Mutual Accountability", "Global Compliance"]
    }
  ],
  lastUpdated: "May 2026",
  referenceId: "PXG-TOS-2026-V1",
  seo: {
    title: "Terms of Service | Prixgen Enterprise",
    metaDesc: "The legal framework for our enterprise partnerships and engineering excellence.",
    keywords: ["Terms of Service", "Legal Framework", "Service Level Agreement", "ERP Service Terms"]
  }
};

export const careersData: CareersPageData = {
  title: "Careers",
  subtitle: "Join an elite team of engineers, architects, and consultants. We are building the future of industrial intelligence.",
  badge: "Global Engineering",
  openings: [
    { title: 'Senior Python/Odoo Developer', type: 'Full-time', location: 'Mysuru', team: 'Engineering' },
    { title: 'Functional Consultant (ERP)', type: 'Full-time', location: 'Mysuru', team: 'Consulting' },
    { title: 'Technical Project Manager', type: 'Full-time', location: 'Mysuru', team: 'Project Management' },
  ],
  seo: {
    title: "Careers | Build the Future of Industrial Automation",
    metaDesc: "Join an elite team of engineers, architects, and consultants at Prixgen. Current openings for Senior Python/Odoo Developers and Functional Consultants in Mysuru.",
    keywords: ["ERP Careers", "Odoo Developer Jobs", "SAP Consultant Openings", "Tech Jobs Mysuru"]
  }
};

export const blogAuthors: BlogAuthor[] = [
  {
    name: 'Dr. Arvinth P.',
    slug: 'arvinth-p',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    position: 'Chief Technology Officer',
    bio: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Dr. Arvinth is the Chief Technology Officer at Prixgen, specializing in AI-driven industrial automation and enterprise architecture.' }]
      }
    ]
  }
];

export const blogCategories = [
  { title: 'Industrial AI', description: 'Exploring the intersection of artificial intelligence and manufacturing operations.' },
  { title: 'ERP Insights', description: 'Deep dives into Enterprise Resource Planning systems and best practices.' },
  { title: 'Digital Transformation', description: 'Strategies for modernizing legacy industrial workflows.' }
];

export const blogPosts: BlogPost[] = [
  {
    title: 'The Future of Predictive Maintenance in Smart Factories',
    slug: 'predictive-maintenance-smart-factories',
    excerpt: 'How AI-driven predictive maintenance is reducing downtime and optimizing operational efficiency in modern manufacturing.',
    publishedAt: new Date().toISOString(),
    mainImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    author: blogAuthors[0],
    categories: [{ title: 'Industrial AI' }, { title: 'Digital Transformation' }],
    linkedinUrl: 'https://www.linkedin.com/posts/prixgen_predictive-maintenance-industry40-activity-7195415705332514816-uvmE',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'In the rapidly evolving landscape of Industry 5.0, predictive maintenance has emerged as a cornerstone of operational excellence. By leveraging real-time telemetry from IoT sensors and advanced machine learning algorithms, manufacturers can now anticipate equipment failures before they occur.' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Reducing Unplanned Downtime' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Unplanned downtime remains one of the most significant costs for industrial enterprises. Predictive models analyze vibration patterns, thermal signatures, and acoustic data to identify anomalies that precede mechanical fatigue. This proactive approach allows maintenance teams to schedule repairs during planned windows, minimizing disruption to the production line.' }]
      }
    ],
    seo: {
      title: 'Predictive Maintenance in Smart Factories | Prixgen Blog',
      metaDesc: 'Learn how AI and IoT are revolutionizing maintenance strategies in modern smart factories.',
      keywords: ['Predictive Maintenance', 'Smart Factory', 'Industry 5.0', 'Industrial AI']
    }
  },
  {
    title: 'Optimizing Supply Chain Resilience with Next-Gen ERP',
    slug: 'optimizing-supply-chain-resilience-erp',
    excerpt: 'Why traditional ERP systems are no longer enough to handle modern supply chain complexities and how next-gen solutions are filling the gap.',
    publishedAt: new Date().toISOString(),
    mainImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    author: blogAuthors[0],
    categories: [{ title: 'ERP Insights' }],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Global supply chains have faced unprecedented challenges in recent years. From geopolitical shifts to logistics bottlenecks, the need for real-time visibility and agile response has never been greater.' }]
      }
    ],
    seo: {
      title: 'Next-Gen ERP for Supply Chain Resilience | Prixgen Blog',
      metaDesc: 'Explore how modern ERP systems provide the visibility and agility needed for resilient global supply chains.',
      keywords: ['ERP Systems', 'Supply Chain Management', 'Logistics Optimization', 'Business Continuity']
    }
  },
  {
    title: "Why ERP Projects Fail (Myth: It's rarely a software problem)",
    slug: 'why-erp-projects-fail-myth-it-s-rarely-a-software-problem',
    excerpt: "Most organisations over-invest in software selection and underestimate what truly drives success: business processes, change management, and long-term planning.",
    publishedAt: new Date('2025-01-01').toISOString(),
    mainImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
    author: blogAuthors[0],
    categories: [{ title: 'ERP Insights' }, { title: 'Digital Transformation' }],
    body: [],
    seo: {
      title: "Why ERP Projects Fail (Myth: It's rarely a software problem) | Prixgen",
      metaDesc: "An ERP implementation failure is almost never a technology issue. Explore the root causes, mistakes to avoid, and how to ensure project success.",
      keywords: ['ERP Failure', 'ERP Implementation', 'Change Management', 'Odoo ERP', 'SAP ERP']
    }
  }
];

export const mockSuccessStories: SuccessStory[] = [
  {
    title: "One Order, One System: Why Your Restaurant's POS, Kitchen, and Accounts Shouldn't Be Strangers",
    slug: "restaurant-pos-kitchen-accounting-integration",
    subtitle: "From the First Order to the Last Bill: A Restaurant's Day with Prixgen & Odoo",
    clientName: "Global Restaurant Operators",
    clientLogo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=200",
    industry: "Food & Beverage",
    mainImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    publishedAt: new Date('2026-07-21').toISOString(),
    metrics: [
      { value: "-9 pts", label: "Food cost gap eliminated" },
      { value: "2 hrs", label: "Month-end close (was 5 days)" },
      { value: "4.2 min", label: "Avg. order time reduction" },
      { value: "100%", label: "Automated tax posting" },
      { value: "3 apps", label: "Aggregators unified" },
      { value: "0", label: "Manual reconciliation steps" }
    ],
    challenge: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Your POS doesn't know your kitchen exists. Your kitchen doesn't know your accountant exists. And by month-end, nobody knows what actually happened on the floor. Most restaurant operators struggle with three or more disconnected systems stitched together with fragile APIs, leading to inventory leakage, delayed reporting, and manual errors." }]
      }
    ],
    features: [
      { title: "Multiple KOTs", description: "Each dish and station gets its own live ticket stream, synced to one Order ID. Dine-in, takeaway, and delivery orders are split into appropriate kitchen screens automatically." },
      { title: "Multiple CDS", description: "Dine-in, takeaway, and delivery runs on separate, perfectly synced customer display screens so orders are never mixed up." },
      { title: "Recipe & BOM Engine", description: "Actual vs. theoretical food cost calculated for every dish, every shift, every outlet to manage food costs." },
      { title: "Central Kitchen Production", description: "Central kitchen production orders auto-triggered directly from POS demand data." },
      { title: "Inventory Integration", description: "Every sale auto-decrements raw material stock, with real-time stock alerts." },
      { title: "Waste Management", description: "A structured waste log by cause and station, cost-journalled to the P&L live." },
      { title: "Takeaway & Delivery", description: "A native takeaway flow plus one unified aggregator hub (Grab, foodpanda, DoorDash, Uber Eats, Zomato, Swiggy) instead of a separate tablet per platform." },
      { title: "Integrated Accounts", description: "Every POS close auto-posts to Odoo Accounting, with tax fully automated." }
    ],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Here's the part that should make every restaurant operator a little uncomfortable: this isn't three vendors stitched together with APIs and prayer. It's one Odoo backbone, engineered end-to-end — not duct-taped from a POS tool, an inventory tool, and an accounting tool that were never built to talk to each other in the first place." }]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: "Built for Any Market, Any Format" }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Whether you're running a single outlet, a multi-brand cloud kitchen, a QSR chain, or central kitchen production for a large group, the underlying question is the same: Is your restaurant's tech stack actually one system, or multiple systems pretending to talk to each other? With Prixgen and Odoo, we provide a unified core for your entire food business." }]
      }
    ],
    seo: {
      title: "Restaurant Odoo ERP Integration Success Story | Prixgen",
      metaDesc: "Read how Prixgen engineered Odoo to integrate POS, Kitchen, and Accounts for major restaurant operators, cutting month-end close to 2 hours.",
      keywords: ["Restaurant ERP", "Odoo Restaurant POS", "Kitchen Display System", "Food & Beverage ERP", "Odoo Integration"]
    }
  }
];
