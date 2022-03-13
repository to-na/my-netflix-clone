import Link from 'next/link';

import Card from './Card';
import styles from './SectionCards.module.css';

const SectionCards = (props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos?.map((video, idx) => (
          <Link href={`/video/${video.id}`} key={idx}>
            <a>
              <Card key={idx} {...video} size={size} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default SectionCards;
