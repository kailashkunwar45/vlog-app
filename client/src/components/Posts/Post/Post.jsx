import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box, Avatar, Divider } from '@mui/material';
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
      {/* Header Section */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            sx={{ bgcolor: 'secondary.main', width: 32, height: 32, mr: 1.5, fontSize: '0.9rem' }} 
            alt={post.name}
          >
            {post.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'white' }}>{post.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{moment(post.createdAt).fromNow()}</Typography>
          </Box>
        </Box>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon />
          </Button>
        )}
      </Box>

      {/* Media Section */}
      <Box sx={{ position: 'relative' }}>
        <MediaSection post={post} />
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
      <CardContent sx={{ pb: 1 }}>
        <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h6">{post.title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>{post.message}</Typography>
        <Typography variant="caption" color="primary" sx={{ display: 'block' }}>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </CardContent>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', mx: 2 }} />

      <CardActions sx={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}>
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
