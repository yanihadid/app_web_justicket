import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, InputAdornment } from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import axios from 'axios';
import { AuthService } from '../../application/services/AuthService';
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState("Admin");
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await AuthService.register(name, email, password);
      console.log('User registered successfully:', response.data);
      alert("Inscription réussie !");
      navigate('/login');
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSignUp} style={{ width: '100%' }}>
          <TextField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
