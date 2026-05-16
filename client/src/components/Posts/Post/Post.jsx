import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { likePost, deletePost } from '../../../redux/features/postSlice';
import CommentSection from './CommentSection';
import MediaSection from './MediaSection';

const Post = ({ post, setCurrentId }) => {
  const [showComments, setShowComments] = React.useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      height: '100%', 
      position: 'relative',
      // The background, blur, border, border-radius, box-shadow and hover are handled by MuiCard / MuiPaper overrides in App.jsx
      overflow: 'hidden'
    }}>
      <MediaSection post={post} />
      <Box sx={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        color: 'white', 
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '6px 14px',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: '0.5px' }}>{post.name}</Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>{moment(post.createdAt).fromNow()}</Typography>
      </Box>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <Box sx={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: '10px 20px' }}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </Box>
      <Typography sx={{ padding: '0 16px', fontWeight: 700 }} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions sx={{ padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
            <Likes />
          </Button>
          <Button size="small" color="primary" onClick={() => setShowComments(!showComments)}>
            Comments ({post?.comments?.length || 0})
          </Button>
        </Box>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
      {showComments && (
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(0, 0, 0, 0.2)' }}>
          <CommentSection post={post} />
        </Box>
      )}
    </Card>
  );
};

export default Post;
