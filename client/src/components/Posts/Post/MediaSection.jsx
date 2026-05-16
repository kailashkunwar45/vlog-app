import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MediaSection = ({ post }) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = post?.mediaItems?.length || 0;

  const handleNext = () => setActiveStep((prev) => (prev + 1) % maxSteps);
  const handleBack = () => setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);

  const currentMedia = post?.mediaItems?.[activeStep];

  const handleDoubleClick = () => {
    if (currentMedia?.url) {
      window.open(currentMedia.url, '_blank');
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', pt: '56.25%', overflow: 'hidden', bgcolor: 'black' }}>
      {currentMedia?.type === 'video' ? (
        <video 
          key={currentMedia.url}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} 
          controls 
          src={currentMedia.url} 
          onDoubleClick={handleDoubleClick}
        />
      ) : (
        <img 
          src={currentMedia?.url} 
          alt={`media-${activeStep}`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
          onDoubleClick={handleDoubleClick}
        />
      )}
      {maxSteps > 1 && (
        <>
          <IconButton 
            onClick={handleBack} 
            sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)', zIndex: 10 } }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={handleNext} 
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)', zIndex: 10 } }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
          <Box sx={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.5, zIndex: 5 }}>
            {post.mediaItems.map((_, index) => (
              <Box key={index} sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: index === activeStep ? 'primary.main' : 'rgba(255,255,255,0.5)' }} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MediaSection;
