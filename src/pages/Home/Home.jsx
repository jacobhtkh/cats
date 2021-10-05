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
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import {
  downvoteCat,
  favouriteCat,
  getCats,
  getFavourites,
  getVotes,
  unfavouriteCat,
  upvoteCat,
} from '../../api';

const HomePage = () => {
  const [catData, setCatData] = useState();
  const [favouritesData, setFavouritesData] = useState();
  const [votesData, setVotesData] = useState();

  const getCatData = async () => {
    try {
      const catDataRes = await getCats();
      setCatData(catDataRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFavouritesData = async () => {
    try {
      const favouritesDataRes = await getFavourites();
      setFavouritesData(favouritesDataRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVotesData = async () => {
    try {
      const votesDataRes = await getVotes();
      setVotesData(votesDataRes.data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    getCatData();

    getFavouritesData();

    getVotesData();
  }, []);

  const favouriteClicked = async (imageId) => {
    try {
      await favouriteCat(imageId);
      await getFavouritesData();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const unfavouriteClicked = async (favouriteId) => {
    try {
      await unfavouriteCat(favouriteId);
      await getFavouritesData();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const upvoteClicked = async (imageId) => {
    try {
      await upvoteCat(imageId);
      await getVotesData();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const downvoteClicked = async (imageId) => {
    try {
      await downvoteCat(imageId);
      await getVotesData();
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const theme = useTheme();

  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box paddingX={{ xs: 3, md: 4 }} mt={2}>
      <Grid container>
        <Grid item xs={12}>
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

                const imageVotes =
                  votesData && votesData.filter((vote) => vote.image_id === id);

                const upvotes =
                  votesData && imageVotes.filter((vote) => vote.value === 1);

                const numOfUpvotes = upvotes && upvotes.length;

                const downvotes =
                  votesData && imageVotes.filter((vote) => vote.value === 0);

                const numOfDownvotes = downvotes && downvotes.length;

                const score = numOfUpvotes - numOfDownvotes;

                return (
                  <ImageListItem key={url}>
                    <img
                      src={url}
                      alt='Cat'
                      loading='lazy'
                      style={{
                        objectFit: 'contain',
                        borderRadius: '5px 5px 0px 0px',
                      }}
                    />
                    <ImageListItemBar
                      sx={{
                        background: 'white',
                        border: '1px solid #A9A9A9',
                        borderRadius: '0px 0px 5px 5px',
                        borderTop: 'none',
                        display: 'flex',
                        alignItems: 'baseline',
                        paddingX: '8px',
                      }}
                      position='below'
                      actionPosition='right'
                      actionIcon={
                        <IconButton
                          sx={{
                            color: isFavCat ? 'red' : 'black',
                          }}
                          aria-label='favourite cat'
                          onClick={() => {
                            isFavCat
                              ? unfavouriteClicked(favouriteId)
                              : favouriteClicked(id);
                          }}
                        >
                          {isFavCat ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                      }
                      title={
                        <>
                          <IconButton
                            sx={{ color: 'black' }}
                            onClick={() => {
                              downvoteClicked(id);
                            }}
                          >
                            <ThumbDownAltIcon />
                          </IconButton>
                          <IconButton
                            sx={{ color: 'black', marginLeft: '3px' }}
                            onClick={() => {
                              upvoteClicked(id);
                            }}
                          >
                            <ThumbUpAltIcon />
                          </IconButton>
                        </>
                      }
                      subtitle={
                        <Typography
                          style={{
                            paddingLeft: 8,
                            fontWeight: 600,
                            fontSize: '0.9375rem',
                            display: 'flex',
                          }}
                        >
                          Score:&nbsp;
                          <Typography style={{ fontSize: '0.9375rem' }}>
                            {score}
                          </Typography>
                        </Typography>
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
