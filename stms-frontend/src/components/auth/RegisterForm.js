import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link as MuiLink, Grid, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const roles = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
  { value: 'admin', label: 'Admin' },
];

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    cnic: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) { // Clear error when user starts typing
        setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.userName.trim()) tempErrors.userName = "Username is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.role) tempErrors.role = "Role is required.";
    if (!formData.cnic.trim()) {
        tempErrors.cnic = "CNIC is required.";
    } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(formData.cnic)) {
        tempErrors.cnic = "CNIC format must be XXXXX-XXXXXXX-X.";
    }
    if (!formData.mobile.trim()) {
        tempErrors.mobile = "Mobile number is required.";
    } else if (!/^(03|\+923)[0-9]{9}$/.test(formData.mobile)) {
        tempErrors.mobile = "Format: 03XXXXXXXXX or +923XXXXXXXXX.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // TODO: Handle registration logic - API call, state update
      console.log('Registration Data:', formData);
      alert('Registration functionality placeholder.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField name="userName" required fullWidth id="userName" label="Username" autoFocus value={formData.userName} onChange={handleChange} error={!!errors.userName} helperText={errors.userName} />
        </Grid>
        <Grid item xs={12}>
          <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth name="password" label="Password" type="password" id="password" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required error={!!errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" name="role" value={formData.role} label="Role" onChange={handleChange}>
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField name="cnic" required fullWidth id="cnic" label="CNIC (e.g., 12345-1234567-1)" value={formData.cnic} onChange={handleChange} error={!!errors.cnic} helperText={errors.cnic} placeholder="XXXXX-XXXXXXX-X" />
        </Grid>
        <Grid item xs={12}>
          <TextField name="mobile" required fullWidth id="mobile" label="Mobile Number" value={formData.mobile} onChange={handleChange} error={!!errors.mobile} helperText={errors.mobile} placeholder="03XXXXXXXXX or +923XXXXXXXXX" />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <MuiLink component={RouterLink} to="/login" variant="body2">
          Already have an account? Sign in
        </MuiLink>
      </Box>
    </Box>
  );
};

export default RegisterForm;
