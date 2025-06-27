import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Will be used once routes are set up

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle login logic
    console.log({ email, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* TODO: Add Remember me checkbox if needed */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <MuiLink component={RouterLink} to="/forgot-password" variant="body2">
          Forgot password?
        </MuiLink>
        <MuiLink component={RouterLink} to="/register" variant="body2">
          {"Don't have an account? Sign Up"}
        </MuiLink>
      </Box>
    </Box>
  );
};

export default LoginForm;
