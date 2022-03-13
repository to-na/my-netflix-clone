import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { magic } from '../lib/magicClient';

import Loading from '../components/Loading';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, []);
  useEffect(() => {
    const handleComlete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeComplete', handleComlete);
    router.events.on('routeChangeError', handleComlete);

    return () => {
      router.events.off('routeChangeComplete', handleComlete);
      router.events.off('routeChangeError', handleComlete);
    };
  }, [router]);
  return (
    <>
      <Head>
        <title>Welcome to discover-videos!</title>
      </Head>
      <main className="app">
        {isLoading ? <Loading /> : <Component {...pageProps} />}
      </main>
    </>
  );
}

export default CustomApp;
