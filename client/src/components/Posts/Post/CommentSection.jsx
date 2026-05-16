import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Box, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../../redux/features/postSlice';

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost({ value: finalComment, id: post._id }));
    
    setComments(newComments.payload.comments);
    setComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom variant="h6" sx={{ fontWeight: 700 }}>Comments</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '200px', overflowY: 'auto', mb: 2 }}>
        {comments?.map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle2">
            <strong>{c.split(': ')[0]}</strong>: {c.split(': ')[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </Box>
      {user?.result?.name && (
        <Box sx={{ width: '100%' }}>
          <Typography gutterBottom variant="subtitle1">Write a Comment</Typography>
          <TextField 
            fullWidth 
            rows={2} 
            variant="outlined" 
            label="Comment" 
            multiline 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            sx={{ mb: 1 }}
          />
          <Button fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
            Comment
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
