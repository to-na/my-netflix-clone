import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavBar.module.css';

const NavBar = (props) => {
  const { username } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

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
                <Link href="/login">
                  <a className={styles.linkName}>sign out</a>
                </Link>
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
