import React from 'react';
import { Grid, Typography, Box, Skeleton, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts?.length && !isLoading) return 'No posts';

  return (
    isLoading ? (
      <Grid container alignItems="stretch" spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid key={item} item xs={12} sm={6} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Skeleton variant="rectangular" height={250} sx={{ bgcolor: 'rgba(255,255,255,0.03)' }} animation="wave" />
              <CardContent>
                <Skeleton variant="text" height={40} width="80%" sx={{ bgcolor: 'rgba(255,255,255,0.03)', mb: 1 }} animation="wave" />
                <Skeleton variant="text" height={20} width="60%" sx={{ bgcolor: 'rgba(255,255,255,0.03)', mb: 1 }} animation="wave" />
                <Skeleton variant="text" height={20} width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.03)' }} animation="wave" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
