import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  useTheme,
  CircularProgress,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { makeStyles } from '@mui/styles';
import getCats from '../../api/getCats';
import favouriteCat from '../../api/favouriteCat';
import getFavourites from '../../api/getFavourites';
import unfavouriteCat from '../../api/unfavouriteCat';

const HomePage = () => {
  const [catData, setCatData] = useState();
  const [catFavourited, setCatFavourited] = useState(false);
  const [favouritesData, setFavouritesData] = useState();

  const getCatData = async () => {
    try {
      const catDataRes = await getCats();
      setCatData(catDataRes.data);
      console.log(catDataRes);
    } catch (err) {
      console.log(err);
    }
  };

  const getFavouritesData = async () => {
    try {
      const favouritesDataRes = await getFavourites();
      console.log(favouritesDataRes);
      setFavouritesData(favouritesDataRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCatData();

    getFavouritesData();
  }, []);

  const favouriteClicked = async (imageId) => {
    console.log(imageId);
    try {
      const favouritedCatResponse = await favouriteCat(imageId);
      await getFavouritesData();
      // setCatFavourited(true);
      console.log(favouritedCatResponse);
    } catch (err) {
      // setCatFavourited(true);
      console.log(err.response.data.message);
    }
  };

  const unfavouriteClicked = async (favouriteId) => {
    try {
      const unfavouritedCatResponse = await unfavouriteCat(favouriteId);
      await getFavouritesData();
      console.log(unfavouritedCatResponse);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

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
    <Box paddingX={{ xs: 3, md: 4 }} mt={2}>
      <Grid container>
        <Grid item xs={12}>
          {/* <Typography className={classes.catsTitle}>Cats</Typography> */}
          {catData ? (
            <ImageList
              gap={mdDown && !smDown ? 40 : mdDown && smDown ? 30 : 50}
              cols={mdDown && !smDown ? 2 : mdDown && smDown ? 1 : 4}
            >
              {catData.map(({ url, id }) => {
                const favCatData =
                  favouritesData &&
                  favouritesData.find((favCat) => favCat.image_id === id);

                const isFavCat = favCatData ? true : false;

                const favouriteId = isFavCat && favCatData.id;

                console.log('isFavCat', isFavCat);
                console.log('favCatData', favCatData);
                console.log('favouriteCatId', favouriteId);

                return (
                  <ImageListItem key={url}>
                    <img
                      src={url}
                      alt='Cat'
                      loading='lazy'
                      style={{ objectFit: 'contain' }}
                    />
                    <ImageListItemBar
                      sx={{
                        background: 'none',
                      }}
                      position='below'
                      actionPosition='right'
                      actionIcon={
                        <IconButton
                          sx={{ color: isFavCat ? 'red' : 'black' }}
                          aria-label='favourite cat'
                          disableRipple
                          onClick={() => {
                            isFavCat
                              ? unfavouriteClicked(favouriteId)
                              : favouriteClicked(id);
                          }}
                        >
                          {isFavCat ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          ) : (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              width='100%'
              height='60vh'
            >
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
