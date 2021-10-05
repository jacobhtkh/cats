import AxiosInstance from './request';

const uploadCat = async (catImageFile) => {
  try {
    const formData = new FormData();
    const headers = {
      'x-api-key': process.env.REACT_APP_CAT_API_KEY,
    };

    const options = {
      headers,
    };

    formData.append('file', catImageFile);
    const res = await AxiosInstance.post('/images/upload', formData, options);
    console.log('upload succeeded');
    return res;
  } catch (err) {
    console.log('upload failed');

    throw err;
  }
};

export default uploadCat;
