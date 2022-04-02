import { useRouter } from 'next/router';
import Modal from 'react-modal';
import styles from './Video.module.css';

import clsx from 'classnames';

import Navbar from '../../components/NavBar';
import { getYoutubeVideoById } from '../../lib/videos';
import Like from '../../components/icons/LikeIcon';
import Dislike from '../../components/icons/DislikeIcon';
import { useState } from 'react';
Modal.setAppElement('#__next');

export const getStaticProps = async (context) => {
  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId);
  return {
    props: {
      video: videoArray.length ? videoArray[0] : {},
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const listOfVideos = ['NOjmN-ZHlBQ', 'pRG7FJobkv4', 'LfephiFN76E'];
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));
  return { paths, fallback: 'blocking' };
};
const Video = ({ video }) => {
  const router = useRouter();
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);
  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;
  const handleToggleDislike = () => {
    setToggleDislike(!toggleDislike);
    setToggleLike(toggleDislike);
    console.log('dislike');
  };
  const handleToggleLike = () => {
    setToggleLike(!toggleLike);
    setToggleDislike(toggleLike);
    console.log('like');
  };
  return (
    <div className={styles.container}>
      <Navbar />
      Video {router.query.videoId}
      <Modal
        isOpen={true}
        contentLabel="Watch Video"
        onRequestClose={() => router.back}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="player"
          className={styles.videoPlayer}
          width="100%"
          height="360"
          src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&control=0&rel=1`}
          frameBorder="0"
        />
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <Dislike selected={toggleDislike} />
            </div>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count:</span>
                <span className={styles.channelTitle}> {viewCount} </span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
