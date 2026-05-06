import { getHomeData } from '@/lib/data';
import HomeClientPage from '@/components/templates/home-client-page';

export async function generateMetadata() {
  const homeData = await getHomeData();
  return {
    title: homeData?.seo?.title || "Prixgen | Enterprise Application Services",
    description: homeData?.seo?.metaDesc || "Premier enterprise digital transformation and industrial automation partner.",
    keywords: homeData?.seo?.keywords || "ERP, manufacturing, consulting, digital transformation",
  };
}

export default async function HomePage() {
  const homeData = await getHomeData();
  return <HomeClientPage homeData={homeData} />;
}
