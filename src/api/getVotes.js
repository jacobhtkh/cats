import AxiosInstance from './request';

const getVotes = async () => {
  try {
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY,
    };
    const params = {
      limit: 1000000,
    };

    const options = {
      headers,
      params,
    };

    const res = await AxiosInstance.get('/votes', options);

    console.log('get votes succeeded');
    return res;
  } catch (err) {
    console.log('get votes failed');

    throw err;
  }
};

export default getVotes;
