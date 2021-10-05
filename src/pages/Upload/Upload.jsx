import React, { useState } from 'react';
import {
  Box,
  Grid,
  InputBase,
  Typography,
  useTheme,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LoadingButton } from '@mui/lab';
import UploadIcon from '@mui/icons-material/Upload';
import { uploadCat } from '../../api';
import { Redirect } from 'react-router';

const Upload = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const imageSelectedHandler = (event) => {
    seterror('');
    setIsUploaded(false);
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const imageUploadHandler = async () => {
    setLoading(true);
    try {
      await uploadCat(selectedImage);
      setIsUploaded(true);
    } catch (err) {
      seterror(err.response.data.message);
    }
    setLoading(false);
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
      objectFit: 'contain',
      width: 360,
      [theme.breakpoints.down('sm')]: {
        width: 240,
      },
    },
    browseButton: {
      width: '100%',
    },
  });

  const classes = useStyles();

  if (isUploaded) return <Redirect to='/' />;

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
              <>
                <Box mt={1.25} display='flex' flexDirection='column'>
                  <LoadingButton
                    startIcon={<UploadIcon />}
                    loadingIndicator={
                      <>
                        <Box
                          display='flex'
                          alignItems='center'
                          whiteSpace='nowrap'
                        >
                          <CircularProgress
                            color='inherit'
                            size={16}
                            style={{ marginRight: 8 }}
                          />
                          Uploading {selectedImage && selectedImage.name}
                        </Box>
                      </>
                    }
                    variant='contained'
                    onClick={imageUploadHandler}
                    loading={loading}
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
                  {error && (
                    <Box py={1.5} width={{ xs: 240, sm: '100%' }}>
                      <Alert severity='error'>
                        <AlertTitle>Error</AlertTitle>
                        <Box>{error}</Box>
                        <Box pt={0.5}>
                          Select an image showing a cat and try again
                        </Box>
                      </Alert>
                    </Box>
                  )}
                  {isUploaded && (
                    <Box py={1.5} width={{ xs: 240, sm: '100%' }}>
                      <Alert severity='success'>
                        Uploaded {selectedImage && selectedImage.name}
                      </Alert>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Upload;
