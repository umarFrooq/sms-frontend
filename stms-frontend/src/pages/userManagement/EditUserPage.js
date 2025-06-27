import React, { useState, useEffect } from 'react';
import UserForm from '../../components/userManagement/UserForm';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// Mock function to simulate fetching user data - replace with actual API call
const fetchUserById = async (userId) => {
  console.log(`Fetching user with ID: ${userId}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find user in the mock data used in UserListPage (ideally this comes from a central store or API)
  const mockUsers = [
    { id: 1, userName: 'johndoe', email: 'john.doe@example.com', role: 'Admin', branch: 'main_campus', cnic: '12345-1234567-1', mobile: '0300-1234567', permanentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', distinct: 'District A', province: 'Province X', country: 'Pakistan' }, currentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', distinct: 'District A', province: 'Province X', country: 'Pakistan' }, isSameAsPermanent: true },
    { id: 2, userName: 'janeschmoe', email: 'jane.schmoe@example.com', role: 'Teacher', branch: 'city_campus', cnic: '54321-7654321-2', mobile: '0333-7654321', permanentAddress: { village: '456 Oak Ave', town: 'Townsburgh', tahsil: 'North', distinct: 'District B', province: 'Province Y', country: 'Pakistan' }, currentAddress: { village: '789 Pine Rd', town: 'Townsburgh', tahsil: 'North', distinct: 'District B', province: 'Province Y', country: 'Pakistan' }, isSameAsPermanent: false },
  ];
  const user = mockUsers.find(u => u.id.toString() === userId);
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
};


const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserById(userId)
      .then(data => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch user data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleEditUser = (formData) => {
    // TODO: Implement API call to update user
    console.log('Updated User Data for ID:', userId, formData);
    // Simulate successful API call
    alert(`User ${userId} updated successfully! (Placeholder)`);
    navigate('/users'); // Redirect to user list page
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ml: 2}}>Loading user data...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading user data: {error}</Alert>;
  }

  if (!initialData) {
    return <Alert severity="warning">User data not found.</Alert>;
  }

  return (
    <Box>
      {/* <Typography variant="h4" gutterBottom sx={{mb: 3}}>Edit User</Typography> */}
      <UserForm onSubmit={handleEditUser} initialData={initialData} isEditMode={true} />
    </Box>
  );
};

export default EditUserPage;
