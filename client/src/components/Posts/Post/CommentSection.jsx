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
    if (!comment.trim()) return;
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
        <Box sx={{ width: '100%', mt: 1, display: 'flex', alignItems: 'center' }}>
          <TextField 
            fullWidth 
            size="small"
            variant="outlined" 
            placeholder="Write a comment..." 
            multiline 
            maxRows={4}
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (comment.trim()) handleClick();
              }
            }}
            autoFocus
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                paddingRight: '4px'
              } 
            }}
            InputProps={{
              endAdornment: (
                <Button 
                  disabled={!comment.trim()} 
                  onClick={handleClick}
                  sx={{ borderRadius: '15px', textTransform: 'none', fontWeight: 'bold' }}
                >
                  Post
                </Button>
              )
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default CommentSection;
