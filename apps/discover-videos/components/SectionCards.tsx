import Card from './Card';
import styles from './SectionCards.module.css';

const SectionCards = (props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos?.map((video, idx) => (
          <Card key={idx} {...video} size={size} />
        ))}
      </div>
    </section>
  );
};
export default SectionCards;
