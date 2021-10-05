import AxiosInstance from './request';

const getFavourites = async () => {
  try {
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY || process.env.CAT_API_KEY,
    };

    const options = {
      headers,
    };

    const res = await AxiosInstance.get('/favourites', options);

    console.log('get favourites succeeded');
    return res;
  } catch (err) {
    console.log('get favourites failed');

    throw err;
  }
};

export default getFavourites;
