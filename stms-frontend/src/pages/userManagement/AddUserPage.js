import React from 'react';
import UserForm from '../../components/userManagement/UserForm';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
  const navigate = useNavigate();

  const handleAddUser = (formData) => {
    // TODO: Implement API call to add user
    console.log('New User Data to submit:', formData);
    // Simulate successful API call
    alert('User created successfully! (Placeholder - API call needed)');
    navigate('/users'); // Redirect to user list page after successful submission
  };

  return (
    <Box>
      {/* Optional: Page Title if not handled by MainLayout or a higher component */}
      {/* <Typography variant="h4" gutterBottom sx={{mb: 2}}>Create New User</Typography> */}
      <UserForm onSubmit={handleAddUser} isEditMode={false} />
    </Box>
  );
};

export default AddUserPage;
