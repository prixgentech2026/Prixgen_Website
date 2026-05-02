import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-04-30',
  useCdn: false,
});

const aboutData = {
  _type: 'about',
  _id: 'about-us',
  title: "Global Architects of Enterprise Intelligence.",
  subtitle: "Pioneering enterprise intelligence through a specialized fusion of IoT, BI, and Analytics.",
  content: [
    {
      _type: 'block',
      _key: 'b1',
      children: [{ _type: 'span', _key: 's1', text: "Prixgen ensures the best ROI for companies by streamlining business processes. Driven by the idea of providing innovative solutions through ERP, IIoT, and AI, we are an elite team of IT professionals with over 30+ years of combined experience in enterprise implementations." }]
    },
    {
      _type: 'block',
      _key: 'b2',
      children: [{ _type: 'span', _key: 's2', text: "We don't just deploy software; we future-proof your digital journey. Our methodology is rooted in architectural integrity and zero-tolerance for operational friction." }]
    }
  ],
  vision: "To be the global benchmark for operational intelligence and industrial digital transformation.",
  mission: "Empowering enterprises through unified ecosystems that turn data into decisive competitive advantage.",
  stats: [
    { _key: 's1', label: "Years Experience", value: "30+" },
    { _key: 's2', label: "Implementations", value: "500+" },
    { _key: 's3', label: "Architect Team", value: "Elite" },
    { _key: 's4', label: "Odoo Partner", value: "Gold" },
  ],
  whyChooseUsIntro: "We provide an uncompromising technical edge for industrial leaders who demand reliability and scale.",
  whyChooseUs: [
    {
      _key: 'w1',
      title: "Assured Services",
      description: "Zero-latency support and multi-layered quality assurance for your entire enterprise stack.",
      icon: "ShieldCheck"
    },
    {
      _key: 'w2',
      title: "Future-Proofed Innovation",
      description: "Architectures designed to evolve with AI, machine learning, and global supply chain shifts.",
      icon: "Cpu"
    },
    {
      _key: 'w3',
      title: "Expert Engineering",
      description: "Clean code and modular scalability from a team with decades of industrial expertise.",
      icon: "Code2"
    }
  ],
  experienceSection: {
    title: "15 Years of Industrial Excellence",
    description: "Our journey has been defined by rescuing failed implementations and architecting unified global ecosystems.",
    points: [
      "Certified Gold Partners for Odoo and SAP Business One.",
      "Proprietary AI and IIoT telemetry extraction models.",
      "Global delivery centers across APAC and EMEA."
    ]
  },
  seo: {
    title: "About Us | Global Architects of Enterprise Intelligence",
    metaDesc: "Prixgen is an elite team of IT professionals with over 30+ years of combined experience in ERP, IIoT, and AI implementations.",
  }
};

async function migrate() {
  try {
    console.log('--- PRIXGEN UPDATED MIGRATION ---');
    console.log('Pushing full structure from whoweare_prixgen.md...');
    const result = await client.createOrReplace(aboutData);
    console.log('\nSUCCESS! Data flow structure is now complete in Sanity.');
  } catch (err) {
    console.error('\nMIGRATION FAILED:', err.message);
    process.exit(1);
  }
}

migrate();
