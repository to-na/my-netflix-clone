import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './Login.module.css';
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');

  const handleOnChangeEmail = (event) => {
    console.log({ event });
    setUserMsg('');
    setEmail(event.target.value);
  };
  const handleLoginWithEmail = (event) => {
    event.preventDefault();

    console.log('hi button');
    if (!!email) {
      if (email === 'tonanatz.sh@gmail.com') {
        console.log('route to dashboard');
        router.push('/');
      } else {
        console.log('something wrong');
      }
    } else {
      setUserMsg('Please enter valid email');
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
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
