export const revalidate = 0;
import { getHomeData, getPosts, getCareersData } from '@/lib/data';
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
  const posts = await getPosts();
  const careersData = await getCareersData();
  
  return (
    <HomeClientPage 
      homeData={homeData} 
      latestPost={posts && posts.length > 0 ? posts[0] : null}
      latestCareer={careersData?.openings && careersData.openings.length > 0 ? careersData.openings[0] : null}
    />
  );
}
