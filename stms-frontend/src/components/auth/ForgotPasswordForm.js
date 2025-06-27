import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle forgot password logic (e.g., API call)
    console.log('Forgot password request for email:', email);
    setSubmitted(true);
    // alert('Password reset link functionality placeholder.'); // Or use the submitted message
  };

  if (submitted) {
    return (
      <Box sx={{ mt: 1, textAlign: 'center' }}>
        <Typography variant="body1" gutterBottom>
          If an account exists for <strong>{email}</strong>, you will receive an email with instructions to reset your password shortly.
        </Typography>
        <MuiLink component={RouterLink} to="/login" variant="body2" sx={{ mt: 2, display: 'block' }}>
          Return to Sign In
        </MuiLink>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
      <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
        Enter your email address and we'll send you a link to reset your password.
      </Typography>
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Send Password Reset Link
      </Button>
      <Box sx={{ textAlign: 'center' }}>
        <MuiLink component={RouterLink} to="/login" variant="body2">
          Return to Sign In
        </MuiLink>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
