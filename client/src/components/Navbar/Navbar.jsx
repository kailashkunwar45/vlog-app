import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decodeToken } from 'react-jwt';
import { logout } from '../../redux/features/authSlice';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(10px)', 
        borderRadius: 4, 
        mb: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 50px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}
    >
      <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <Typography variant="h2" align="center" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' }, fontWeight: 800, background: 'linear-gradient(45deg, #88aaff, #f48fb1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Memories
        </Typography>
      </Box>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', width: { xs: 'auto', sm: '400px' } }}>
        {user?.result ? (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>{user?.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
