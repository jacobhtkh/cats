import AxiosInstance from './request';

const unfavouriteCat = async (favouriteId) => {
  try {
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY,
    };

    const options = {
      headers,
    };

    const res = await AxiosInstance.delete(
      `/favourites/${favouriteId}`,
      options
    );

    console.log('cat successfully unfavourited');
    return res;
  } catch (err) {
    console.log('failed to unfavourite cat');

    throw err;
  }
};

export default unfavouriteCat;
