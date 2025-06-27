import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Alert, Divider, Button, Chip } from '@mui/material';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Mock function to simulate fetching user data - replace with actual API call
const fetchUserById = async (userId) => {
  console.log(`Mock Fetch for View: User ID: ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const mockUsersFromList = [
    { id: 1, userName: 'johndoe', email: 'john.doe@example.com', role: 'Admin', branch: 'Main Campus', cnic: '12345-1234567-1', mobile: '0300-1234567', status: 'Active', permanentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', district: 'District A', province: 'Province X', country: 'Pakistan' }, currentAddress: { village: '123 Main St', town: 'Cityville', tahsil: 'Central', district: 'District A', province: 'Province X', country: 'Pakistan' }, isSameAsPermanent: true },
    { id: 2, userName: 'janeschmoe', email: 'jane.schmoe@example.com', role: 'Teacher', branch: 'City Campus', cnic: '54321-7654321-2', mobile: '0333-7654321', status: 'Active', permanentAddress: { village: '456 Oak Ave', town: 'Townsburgh', tahsil: 'North', district: 'District B', province: 'Province Y', country: 'Pakistan' }, currentAddress: { village: '789 Pine Rd', town: 'Townsburgh', tahsil: 'North', district: 'District B', province: 'Province Y', country: 'Pakistan' }, isSameAsPermanent: false },
    { id: 3, userName: 'peterjones', email: 'peter.jones@example.com', role: 'Student', branch: 'Main Campus', cnic: '11223-3445566-7', mobile: '0312-3456789', status: 'Inactive', permanentAddress: { village: 'House 10, St 5', town: 'Village View', tahsil: 'South', district: 'District C', province: 'Province Z', country: 'Pakistan' }, currentAddress: { village: 'Apt 5B, Tower 1', town: 'Metro City', tahsil: 'Urban', district: 'District D', province: 'Province W', country: 'Pakistan' }, isSameAsPermanent: false },
  ];
  const user = mockUsersFromList.find(u => u.id.toString() === userId);
  if (user) {
    return user;
  } else {
    throw new Error(`User with ID ${userId} not found in mock data.`);
  }
};

const DetailItem = ({ label, value, chipColor }) => (
  <Grid item xs={12} sm={6} md={4}> {/* Adjusted grid for potentially more items */}
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>{label}</Typography>
    {chipColor ? (
      <Chip label={value || 'N/A'} color={chipColor} size="small" />
    ) : (
      <Typography variant="body1">{value || 'N/A'}</Typography>
    )}
  </Grid>
);

const AddressDetails = ({ address, title }) => {
  if (!address || Object.values(address).every(val => !val) ) { // Check if address object is empty or all values are empty
    return (
      <Grid item xs={12} sx={{mb:2}}>
        <Typography variant="h6" gutterBottom sx={{mt:1}}>{title}</Typography>
        <Typography variant="body1" color="text.secondary">Address details not provided.</Typography>
      </Grid>
    );
  }
  return (
    <Grid item xs={12} sx={{mb:2}}>
      <Typography variant="h6" gutterBottom sx={{mt:1, borderBottom: 1, borderColor: 'divider', pb: 1}}>{title}</Typography>
      <Grid container spacing={1.5} sx={{pt:1}}>
        <DetailItem label="Village/Street/House No." value={address.village} />
        <DetailItem label="Town/City" value={address.town} />
        <DetailItem label="Tahsil/Sector" value={address.tahsil} />
        <DetailItem label="District" value={address.district} />
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
    if (userId) {
      setLoading(true);
      fetchUserById(userId)
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch user data for view:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
        <CircularProgress />
        <Typography sx={{ml: 2}}>Loading user details...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{m:2}}>Error loading user details: {error}</Alert>;
  }

  if (!user && !loading) {
    return <Alert severity="warning" sx={{m:2}}>User data could not be loaded or found.</Alert>;
  }

  // To prevent rendering error if user is null briefly after loading=false and before user set from async.
  if (!user) return null;

  return (
    <Paper sx={{ p: {xs:2, sm:3} }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h5" component="div" gutterBottom sx={{flexGrow: 1}}> {/* Added component for semantic */}
          User Profile: <strong>{user.userName}</strong>
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
            {/* TODO: Role-based rendering for Edit button */}
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
        <DetailItem label="Status" value={user.status} chipColor={user.status === 'Active' ? 'success' : 'error'} />
      </Grid>

      <AddressDetails address={user.permanentAddress} title="Permanent Address" />

      {user.isSameAsPermanent ? (
        <Typography variant="body1" sx={{mb:2, fontStyle: 'italic', color: 'text.secondary'}}>Current address is the same as permanent address.</Typography>
      ) : (
        <AddressDetails address={user.currentAddress} title="Current Address" />
      )}

      {/* TODO: Add more sections based on user role or other data, e.g., Subjects for students/teachers, etc. */}
    </Paper>
  );
};

export default ViewUserPage;
