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
// import { placeholderImgUrl } from '../../constants/constants';
const HomePage = () => {
  const [catData, setCatData] = useState();

  const getCatData = async () => {
    try {
      const catDataRes = await getCats();
      setCatData(catDataRes.data);
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
                return (
                  <ImageListItem key={url}>
                    <img src={url} alt='Cat' loading='lazy' />
                    <ImageListItemBar
                      sx={{
                        background: 'none',
                      }}
                      position='top'
                      actionPosition='right'
                      actionIcon={
                        <IconButton
                          sx={{ color: 'black' }}
                          aria-label='favourite cat'
                          disableRipple
                        >
                          <FavoriteBorderIcon />
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
