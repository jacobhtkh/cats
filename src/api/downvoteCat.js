import AxiosInstance from './request';

const downvoteCat = async (imageId) => {
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
      value: 0,
    };

    const res = await AxiosInstance.post('/votes', data, options);
    console.log('downvoted cat');
    return res;
  } catch (err) {
    console.log('failed at downvoting cat');

    throw err;
  }
};

export default downvoteCat;
