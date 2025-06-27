import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl,
  Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

// Define roles - this could come from a config or API later
const roles = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
  { value: 'admin', label: 'Admin' },
  // Add other roles as needed
];

// Define branches - this could also come from API/config
const branches = [
  { value: 'main_campus', label: 'Main Campus' },
  { value: 'city_campus', label: 'City Campus' },
  { value: 'online_campus', label: 'Online Campus' },
];

const initialFormState = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '', // Only for new user or password change
  role: '',
  branch: '',
  cnic: '',
  mobile: '',
  permanentAddress: {
    village: '',
    town: '',
    tahsil: '',
    distinct: '', // Corrected spelling from 'distinct' to 'district'
    province: '',
    country: 'Pakistan', // Default
  },
  currentAddress: {
    village: '',
    town: '',
    tahsil: '',
    distinct: '', // Corrected spelling
    province: '',
    country: 'Pakistan', // Default
  },
  isSameAsPermanent: false, // For copying permanent to current address
};


const UserForm = ({ initialData, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && initialData) {
      // If editing, populate form with initialData. Exclude password fields.
      const { password, confirmPassword, ...editableData } = initialData;
      setFormData(prev => ({
        ...prev,
        ...editableData,
        // Ensure nested address objects are correctly spread or assigned
        permanentAddress: { ...initialFormState.permanentAddress, ...editableData.permanentAddress },
        currentAddress: { ...initialFormState.currentAddress, ...editableData.currentAddress },
      }));
    } else {
      setFormData(initialFormState); // Reset for add mode or if no initialData
    }
  }, [initialData, isEditMode]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'isSameAsPermanent') {
      setFormData((prev) => ({
        ...prev,
        isSameAsPermanent: checked,
        currentAddress: checked ? { ...prev.permanentAddress } : { ...initialFormState.currentAddress, country: prev.permanentAddress.country },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleAddressChange = (addressType, event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [name]: value,
      },
      // If current address was synced and permanent address changes, unsync if user wants to edit current independently
      isSameAsPermanent: addressType === 'permanentAddress' && prev.isSameAsPermanent ? false : prev.isSameAsPermanent,
    }));
  };


  const validate = () => {
    let tempErrors = {};
    if (!formData.userName.trim()) tempErrors.userName = "Username is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!isEditMode && !formData.password) { // Password required only for new users
        tempErrors.password = "Password is required for new users.";
    } else if (formData.password && formData.password.length < 6) {
        tempErrors.password = "Password must be at least 6 characters.";
    }
    if (!isEditMode && formData.password !== formData.confirmPassword) { // Or if password is being changed
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.role) tempErrors.role = "Role is required.";
    if (!formData.branch) tempErrors.branch = "Branch is required.";
    if (!formData.cnic.trim()) {
        tempErrors.cnic = "CNIC is required.";
    } else if (!/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(formData.cnic)) {
        tempErrors.cnic = "CNIC format must be XXXXX-XXXXXXX-X.";
    }
    if (!formData.mobile.trim()) {
        tempErrors.mobile = "Mobile number is required.";
    } else if (!/^(03|\+923)[0-9]{9}$/.test(formData.mobile)) {
        tempErrors.mobile = "Mobile number format must be 03XXXXXXXXX or +923XXXXXXXXX.";
    }
    // Add address validations if needed, e.g., permanentAddress.town
    if(!formData.permanentAddress.town.trim()) tempErrors.permanentTown = "Permanent address town is required.";
    if(!formData.currentAddress.town.trim() && !formData.isSameAsPermanent) tempErrors.currentTown = "Current address town is required.";


    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const dataToSubmit = { ...formData };
      if (!isEditMode || !formData.password) { // Don't submit empty password on edit unless it's being changed
          delete dataToSubmit.password;
          delete dataToSubmit.confirmPassword;
      }
      onSubmit(dataToSubmit);
    }
  };

  const renderAddressFields = (addressType, title) => (
    <Accordion sx={{ my: 2, boxShadow: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="village" label="Village/Street" fullWidth value={formData[addressType].village} onChange={(e) => handleAddressChange(addressType, e)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="town" label="Town/City" fullWidth required value={formData[addressType].town} onChange={(e) => handleAddressChange(addressType, e)} error={!!(addressType === 'permanentAddress' ? errors.permanentTown : errors.currentTown)} helperText={addressType === 'permanentAddress' ? errors.permanentTown : errors.currentTown} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="tahsil" label="Tahsil" fullWidth value={formData[addressType].tahsil} onChange={(e) => handleAddressChange(addressType, e)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="distinct" label="District" fullWidth value={formData[addressType].distinct} onChange={(e) => handleAddressChange(addressType, e)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="province" label="Province" fullWidth value={formData[addressType].province} onChange={(e) => handleAddressChange(addressType, e)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="country" label="Country" fullWidth value={formData[addressType].country} onChange={(e) => handleAddressChange(addressType, e)} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit User' : 'Add New User'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField name="userName" label="Username" required fullWidth value={formData.userName} onChange={handleChange} error={!!errors.userName} helperText={errors.userName} autoFocus />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="email" label="Email Address" type="email" required fullWidth value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
          </Grid>
          {!isEditMode && ( // Only show password fields for new user creation
            <>
              <Grid item xs={12} sm={6}>
                <TextField name="password" label="Password" type="password" required fullWidth value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="confirmPassword" label="Confirm Password" type="password" required fullWidth value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
              </Grid>
            </>
          )}
          {isEditMode && ( // Optionally allow password change on edit form
             <Grid item xs={12}>
                <Typography variant="caption">Leave password fields blank if you do not want to change the password.</Typography>
                 <Grid container spacing={3} sx={{mt: 0.5}}>
                    <Grid item xs={12} sm={6}>
                        <TextField name="password" label="New Password" type="password" fullWidth value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField name="confirmPassword" label="Confirm New Password" type="password" fullWidth value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} />
                    </Grid>
                 </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select name="role" label="Role" value={formData.role} onChange={handleChange}>
                {roles.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
              </Select>
              {errors.role && <Typography variant="caption" color="error">{errors.role}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required error={!!errors.branch}>
              <InputLabel>Branch</InputLabel>
              <Select name="branch" label="Branch" value={formData.branch} onChange={handleChange}>
                {branches.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
              </Select>
              {errors.branch && <Typography variant="caption" color="error">{errors.branch}</Typography>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="cnic" label="CNIC (e.g., 12345-1234567-1)" required fullWidth value={formData.cnic} onChange={handleChange} error={!!errors.cnic} helperText={errors.cnic} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="mobile" label="Mobile Number (e.g., 03001234567)" required fullWidth value={formData.mobile} onChange={handleChange} error={!!errors.mobile} helperText={errors.mobile} />
          </Grid>
        </Grid>

        {renderAddressFields('permanentAddress', 'Permanent Address')}

        <FormControl fullWidth sx={{my:1}}>
             <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    name="isSameAsPermanent"
                    checked={formData.isSameAsPermanent}
                    onChange={handleChange}
                    style={{ marginRight: 8 }}
                />
                Current address is the same as permanent address
            </label>
        </FormControl>

        {!formData.isSameAsPermanent && renderAddressFields('currentAddress', 'Current Address')}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={() => navigate('/users')} sx={{ mr: 1 }}>
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
