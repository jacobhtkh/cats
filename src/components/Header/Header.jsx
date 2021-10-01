import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const Header = () => {
  const theme = useTheme();

  const useStyles = makeStyles({
    link: {
      color: 'white',
      textDecoration: 'none',
    },
    catsLogo: {
      fontWeight: 500,
      fontSize: '2rem !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem !important',
      },
    },
    upload: {
      fontWeight: 500,
      fontSize: '1.2rem !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem !important',
      },
    },
  });

  const classes = useStyles();

  return (
    <header>
      <Box
        paddingY={1.5}
        paddingX={{ xs: 3, md: 4 }}
        display='flex'
        alignItems='center'
        borderBottom='1px solid rgba(0, 0, 0, 0.2)'
        backgroundColor='#282828'
      >
        <Link className={classes.link} to='/'>
          <Typography className={classes.catsLogo}>Cats</Typography>
        </Link>
        <Box ml={{ xs: 5, md: 10 }}>
          <Link className={classes.link} to='/upload'>
            <Typography className={classes.upload}>Upload</Typography>
          </Link>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
