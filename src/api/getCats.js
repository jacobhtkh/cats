import AxiosInstance from './request';

const getCats = async () => {
  try {
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY || process.env.CAT_API_KEY,
    };
    const params = {
      limit: 100,
    };

    const options = {
      headers,
      params,
    };

    const res = await AxiosInstance.get('/images', options);

    console.log('get cats succeeded');
    return res;
  } catch (err) {
    console.log('get cats failed');

    throw err;
  }
};

export default getCats;
