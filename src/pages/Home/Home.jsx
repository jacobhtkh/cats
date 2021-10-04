import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import getCats from '../../api/getCats';
import { placeholderImgUrl } from '../../constants/constants';

const HomePage = () => {
  const [catData, setCatData] = useState();

  const getCatData = async () => {
    try {
      const catDataRes = await getCats();
      setCatData(catDataRes);
      console.log(catDataRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCatData();
  }, []);

  const theme = useTheme();

  const useStyles = makeStyles({
    catsTitle: {
      fontWeight: 600,
      fontSize: '2.2rem !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem !important',
      },
    },
  });

  const classes = useStyles();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box paddingX={{ xs: 3, md: 4 }} mt={2.5}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.catsTitle}>Cats</Typography>
          <ImageList
            gap={mdDown && !smDown ? 40 : mdDown && smDown ? 30 : 50}
            cols={mdDown && !smDown ? 3 : mdDown && smDown ? 2 : 4}
          >
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
            <ImageListItem>
              <img
                src={catData ? catData.data[0].url : placeholderImgUrl}
                alt='Cat'
                loading='lazy'
              />
            </ImageListItem>
          </ImageList>
        </Grid>
        {/* <Grid container>
          <Grid item xs={6} md={3}>
            <img
              src={catData?.data[0].url}
              alt='Cat'
              loading='lazy'
              width='200px'
              height='200px'
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <img
              src={catData?.data[0].url}
              alt='Cat'
              loading='lazy'
              width='200px'
              height='200px'
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <img
              src={catData?.data[0].url}
              alt='Cat'
              loading='lazy'
              width='200px'
              height='200px'
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <img
              src={catData?.data[0].url}
              alt='Cat'
              loading='lazy'
              width='200px'
              height='200px'
            />
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default HomePage;
