import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Avatar, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { updateUser, logout } from '../../redux/features/authSlice';
import { getPosts } from '../../redux/features/postSlice';
import Post from '../Posts/Post/Post';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [formData, setFormData] = useState({ name: user?.result?.name, email: user?.result?.email, imageUrl: user?.result?.imageUrl });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.posts);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: user?.result?._id, formData, navigate }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  if (!user) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper sx={{ p: 3, mt: 8 }}>
          <Typography variant="h6" align="center">Please Sign In to see your profile.</Typography>
        </Paper>
      </Container>
    );
  }

  const myPosts = (posts || []).filter((post) => post.creator === (user?.result?._id || user?.result?.googleId));

  return (
    <Container component="main" maxWidth="lg">
      <Paper sx={{ p: 4, mt: 4, maxWidth: 'md', mx: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar 
            sx={{ width: 100, height: 100, mb: 2, bgcolor: 'secondary.main' }} 
            src={formData.imageUrl}
          >
            {formData.name?.charAt(0)}
          </Avatar>
          <Typography variant="h4" className="clash-heading" sx={{ mb: 3, fontWeight: 800 }}>User Profile</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField 
              name="name" 
              variant="outlined" 
              label="Name" 
              fullWidth 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              sx={{ mb: 2 }} 
            />
            <TextField 
              name="email" 
              variant="outlined" 
              label="Email" 
              fullWidth 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              sx={{ mb: 2 }} 
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Profile Picture</Typography>
              <FileBase 
                type="file" 
                multiple={false} 
                onDone={({ base64 }) => setFormData({ ...formData, imageUrl: base64 })} 
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mb: 2 }}>
              Update Profile
            </Button>
            <Button variant="outlined" color="secondary" fullWidth size="large" onClick={handleLogout}>
              Logout
            </Button>
          </form>
        </Box>
      </Paper>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" className="clash-heading" sx={{ mb: 4, fontWeight: 800, color: 'white' }}>My Vlogs</Typography>
        {myPosts?.length > 0 ? (
          <Grid container alignItems="stretch" spacing={3}>
            {myPosts.map((post) => (
              <Grid key={post._id} item xs={12} sm={6} md={4}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6">You haven't posted any vlogs yet.</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Profile;

