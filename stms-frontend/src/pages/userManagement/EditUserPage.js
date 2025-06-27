import React, { useState, useEffect } from 'react';
import UserForm from '../../components/userManagement/UserForm';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// Mock function to simulate fetching user data - replace with actual API call
const fetchUserById = async (userId) => {
  console.log(`Mock Fetch: User with ID: ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay

  const mockUsersFromList = [ // Consistent with UserListPage mock for demo
    { id: 1, userName: 'johndoe', email: 'john.doe@example.com', role: 'Admin', branch: 'main_campus', cnic: '12345-1234567-1', mobile: '0300-1234567', status: 'Active', permanentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', district: 'District A', province: 'Province X', country: 'Pakistan' }, currentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', district: 'District A', province: 'Province X', country: 'Pakistan' }, isSameAsPermanent: true },
    { id: 2, userName: 'janeschmoe', email: 'jane.schmoe@example.com', role: 'Teacher', branch: 'city_campus', cnic: '54321-7654321-2', mobile: '0333-7654321', status: 'Active', permanentAddress: { village: '456 Oak Ave', town: 'Townsburgh', tahsil: 'North', district: 'District B', province: 'Province Y', country: 'Pakistan' }, currentAddress: { village: '789 Pine Rd', town: 'Townsburgh', tahsil: 'North', district: 'District B', province: 'Province Y', country: 'Pakistan' }, isSameAsPermanent: false },
    { id: 3, userName: 'peterjones', email: 'peter.jones@example.com', role: 'Student', branch: 'main_campus', cnic: '11223-3445566-7', mobile: '0312-3456789', status: 'Inactive', permanentAddress: { village: 'House 10', town: 'Village Green', tahsil: 'South', district: 'District C', province: 'Province Z', country: 'Pakistan' }, currentAddress: { village: 'Apt 5, Metro Towers', town: 'Urban Center', tahsil: 'Central', district: 'District D', province: 'Province W', country: 'Pakistan' }, isSameAsPermanent: false },
    { id: 4, userName: 'alicebrown', email: 'alice.brown@example.com', role: 'Parent', branch: 'online_campus', cnic: '98765-4321098-7', mobile: '0345-9876543', status: 'Active', permanentAddress: { village: 'Remote Villa', town: 'Cyber City', tahsil: 'Tech Park', district: 'District E', province: 'Province V', country: 'Pakistan' }, currentAddress: { village: 'Remote Villa', town: 'Cyber City', tahsil: 'Tech Park', district: 'District E', province: 'Province V', country: 'Pakistan' }, isSameAsPermanent: true },
  ];
  const user = mockUsersFromList.find(u => u.id.toString() === userId);
  if (user) {
    return user; // Return the found user
  } else {
    throw new Error(`User with ID ${userId} not found in mock data.`);
  }
};


const EditUserPage = () => {
  const { userId } = useParams(); // Get userId from URL
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchUserById(userId)
        .then(data => {
          setInitialData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch user data for edit:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleEditUser = (formData) => {
    // TODO: Implement API call to update user
    console.log('Updated User Data for ID:', userId, formData);
    alert(`User ${userId} information updated successfully! (Placeholder - API call needed)`);
    navigate('/users'); // Redirect to user list page
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
        <CircularProgress />
        <Typography sx={{ml: 2}}>Loading user data for editing...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{m:2}}>Error loading user data: {error}</Alert>;
  }

  if (!initialData && !loading) { // Ensure not to show this if still loading
    return <Alert severity="warning" sx={{m:2}}>User data could not be loaded or found.</Alert>;
  }

  return (
    <Box>
      {/* <Typography variant="h4" gutterBottom sx={{mb: 2}}>Edit User Profile</Typography> */}
      {initialData && <UserForm onSubmit={handleEditUser} initialData={initialData} isEditMode={true} />}
    </Box>
  );
};

export default EditUserPage;
