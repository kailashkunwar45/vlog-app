import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, Box, IconButton, Badge, Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken } from 'react-jwt';
import { logout } from '../../redux/features/authSlice';
import { getPosts } from '../../redux/features/postSlice';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.posts);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  // Notification Logic
  const myPosts = (posts || []).filter((post) => post.creator === (user?.result?._id || user?.result?.googleId));
  const postsWithActivity = myPosts.filter(p => (p.likes?.length || 0) > 0 || (p.comments?.length || 0) > 0);
  const notificationCount = postsWithActivity.length;

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.02)', 
        backdropFilter: 'blur(24px)', 
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: { xs: 0, md: 4 }, 
        mb: { xs: 4, md: 4 }, 
        mt: { xs: 0, md: 2 },
        top: { xs: 0, md: 16 },
        bottom: 'auto',
        position: { xs: 'fixed', md: 'sticky' },
        left: 0,
        right: 0,
        zIndex: 1100,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: { xs: '10px 16px', sm: '10px 50px' },
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}
    >
      <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <AutoStoriesIcon sx={{ 
          fontSize: { xs: '2.2rem', sm: '2.8rem' }, 
          p: 0.5,
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #F43F5E)', 
          borderRadius: '12px',
          color: 'white',
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
        }} />
      </Box>

      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', width: 'auto', minHeight: 'auto', p: 0 }}>
        {user?.result ? (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tooltip title="Home">
              <IconButton component={Link} to="/" sx={{ color: 'white', p: 1 }}>
                <HomeIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotificationClick} sx={{ color: 'white', p: 1 }}>
                <Badge badgeContent={notificationCount} color="secondary" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16 } }}>
                  <NotificationsIcon fontSize="medium" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleNotificationClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  background: 'rgba(30, 40, 60, 0.8)',
                  backdropFilter: 'blur(24px)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  minWidth: '280px'
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>Activity</Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              {postsWithActivity.length === 0 ? (
                 <MenuItem onClick={handleNotificationClose}>No recent activity.</MenuItem>
              ) : (
                postsWithActivity.map(post => (
                  <MenuItem key={post._id} onClick={() => { handleNotificationClose(); navigate('/profile'); }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                       <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
                       <Typography variant="caption" sx={{ color: '#9CA3AF' }}>
                         👍 {post.likes?.length || 0} &nbsp;&nbsp; 💬 {post.comments?.length || 0}
                       </Typography>
                     </Box>
                  </MenuItem>
                ))
              )}
            </Menu>

            <Tooltip title="Create Vlog">
              <IconButton component={Link} to="/create" sx={{ color: 'white', p: 1 }}>
                <AddBoxIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Edit My Blogs">
              <IconButton component={Link} to="/myblogs" sx={{ color: 'white', p: 1 }}>
                <EditNoteIcon fontSize="medium" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton component={Link} to="/profile" sx={{ color: 'white', p: 0.5 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '0.9rem' }} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} sx={{ color: '#F43F5E', p: 1 }}>
                <LogoutIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>

        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
