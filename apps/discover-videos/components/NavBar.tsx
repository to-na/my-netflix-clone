import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { magic } from '../lib/magicClient';
import styles from './NavBar.module.css';
import { route } from 'next/dist/server/router';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(async () => {
    try {
      const { email } = await magic.user.getMetadata();
      if (email) {
        console.log(email);
        setUsername(email);
      }
    } catch (error) {
      console.log({ error });
    }
  });
  const handleOnClickHome = (event) => {
    event.preventDefault();
    router.push('/');
  };

  const handleOnClickMyList = (event) => {
    event.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = (event) => {
    event.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (event) => {
    event.preventDefault();
    try {
      await magic.user.logout();
      console.log(magic.user.isLoggedIn);
      router.push('/login');
    } catch (error) {
      console.error('sign out error', error);
      router.push('/login');
      // router.push('/login');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/expand_more.svg"
                alt="Expand more"
                width="24px"
                height="24px"
              />
            </button>
          </div>
          {showDropdown && (
            <div className={styles.navDropdown}>
              <div>
                <a className={styles.linkName} onClick={handleSignOut}>
                  sign out
                </a>
                <div className={styles.lineWrapper} />
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
