import { getHomeData } from '@/lib/data';
import HomeClientPage from '@/components/templates/home-client-page';

export async function generateMetadata() {
  const homeData = await getHomeData();
  return {
    title: homeData.seo.title,
    description: homeData.seo.metaDesc,
  };
}

export default async function HomePage() {
  const homeData = await getHomeData();
  return <HomeClientPage homeData={homeData} />;
}
