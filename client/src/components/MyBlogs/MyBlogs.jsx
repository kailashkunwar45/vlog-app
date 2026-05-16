import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/features/postSlice';
import Post from '../Posts/Post/Post';
import Form from '../Form/Form';

const MyBlogs = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const myPosts = (posts || []).filter((post) => post.creator === (user?.result?._id || user?.result?.googleId));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, color: 'white' }}>My Blogs</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={currentId ? 7 : 12}>
            {myPosts?.length > 0 ? (
              <Grid container alignItems="stretch" spacing={3}>
                {myPosts.map((post) => (
                  <Grid key={post._id} item xs={12} sm={6} md={currentId ? 12 : 4}>
                    <Post post={post} setCurrentId={setCurrentId} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper sx={{ p: 4, textAlign: 'center', background: 'rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="h6">You haven't posted any blogs yet.</Typography>
              </Paper>
            )}
          </Grid>
          {currentId !== 0 && (
            <Grid item xs={12} md={5}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default MyBlogs;
