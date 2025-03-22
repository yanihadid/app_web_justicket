import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, InputAdornment } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { AuthService } from '../../application/services/AuthService';
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
      event.preventDefault();
      try {
        const response = await AuthService.login(email, password);
        console.log("Connexion réussie. Token :", response.token);
        localStorage.setItem("token", response.token);
        
        localStorage.setItem("token", response.token);
        alert("Connexion réussie !");
        navigate('/');
      } catch (error: any) {
        console.error("Erreur de connexion :", error.response?.data || error.message);
        alert("Email ou mot de passe incorrect.");
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
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;