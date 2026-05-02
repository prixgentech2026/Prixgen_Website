import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

function getEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    return Object.fromEntries(
      envContent.split('\n')
        .filter(line => line.includes('='))
        .map(line => {
          const [key, ...val] = line.split('=');
          return [key.trim(), val.join('=').trim().replace(/"/g, '').replace(/'/g, '')];
        })
    );
  } catch (err) {
    console.error('Error reading .env.local:', err.message);
    process.exit(1);
  }
}

const env = getEnv();
const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: env.SANITY_API_TOKEN,
  apiVersion: '2024-04-30',
  useCdn: false,
});

const aboutData = {
  _type: 'about',
  _id: 'about-us',
  title: 'Who We Are',
  subtitle: 'About Our Company',
  content: [
    {
      _type: 'block',
      _key: 'b1',
      children: [{ _type: 'span', _key: 's1', text: "Prixgen Tech Solutions is an Indian initiative, pioneered with the idea of providing the Enterprise Solutions through IoT, BI & Analytics. Prixgen ensures the best ROI for companies and streamline the business processes. Prixgen is run by IT professionals with a combined experience of over 30+ years in the ERP implementations and consultancy services, and over a decade experience in IoT development and automation." }],
      markDefs: [],
      style: 'normal',
    },
    {
      _type: 'block',
      _key: 'b2',
      children: [{ _type: 'span', _key: 's2', text: "We are a specialized information technology corporation company with over a decade of experience that allows it to bring high-impact solutions to industry leaders around the world." }],
      markDefs: [],
      style: 'blockquote',
    },
    {
      _type: 'block',
      _key: 'b3',
      children: [{ _type: 'span', _key: 's3', text: "Prixgen is an IT consulting company enabling companies and organizations to benefit from the opportunities of the connected world and to enhance their competitiveness. Combining technical edge and strong business insight we provide innovative and sustainable solutions. Prixgen was started by promoting and providing quality solutions to industries, educating them on know-how and best practices across the domain." }],
      markDefs: [],
      style: 'normal',
    },
    {
      _type: 'block',
      _key: 'b4',
      children: [{ _type: 'span', _key: 's4', text: "A company’s technology organization should support its business strategy, not constrain it. Prixgen focuses first on the strategic needs of our clients’ businesses to determine the technology capabilities needed to support their long-term goals. We help companies confidently address technology-related decisions and ensure their IT organizations and operating models are agile and effective." }],
      markDefs: [],
      style: 'normal',
    }
  ],
  vision: "Build enterprise solutions, experience the modern technology",
  mission: "PRIXGEN being enterprise information solutions provider, understands the client business processes and meticulously planning the business solutions by augmenting and crafting a niche IoT platform for the customers.",
  stats: [
    { _key: 's1', label: "Combined ERP Experience", value: "30+", suffix: " Years" },
    { _key: 's2', label: "Worldwide Clients", value: "40+", suffix: "" },
    { _key: 's3', label: "IoT & Automation", value: "10+", suffix: " Years" },
    { _key: 's4', label: "Expert Support", value: "24/7", suffix: "" }
  ],
  whyChooseUs: [
    {
      _key: 'w1',
      title: "Assured Services",
      description: "We are always at the top in terms of client satisfaction.",
      icon: "ShieldCheck"
    },
    {
      _key: 'w2',
      title: "Future-Proofed Innovation",
      description: "Next-Gen Technology provider of uttermost tactics for your digital journey.",
      icon: "Cpu"
    },
    {
      _key: 'w3',
      title: "Expert Engineering",
      description: "Highly skilled developers with excellent engineering skills and experience in using the latest software technologies.",
      icon: "Code2"
    }
  ],
  whyChooseUsIntro: "We have highly skilled developers with excellent engineering skills and experience in using the latest software technologies. We are proud that we are still supporting our very first business client.",
  experienceSection: {
    title: "15+ Years Experience",
    description: "Prixgen create solutions that allow you to do it all in an easy and seamless manner. Be with us to grow together.",
    points: [
      "Dedicated teams",
      "True partners",
      "Focus on innovation",
      "Global know-how"
    ]
  },
  seo: {
    title: "About Prixgen | Leading ERP & IoT Solutions Provider",
    metaDesc: "Learn about Prixgen Tech Solutions, an Indian initiative providing Enterprise Solutions through IoT, BI & Analytics with 30+ years of ERP experience."
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
