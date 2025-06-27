import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
  title: '',
  code: '',
  creditHours: '',
  description: '',
  // teacherId: '', // For later when teacher assignment is implemented
};

const SubjectForm = ({ initialData, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData, isEditMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title.trim()) tempErrors.title = "Subject title is required.";
    if (!formData.code.trim()) tempErrors.code = "Subject code is required.";
    if (!formData.creditHours) {
      tempErrors.creditHours = "Credit hours are required.";
    } else if (isNaN(formData.creditHours) || Number(formData.creditHours) <= 0) {
      tempErrors.creditHours = "Credit hours must be a positive number.";
    }
    // Add more validations as needed

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
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit Subject' : 'Add New Subject'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Subject Title"
              required
              fullWidth
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="code"
              label="Subject Code"
              required
              fullWidth
              value={formData.code}
              onChange={handleChange}
              error={!!errors.code}
              helperText={errors.code}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="creditHours"
              label="Credit Hours"
              type="number"
              required
              fullWidth
              value={formData.creditHours}
              onChange={handleChange}
              error={!!errors.creditHours}
              helperText={errors.creditHours}
              InputProps={{ inputProps: { min: 1, step: "0.5" } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description (Optional)"
              multiline
              rows={4}
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          {/*
          TODO: Add Teacher Assignment field later
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.teacherId}>
              <InputLabel id="teacher-select-label">Assign Teacher (Optional)</InputLabel>
              <Select
                labelId="teacher-select-label"
                id="teacherId"
                name="teacherId"
                value={formData.teacherId}
                label="Assign Teacher (Optional)"
                onChange={handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                { // Populate with list of teachers from API/state
                  // mockTeachers.map(teacher => <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>)
                }
              </Select>
              {errors.teacherId && <FormHelperText>{errors.teacherId}</FormHelperText>}
            </FormControl>
          </Grid>
          */}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button onClick={() => navigate('/subjects')} sx={{ mr: 1 }}>
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
