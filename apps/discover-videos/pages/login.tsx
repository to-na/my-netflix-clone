import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { magic } from '../lib/magicClient';
import styles from './Login.module.css';
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  const handleOnChangeEmail = (event) => {
    console.log({ event });
    setUserMsg('');
    setEmail(event.target.value);
  };
  const handleLoginWithEmail = async (event) => {
    event.preventDefault();
    console.log('hi button');
    if (!!email) {
      if (email === 'tonanatz.sh@gmail.com') {
        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log({ didToken });
        } catch (error) {
          // Handle errors if required!
          console.error('something went wrong', error);
        }
        console.log('route to dashboard');
        router.push('/');
      } else {
        console.log('something wrong');
        setIsLoading(false);
      }
    } else {
      setUserMsg('Please enter valid email');
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>My Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src="/netflix.svg"
                alt="Netflix Logo"
                width="111px"
                height="30px"
              />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signInHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email Address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {isLoading ? 'Loading..' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
