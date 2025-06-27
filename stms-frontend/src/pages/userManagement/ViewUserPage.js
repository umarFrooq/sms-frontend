import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Alert, Divider, Button } from '@mui/material';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock function to simulate fetching user data - replace with actual API call
const fetchUserById = async (userId) => {
  console.log(`Fetching user for view with ID: ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  const mockUsers = [
    { id: 1, userName: 'johndoe', email: 'john.doe@example.com', role: 'Admin', branch: 'Main Campus', cnic: '12345-1234567-1', mobile: '0300-1234567', status: 'Active', permanentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', distinct: 'District A', province: 'Province X', country: 'Pakistan' }, currentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', distinct: 'District A', province: 'Province X', country: 'Pakistan' }, isSameAsPermanent: true },
    { id: 2, userName: 'janeschmoe', email: 'jane.schmoe@example.com', role: 'Teacher', branch: 'City Campus', cnic: '54321-7654321-2', mobile: '0333-7654321', status: 'Active', permanentAddress: { village: '456 Oak Ave', town: 'Townsburgh', tahsil: 'North', distinct: 'District B', province: 'Province Y', country: 'Pakistan' }, currentAddress: { village: '789 Pine Rd', town: 'Townsburgh', tahsil: 'North', distinct: 'District B', province: 'Province Y', country: 'Pakistan' }, isSameAsPermanent: false },
    { id: 3, userName: 'peterjones', email: 'peter.jones@example.com', role: 'Student', branch: 'Main Campus', cnic: '11223-3445566-7', mobile: '0312-3456789', status: 'Inactive', permanentAddress: { village: 'House 10, St 5', town: 'Village View', tahsil: 'South', distinct: 'District C', province: 'Province Z', country: 'Pakistan' }, currentAddress: { village: 'Apt 5B, Tower 1', town: 'Metro City', tahsil: 'Urban', distinct: 'District D', province: 'Province W', country: 'Pakistan' }, isSameAsPermanent: false },
  ];
  const user = mockUsers.find(u => u.id.toString() === userId);
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
};

const DetailItem = ({ label, value }) => (
  <Grid item xs={12} sm={6}>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>{label}</Typography>
    <Typography variant="body1">{value || 'N/A'}</Typography>
  </Grid>
);

const AddressDetails = ({ address, title }) => {
  if (!address) return <DetailItem label={title} value="Not specified" />;
  return (
    <Grid item xs={12} sx={{mb:2}}>
      <Typography variant="h6" gutterBottom sx={{mt:1}}>{title}</Typography>
      <Grid container spacing={1}>
        <DetailItem label="Village/Street" value={address.village} />
        <DetailItem label="Town/City" value={address.town} />
        <DetailItem label="Tahsil" value={address.tahsil} />
        <DetailItem label="District" value={address.distinct} />
        <DetailItem label="Province" value={address.province} />
        <DetailItem label="Country" value={address.country} />
      </Grid>
    </Grid>
  );
};


const ViewUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserById(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch user data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ml: 2}}>Loading user details...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading user details: {error}</Alert>;
  }

  if (!user) {
    return <Alert severity="warning">User data not found.</Alert>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          User Details: {user.userName}
        </Typography>
        <Box>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/users')}
                sx={{ mr: 1 }}
            >
                Back to List
            </Button>
            <Button
                variant="contained"
                startIcon={<EditIcon />}
                component={RouterLink}
                to={`/users/edit/${userId}`}
            >
                Edit User
            </Button>
        </Box>
      </Box>
      <Divider sx={{mb:2}} />

      <Typography variant="h6" gutterBottom>Basic Information</Typography>
      <Grid container spacing={2} sx={{mb:2}}>
        <DetailItem label="User ID" value={user.id} />
        <DetailItem label="Username" value={user.userName} />
        <DetailItem label="Email" value={user.email} />
        <DetailItem label="Role" value={user.role} />
        <DetailItem label="Branch" value={user.branch} />
        <DetailItem label="CNIC" value={user.cnic} />
        <DetailItem label="Mobile" value={user.mobile} />
        <DetailItem label="Status" value={user.status} />
      </Grid>

      <Divider sx={{my:2}} />
      <AddressDetails address={user.permanentAddress} title="Permanent Address" />

      <Divider sx={{my:2}} />
      {user.isSameAsPermanent ? (
        <Typography variant="body1" sx={{mb:2}}>Current address is the same as permanent address.</Typography>
      ) : (
        <AddressDetails address={user.currentAddress} title="Current Address" />
      )}

      {/* Add more sections as needed, e.g., Subjects for students/teachers, etc. */}
    </Paper>
  );
};

export default ViewUserPage;
