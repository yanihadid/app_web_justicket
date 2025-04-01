import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, InputAdornment } from '@mui/material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import { AuthService } from '../../application/services/AuthService';
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState("Admin");
  const isPasswordValid = (pwd: string): boolean => {
    const minLength = pwd.length >= 6;
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    return minLength && hasLetter && hasNumber;
  };
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isPasswordValid(password)) {
      alert("Le mot de passe doit contenir au moins 6 caractères, dont au moins une lettre et un chiffre.");
      return;
    }    
    try {
      const response = await AuthService.register(name, email, password);
      console.log('User registered successfully:', response.data);
      alert("Votre inscription est réussie, vous pouvez vous connecté !");
      navigate('/login');
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert("Veuillez remplir tous les champs, ou bien votre compte est déjà présent.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 1 }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ color: "white" }}
      >
        Créez votre compte
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <form onSubmit={handleSignUp} style={{ width: '100%' }} autoComplete='off'>
          <TextField
            label="Nom"
            placeholder='Jhon Dupon'
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
            placeholder='nom@exemple.com'
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
            label="Mot de passe"
            placeholder='minimum 8 caractères'
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
           S'inscrire
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
