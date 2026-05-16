import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostForm from './components/Form/PostForm';
import MyBlogs from './components/MyBlogs/MyBlogs';
import Profile from './components/Auth/Profile';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Sapphire Glow
    },
    secondary: {
      main: '#F43F5E', // Sunset Crimson
    },
    background: {
      default: '#05070B', // Deep Space
      paper: '#0D1117', // Elevated Surface
    },
    text: {
      primary: '#E5E7EB', // Soft Text
      secondary: '#9CA3AF', // Muted Text
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Clash Display", sans-serif' },
    h2: { fontFamily: '"Clash Display", sans-serif' },
    h3: { fontFamily: '"Clash Display", sans-serif' },
    h4: { fontFamily: '"Clash Display", sans-serif' },
    h5: { fontFamily: '"Clash Display", sans-serif' },
    h6: { fontFamily: '"Clash Display", sans-serif' },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '20px',
          paddingRight: '20px',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          textTransform: 'none',
          fontWeight: 600,
          minHeight: '48px',
          transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1), transform 120ms cubic-bezier(0.16,1,0.3,1)',
          '&:active': {
            transform: 'scale(0.96)',
          }
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #F43F5E)',
          boxShadow: '0 0 24px rgba(139,92,246,0.35)',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: '0 0 32px rgba(139,92,246,0.5)',
          }
        }
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minHeight: '48px',
          minWidth: '48px',
          transition: 'transform 120ms cubic-bezier(0.16,1,0.3,1)',
          '&:active': {
            transform: 'scale(0.96)',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          backgroundImage: 'none',
          backgroundColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1), transform 120ms cubic-bezier(0.16,1,0.3,1)',
          '&:active': {
            transform: 'scale(0.98)',
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: '0 12px 48px rgba(59,130,246,0.15), 0 12px 48px rgba(244,63,94,0.15)',
          }
        }
      }
    }
  },
});


const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/create" exact element={<PostForm />} />
          <Route path="/myblogs" exact element={<MyBlogs />} />
          <Route path="/profile" exact element={<Profile />} />
        </Routes>
      </Container>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
