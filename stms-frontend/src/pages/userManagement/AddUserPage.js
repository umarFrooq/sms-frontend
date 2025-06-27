import React from 'react';
import UserForm from '../../components/userManagement/UserForm';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
  const navigate = useNavigate();

  const handleAddUser = (formData) => {
    // TODO: Implement API call to add user
    console.log('New User Data:', formData);
    // Simulate successful API call
    alert('User added successfully! (Placeholder)');
    navigate('/users'); // Redirect to user list page after successful submission
  };

  return (
    <Box>
      {/* Optionally, add a page title or breadcrumbs if MainLayout doesn't handle it */}
      {/* <Typography variant="h4" gutterBottom sx={{mb: 3}}>Add New User</Typography> */}
      <UserForm onSubmit={handleAddUser} isEditMode={false} />
    </Box>
  );
};

export default AddUserPage;
