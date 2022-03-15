import Head from 'next/head';
import Banner from '../components/Banner';
import NavBar from '../components/NavBar';

import styles from './index.module.css';
import SectionCards from '../components/SectionCards';

import { getVideos, getPopularVideos } from '../lib/videos';
import { startFetchMyQuery } from '../lib/db/hasura';

export async function getServerSideProps() {
  const disneyVideos = await getVideos('disney%20trailer');
  const productivityVideos = await getVideos('Produtivity');
  const travelVideos = await getVideos('Travel');
  const popularVideos = await getPopularVideos();
  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
}
export function Index({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  startFetchMyQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford The Red Dog"
          subTitle="a very cute dog"
          imgUrl="/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}

export default Index;
