import React from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';

const AuthLayout = ({ children, title }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2, // Consistent with theme.js MuiCard
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
};

export default AuthLayout;
