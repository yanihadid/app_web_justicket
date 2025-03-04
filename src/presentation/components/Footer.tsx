import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'black',
        color: 'white',
        py: 3,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Justicket. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;