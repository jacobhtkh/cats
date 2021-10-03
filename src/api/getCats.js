import AxiosInstance from './request';

const getCats = async () => {
  try {
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY,
    };

    const res = await AxiosInstance.get('/images', {
      headers,
    });

    console.log('get cats succeeded');
    return res;
  } catch (err) {
    console.log('get cats failed');

    throw err;
  }
};

export default getCats;
