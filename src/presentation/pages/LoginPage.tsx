import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, InputAdornment } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { AuthService } from '../../application/services/AuthService';
import { useNavigate } from "react-router-dom";

function extractUserIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.id || payload.sub || null;
  } catch (e) {
    console.error("Erreur lors du décodage du token :", e);
    return null;
  }
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await AuthService.login(email, password);
  
      console.log("Connexion réussie. Token :", response.token);
      
      // Stocker le token dans la session
      sessionStorage.setItem("token", response.token);
  
      // Extraire l'ID utilisateur à partir du token
      const userId = extractUserIdFromToken(response.token);
      if (userId) {
        sessionStorage.setItem("userId", userId);
        console.log("User ID extrait et stocké :", userId);
      } else {
        console.warn("Impossible d'extraire l'userId du token !");
      }
  
      alert("Connexion réussie !");
      navigate('/concerts');
      
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