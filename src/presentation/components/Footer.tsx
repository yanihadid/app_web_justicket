import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'black',
        color: 'white',
        py: 3,
        mt: 'auto',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Justicket. All rights reserved.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/about" color="inherit" sx={{ mx: 1 }}>
            à propos
          </Link>
          <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
            Contact
          </Link>
          <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;