import AxiosInstance from './request';

const upvoteCat = async (imageId) => {
  try {
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY || process.env.CAT_API_KEY,
      'Content-Type': 'application/json',
    };

    const options = {
      headers,
    };

    const data = {
      image_id: imageId,
      value: 1,
    };

    const res = await AxiosInstance.post('/votes', data, options);
    console.log('upvoted cat');
    return res;
  } catch (err) {
    console.log('failed at upvoting cat');

    throw err;
  }
};

export default upvoteCat;
