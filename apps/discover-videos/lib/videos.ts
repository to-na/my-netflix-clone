import videoData from '../data/videos.json';

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = 'www.googleapis.com/youtube/v3';
  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );

  return await response.json();
};
export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT === 'true';
    const data = isDev ? videoData : await fetchVideos(url);
    if (data?.error) {
      console.error('YouTube API Error', data.error);
      return [];
    }
    return data?.items.map((item) => {
      const snippet = item.snippet;
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        id: item?.id?.videoId || item.id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error('something went wrong', error);
    return [];
  }
};

export const getVideos = async (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = async () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=JP&videoCategoryId=15`;
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = async (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};
