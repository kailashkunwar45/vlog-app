import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../redux/features/postSlice';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', mediaItems: [] });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', mediaItems: [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost({ id: currentId, post: { ...postData, name: user?.result?.name } }));
      clear();
    }
  };

  const handleFileDone = (files) => {
    const mediaFiles = files.map(file => ({
      url: file.base64,
      type: file.type.startsWith('video') ? 'video' : 'image'
    }));
    
    setPostData({ ...postData, mediaItems: mediaFiles });
  };

  if (!user?.result?.name) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} sx={{ mb: 2 }} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} sx={{ mb: 2 }} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} sx={{ mb: 2 }} />
        <Box sx={{ width: '97%', margin: '10px 0' }}>
          <FileBase type="file" multiple={true} onDone={handleFileDone} />
        </Box>
        {postData.mediaItems?.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mb: 2, p: 1 }}>
            {postData.mediaItems.map((file, index) => (
              file.type === 'video' ? (
                <video key={index} src={file.url} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '2px solid red' }} />
              ) : (
                <img key={index} src={file.url} alt="preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
              )
            ))}
          </Box>
        )}
        <Button variant="contained" color="primary" size="large" type="submit" fullWidth sx={{ mb: 1 }}>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
