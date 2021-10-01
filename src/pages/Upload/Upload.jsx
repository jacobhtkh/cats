import React, { useState } from 'react';
import {
  Box,
  Grid,
  InputBase,
  Typography,
  useTheme,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import UploadIcon from '@mui/icons-material/Upload';

const Upload = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  const imageSelectedHandler = (event) => {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const theme = useTheme();

  const useStyles = makeStyles({
    uploadTitle: {
      fontWeight: 600,
      fontSize: '2.2rem !important',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem !important',
      },
    },
    previewImage: {
      width: 360,
      height: 360,
      [theme.breakpoints.down('sm')]: {
        width: 240,
        height: 240,
      },
    },
    browseButton: {
      width: '100%',
    },
  });

  const classes = useStyles();

  return (
    <Box paddingX={{ xs: 3, md: 4 }} mt={2.5}>
      <Grid container>
        <Grid
          item
          width='100%'
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Typography className={classes.uploadTitle}>
            Upload new cat image
          </Typography>
          <Box pt={0.5}>
            {previewImage && (
              <img
                src={previewImage}
                alt='Upload Preview'
                className={classes.previewImage}
              />
            )}
            <Box paddingTop='2px'>
              <Typography
                style={{
                  textAlign: 'center',
                  fontSize: selectedImage ? '0.875rem' : '1rem',
                }}
              >
                {selectedImage ? selectedImage.name : 'Select an image'}
              </Typography>
            </Box>

            {!previewImage ? (
              <label htmlFor='contained-button-image-file'>
                <InputBase
                  type='file'
                  id='contained-button-image-file'
                  inputProps={{ accept: 'image/*' }}
                  onChange={imageSelectedHandler}
                  style={{ display: 'none' }}
                />
                <Box paddingTop={1} display='flex' justifyContent='center'>
                  <Button
                    variant='contained'
                    component='span'
                    disableRipple
                    className={classes.browseButton}
                    style={{ textTransform: 'none' }}
                  >
                    Browse
                  </Button>
                </Box>
              </label>
            ) : (
              <Box pt={1.25} display='flex' flexDirection='column'>
                <LoadingButton
                  startIcon={<UploadIcon />}
                  variant='contained'
                  disableRipple
                  style={{ textTransform: 'none' }}
                >
                  Upload
                </LoadingButton>
                <label htmlFor='outlined-button-image-file'>
                  <InputBase
                    type='file'
                    id='outlined-button-image-file'
                    inputProps={{ accept: 'image/*' }}
                    onChange={imageSelectedHandler}
                    style={{ display: 'none' }}
                  />
                  <Box paddingTop={1.5}>
                    <Button
                      variant='outlined'
                      component='span'
                      disableRipple
                      className={classes.browseButton}
                      style={{ textTransform: 'none' }}
                    >
                      Browse
                    </Button>
                  </Box>
                </label>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Upload;
