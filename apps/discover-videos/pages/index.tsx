import Head from 'next/head';
import Banner from '../components/Banner';
import NavBar from '../components/Navbar';
import styles from './index.module.css';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="Ryuichi" />
      <Banner
        title="Clifford The Red Dog"
        subTitle="a very cute dog"
        imgUrl="/clifford.webp"
      />
    </div>
  );
}

export default Index;
