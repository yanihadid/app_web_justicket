import React from 'react';
import { Box, Typography, Container, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Footer: React.FC = () => {
  return (
    <Box 
        sx={{
          backgroundColor: '#0C0C0C',
          color: 'white',
          py: 4,
          textAlign: 'center',
          borderTop: '1px solid #333',
        }}
      >
        <Container>
          <Box sx={{ mt: 2 }}>
            <IconButton
              component="a"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#EA4949' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#EA4949' }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#EA4949' }}
            >
              <XIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#EA4949' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>

          {/* Liens principaux */}
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Link href="/about" underline="hover" sx={{ color: '#EA4949', fontWeight: 500 }}>
              À propos
            </Link>
            <Link href="/contact" underline="hover" sx={{ color: '#EA4949', fontWeight: 500 }}>
              Contact
            </Link>
            <Link href="/privacy" underline="hover" sx={{ color: '#EA4949', fontWeight: 500 }}>
              Politique de confidentialité
            </Link>
          </Box>

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ mb: 1, fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} <strong style={{ color: '#EA4949' }}>Justicket</strong> — Tous droits réservés.
          </Typography>
          </Box>

          
        </Container>
    </Box>
  );
};

export default Footer;