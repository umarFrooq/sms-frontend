import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, FormHelperText,
  Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Divider, Checkbox, FormControlLabel
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

const roles = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

const branches = [ // This should ideally come from an API
  { value: 'main_campus', label: 'Main Campus' },
  { value: 'city_campus', label: 'City Campus' },
  { value: 'online_campus', label: 'Online Campus' },
  { value: 'north_branch', label: 'North Branch' },
];

const initialFormState = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  branch: '',
  cnic: '',
  mobile: '',
  permanentAddress: { village: '', town: '', tahsil: '', district: '', province: '', country: 'Pakistan' },
  currentAddress: { village: '', town: '', tahsil: '', district: '', province: '', country: 'Pakistan' },
  isSameAsPermanent: false,
};

const UserForm = ({ initialData, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && initialData) {
      const { password, confirmPassword, ...editableData } = initialData; // Exclude passwords
      setFormData(prev => ({
        ...initialFormState, // Start with initial state to ensure all fields are present
        ...editableData,
        permanentAddress: { ...initialFormState.permanentAddress, ...(editableData.permanentAddress || {}) },
        currentAddress: { ...initialFormState.currentAddress, ...(editableData.currentAddress || {}) },
        isSameAsPermanent: editableData.isSameAsPermanent || false, // Ensure this defaults correctly
      }));
    } else {
      setFormData(initialFormState); // For add mode
    }
  }, [initialData, isEditMode]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === 'isSameAsPermanent') {
      setFormData((prev) => ({
        ...prev,
        isSameAsPermanent: checked,
        currentAddress: checked ? { ...prev.permanentAddress } : { ...initialFormState.currentAddress, country: prev.currentAddress.country || 'Pakistan' },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    if (errors[name]) { // Clear error for this field on change
        setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const handleAddressChange = (addressType, event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [addressType]: {
          ...prev[addressType],
          [name]: value,
        },
      };
      // If permanent address is changed while synced, current address should update too
      if (addressType === 'permanentAddress' && prev.isSameAsPermanent) {
        updatedData.currentAddress = { ...updatedData.permanentAddress };
      }
      // If current address is being edited directly, uncheck "isSameAsPermanent"
      if (addressType === 'currentAddress' && prev.isSameAsPermanent) {
        updatedData.isSameAsPermanent = false;
      }
      return updatedData;
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.userName.trim()) tempErrors.userName = "Username is required.";
    if (!formData.email.trim()) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";

    if (!isEditMode || (isEditMode && formData.password)) { // Validate password if new or if being changed
        if (!formData.password) tempErrors.password = "Password is required for new users.";
        else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters.";
        if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.role) tempErrors.role = "Role is required.";
    if (!formData.branch) tempErrors.branch = "Branch is required.";
    if (!formData.cnic.trim()) tempErrors.cnic = "CNIC is required.";
    else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(formData.cnic)) tempErrors.cnic = "CNIC format: XXXXX-XXXXXXX-X.";
    if (!formData.mobile.trim()) tempErrors.mobile = "Mobile number is required.";
    else if (!/^(03|\+923)[0-9]{9}$/.test(formData.mobile)) tempErrors.mobile = "Format: 03XX1234567 or +923XX1234567.";

    // Basic address validation (e.g., town is required)
    if (!formData.permanentAddress.town.trim()) tempErrors.permanentTown = "Permanent address town/city is required.";
    if (!formData.isSameAsPermanent && !formData.currentAddress.town.trim()) tempErrors.currentTown = "Current address town/city is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const dataToSubmit = { ...formData };
      // Don't submit password fields if they are empty during an edit
      if (isEditMode && !formData.password && !formData.confirmPassword) {
        delete dataToSubmit.password;
        delete dataToSubmit.confirmPassword;
      }
      onSubmit(dataToSubmit);
    }
  };

  const renderAddressFields = (addressType, title) => (
    <Accordion defaultExpanded sx={{ my: 2, boxShadow: 1, '&:before': { display: 'none' } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1" fontWeight="medium">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField name="village" label="Village/Street/House No." fullWidth value={formData[addressType].village} onChange={(e) => handleAddressChange(addressType, e)} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="town" label="Town/City" fullWidth required={addressType === 'permanentAddress' || !formData.isSameAsPermanent} value={formData[addressType].town} onChange={(e) => handleAddressChange(addressType, e)} error={!!(addressType === 'permanentAddress' ? errors.permanentTown : errors.currentTown)} helperText={addressType === 'permanentAddress' ? errors.permanentTown : errors.currentTown} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="tahsil" label="Tahsil/Sector" fullWidth value={formData[addressType].tahsil} onChange={(e) => handleAddressChange(addressType, e)} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="district" label="District" fullWidth value={formData[addressType].district} onChange={(e) => handleAddressChange(addressType, e)} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="province" label="Province" fullWidth value={formData[addressType].province} onChange={(e) => handleAddressChange(addressType, e)} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="country" label="Country" fullWidth value={formData[addressType].country} onChange={(e) => handleAddressChange(addressType, e)} /></Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Paper sx={{ p: {xs: 2, sm:3} }}> {/* Responsive padding */}
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit User Information' : 'Add New User'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2.5}> {/* Slightly increased spacing */}
          <Grid item xs={12} sm={6}><TextField name="userName" label="Username" required fullWidth value={formData.userName} onChange={handleChange} error={!!errors.userName} helperText={errors.userName} autoFocus /></Grid>
          <Grid item xs={12} sm={6}><TextField name="email" label="Email Address" type="email" required fullWidth value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} /></Grid>

          <Grid item xs={12}><Typography variant="caption" color="textSecondary">{isEditMode ? "Leave password fields blank if you do not want to change the password." : "Password is required for new users."}</Typography></Grid>
          <Grid item xs={12} sm={6}><TextField name="password" label={isEditMode ? "New Password" : "Password"} type="password" fullWidth value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} required={!isEditMode} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="confirmPassword" label={isEditMode ? "Confirm New Password" : "Confirm Password"} type="password" fullWidth value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} required={!isEditMode || !!formData.password} /></Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select name="role" label="Role" value={formData.role} onChange={handleChange}>{roles.map(r => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}</Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.branch}>
              <InputLabel>Branch</InputLabel>
              <Select name="branch" label="Branch" value={formData.branch} onChange={handleChange}>{branches.map(b => <MenuItem key={b.value} value={b.value}>{b.label}</MenuItem>)}</Select>
              {errors.branch && <FormHelperText>{errors.branch}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}><TextField name="cnic" label="CNIC (e.g., 12345-1234567-1)" required fullWidth value={formData.cnic} onChange={handleChange} error={!!errors.cnic} helperText={errors.cnic} /></Grid>
          <Grid item xs={12} sm={6}><TextField name="mobile" label="Mobile Number (e.g., 03001234567)" required fullWidth value={formData.mobile} onChange={handleChange} error={!!errors.mobile} helperText={errors.mobile} /></Grid>
        </Grid>

        {renderAddressFields('permanentAddress', 'Permanent Address')}

        <FormControlLabel
            control={<Checkbox name="isSameAsPermanent" checked={formData.isSameAsPermanent} onChange={handleChange} />}
            label="Current address is the same as permanent address."
            sx={{ my: 1 }}
        />

        {!formData.isSameAsPermanent && renderAddressFields('currentAddress', 'Current Address')}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={() => navigate('/users')} sx={{ mr: 2 }} variant="outlined"> {/* Added variant */}
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {isEditMode ? 'Save Changes' : 'Create User'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserForm;
