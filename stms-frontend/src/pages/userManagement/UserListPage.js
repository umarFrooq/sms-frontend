import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, TablePagination, CircularProgress, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink } from 'react-router-dom';

// Mock Data
const createMockUser = (id, userName, email, role, branch, cnic, mobile, status) => {
  return { id, userName, email, role, branch, cnic, mobile, status };
};

const initialMockUsers = [
  createMockUser(1, 'johndoe', 'john.doe@example.com', 'Admin', 'Main Campus', '12345-1234567-1', '0300-1234567', 'Active'),
  createMockUser(2, 'janeschmoe', 'jane.schmoe@example.com', 'Teacher', 'City Campus', '54321-7654321-2', '0333-7654321', 'Active'),
  createMockUser(3, 'peterjones', 'peter.jones@example.com', 'Student', 'Main Campus', '11223-3445566-7', '0312-3456789', 'Inactive'),
  createMockUser(4, 'alicebrown', 'alice.brown@example.com', 'Parent', 'Online', '98765-4321098-7', '0345-9876543', 'Active'),
];

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers(initialMockUsers);
      setLoading(false);
    }, 500); // Simulate API call
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    // TODO: Implement delete functionality (API call, update state, confirmation dialog)
    console.log('Attempting to delete user:', userId);
    // Optimistic update for UI demo
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    alert(`User with ID ${userId} would be deleted. (Placeholder - API call needed)`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress /> <Typography sx={{ml:1}}>Loading users...</Typography>
      </Box>
    );
  }

  if (error) { // Although setError is not used to set an error in this mock, this structure is good for real API calls
    return <Alert severity="error">Error fetching users: {error}</Alert>;
  }

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, margin: 'auto', overflowX: 'auto' }}> {/* Responsive padding */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom component="div"> {/* Added component="div" for semantic correctness */}
          User Management
        </Typography>
        {/* TODO: Role-based rendering for this button (e.g., admin only) */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/users/add"
        >
          Add User
        </Button>
      </Box>

      {/* TODO: Add filtering/search inputs here */}

      <TableContainer>
        <Table stickyHeader aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell sx={{display: {xs: 'none', md: 'table-cell'}}}>Branch</TableCell> {/* Hide on small screens */}
              <TableCell sx={{display: {xs: 'none', lg: 'table-cell'}}}>CNIC</TableCell> {/* Hide on small/medium screens */}
              <TableCell sx={{display: {xs: 'none', md: 'table-cell'}}}>Mobile</TableCell> {/* Hide on small screens */}
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 && !loading ? (
                <TableRow>
                    <TableCell colSpan={8} align="center"> {/* Adjusted colSpan */}
                        No users found.
                    </TableCell>
                </TableRow>
            ) : (
                paginatedUsers.map((user) => (
              <TableRow hover key={user.id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell sx={{display: {xs: 'none', md: 'table-cell'}}}>{user.branch}</TableCell>
                <TableCell sx={{display: {xs: 'none', lg: 'table-cell'}}}>{user.cnic}</TableCell>
                <TableCell sx={{display: {xs: 'none', md: 'table-cell'}}}>{user.mobile}</TableCell>
                <TableCell>
                   <Typography
                        variant="body2"
                        sx={{
                            color: user.status === 'Active' ? 'success.main' : 'error.main',
                            fontWeight: 'medium' // slightly bolder
                        }}
                    >
                        {user.status}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="view user"
                    size="small"
                    component={RouterLink}
                    to={`/users/view/${user.id}`}
                    sx={{ color: 'primary.main', mr: {xs: 0, sm: 0.5} }} // Responsive margin
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {/* TODO: Role-based rendering for these buttons */}
                  <IconButton
                    aria-label="edit user"
                    size="small"
                    component={RouterLink}
                    to={`/users/edit/${user.id}`}
                    sx={{ color: 'secondary.main', mr: {xs: 0, sm: 0.5} }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete user"
                    size="small"
                    onClick={() => handleDeleteUser(user.id)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UserListPage;
