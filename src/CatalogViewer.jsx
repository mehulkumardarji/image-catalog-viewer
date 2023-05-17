import React from 'react'
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { PlayArrow, Pause, NavigateNext, NavigateBefore } from '@mui/icons-material';

const catalogData = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'Image 1',
    description: 'Description of Image 1',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1648221014464-67f478e28298?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80',
    title: 'Image 2',
    description: 'Description of Image 2',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1684239429936-12fa8bd1d4fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'Image 3',
    description: 'Description of Image 2',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1681317474435-91e0f5065abf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'Image 4',
    description: 'Description of Image 2',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1684134219110-6d18efc08205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    title: 'Image 5',
    description: 'Description of Image 2',
  },
  // Add more image objects as needed
];

const CatalogViewer = () => {
  // State for currently displayed image
  const [currentImage, setCurrentImage] = useState(catalogData[0]);

  // State for slideshow play/pause
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect for slideshow timer
  useEffect(() => {
    let slideshowTimer;

    if (isPlaying) {
      slideshowTimer = setInterval(showNextImage, 3000);
    }

    return () => {
      clearInterval(slideshowTimer);
    };
  }, [isPlaying]);

  // Function to show the next image
  const showNextImage = () => {
    const currentIndex = catalogData.findIndex((image) => image.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % catalogData.length;
    setCurrentImage(catalogData[nextIndex]);
  };

  // Function to show the previous image
  const showPreviousImage = () => {
    const currentIndex = catalogData.findIndex((image) => image.id === currentImage.id);
    const previousIndex = (currentIndex - 1 + catalogData.length) % catalogData.length;
    setCurrentImage(catalogData[previousIndex]);
  };

  // Function to handle thumbnail click
  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
    setIsPlaying(false);
  };
 

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia component="img" height="300" image={currentImage.imageUrl} alt={currentImage.title} />
            <CardContent>
              <Typography variant="h5" component="div">
                {currentImage.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentImage.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <IconButton onClick={showPreviousImage}>
              <NavigateBefore />
            </IconButton>
            {isPlaying ? (
              <IconButton onClick={() => setIsPlaying(false)}>
                <Pause />
              </IconButton>
            ) : (
              <IconButton onClick={() => setIsPlaying(true)}>
                <PlayArrow />
              </IconButton>
            )}
            <IconButton onClick={showNextImage}>
              <NavigateNext />
            </IconButton>
          </Box>
          <Box display="flex">
            {catalogData.map((image) => (
              <Box
                key={image.id}
                onClick={() => handleThumbnailClick(image)}
                p={1}
                style={{
                  filter: image.id === currentImage.id ? 'none' : 'grayscale(100%)',
                  cursor: 'pointer',
                }}
              >
                <img src={image.imageUrl} alt={image.title} style={{ width: 50, height: 50 }} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CatalogViewer;