import { homeData } from '@/lib/data';
import HomeClientPage from '@/components/templates/home-client-page';

export async function generateMetadata() {
  return {
    title: homeData.seo.title,
    description: homeData.seo.metaDesc,
  };
}

export default function HomePage() {
  return <HomeClientPage homeData={homeData} />;
}
