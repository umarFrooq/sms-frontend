import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography, TextareaAutosize } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
  title: '',
  code: '',
  creditHours: '',
  description: '',
  // teacherId: '', // For later when teacher assignment is implemented (e.g., dropdown with teacher list)
};

const SubjectForm = ({ initialData, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData(prev => ({ ...initialFormState, ...initialData })); // Ensure all fields are initialized
    } else {
      setFormData(initialFormState); // For add mode
    }
  }, [initialData, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) { // Clear error for this field on change
        setErrors(prevErrors => ({...prevErrors, [name]: null}));
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Subject title is required.";
    if (!formData.code.trim()) tempErrors.code = "Subject code is required.";
    else if (formData.code.trim().length > 20) tempErrors.code = "Subject code cannot exceed 20 characters.";

    if (!formData.creditHours) {
      tempErrors.creditHours = "Credit hours are required.";
    } else {
        const credits = parseFloat(formData.creditHours);
        if (isNaN(credits) || credits <= 0 || credits > 10) { // Example validation for credit hours
             tempErrors.creditHours = "Credit hours must be a positive number, typically between 1 and 10.";
        }
    }
    if (formData.description.length > 500) tempErrors.description = "Description cannot exceed 500 characters.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Paper sx={{ p: {xs: 2, sm: 3} }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit Subject Details' : 'Add New Subject'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField name="title" label="Subject Title" required fullWidth value={formData.title} onChange={handleChange} error={!!errors.title} helperText={errors.title} autoFocus />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="code" label="Subject Code" required fullWidth value={formData.code} onChange={handleChange} error={!!errors.code} helperText={errors.code} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="creditHours" label="Credit Hours" type="number" required fullWidth value={formData.creditHours} onChange={handleChange} error={!!errors.creditHours} helperText={errors.creditHours} InputProps={{ inputProps: { min: 0.5, step: "0.5" } }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: errors.description ? 'error.main' : 'text.secondary' }}>
              Description (Optional)
            </Typography>
            <TextareaAutosize
              name="description"
              aria-label="subject description"
              minRows={4}
              placeholder="Enter a brief description of the subject..."
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontFamily: 'inherit',
                fontSize: '1rem',
                borderRadius: '4px',
                borderColor: errors.description ? 'red' : 'rgba(0, 0, 0, 0.23)', // Match TextField border
                resize: 'vertical'
              }}
            />
            {errors.description && <Typography variant="caption" color="error">{errors.description}</Typography>}
          </Grid>
          {/*
          TODO: Add Teacher Assignment field later (e.g., using Autocomplete for searching teachers)
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.teacherId}>
              <InputLabel>Assign Teacher (Optional)</InputLabel>
              <Select name="teacherId" label="Assign Teacher (Optional)" value={formData.teacherId} onChange={handleChange}>
                <MenuItem value=""><em>None</em></MenuItem>
                {mockTeachers.map(teacher => <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>)}
              </Select>
              {errors.teacherId && <FormHelperText>{errors.teacherId}</FormHelperText>}
            </FormControl>
          </Grid>
          */}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={() => navigate('/subjects')} sx={{ mr: 2 }} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {isEditMode ? 'Save Changes' : 'Create Subject'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SubjectForm;
