import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const Header = () => {
  const theme = useTheme();

  const useStyles = makeStyles({
    link: {
      color: 'inherit',
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
      fontSize: '1.35rem !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem !important',
      },
    },
  });

  const classes = useStyles();

  return (
    <header>
      <Box
        paddingY={2}
        paddingX={{ xs: 3, md: 4 }}
        display='flex'
        alignItems='center'
      >
        <Link className={classes.link} to='/'>
          <Typography className={classes.catsLogo}>Cats</Typography>
        </Link>
        <Box ml={10}>
          <Link className={classes.link} to='/upload'>
            <Typography className={classes.upload}>Upload</Typography>
          </Link>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
