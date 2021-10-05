import AxiosInstance from './request';

const favouriteCat = async (imageId) => {
  try {
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY,
      'Content-Type': 'application/json',
    };

    const options = {
      headers,
    };

    const data = {
      image_id: imageId,
    };

    const res = await AxiosInstance.post('/favourites', data, options);
    console.log('favourited cat');
    return res;
  } catch (err) {
    console.log('failed at favouriting cat');

    throw err;
  }
};

export default favouriteCat;
