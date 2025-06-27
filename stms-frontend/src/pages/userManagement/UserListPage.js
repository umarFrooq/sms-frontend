import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, TablePagination, CircularProgress, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink } from 'react-router-dom'; // For navigation

// Mock Data - Replace with API call
const createMockUser = (id, userName, email, role, branch, cnic, mobile, status) => {
  return { id, userName, email, role, branch, cnic, mobile, status };
};

const initialMockUsers = [
  createMockUser(1, 'johndoe', 'john.doe@example.com', 'Admin', 'Main Campus', '12345-1234567-1', '0300-1234567', 'Active'),
  createMockUser(2, 'janeschmoe', 'jane.schmoe@example.com', 'Teacher', 'City Campus', '54321-7654321-2', '0333-7654321', 'Active'),
  createMockUser(3, 'peterjones', 'peter.jones@example.com', 'Student', 'Main Campus', '11223-3445566-7', '0312-3456789', 'Inactive'),
  createMockUser(4, 'alicebrown', 'alice.brown@example.com', 'Parent', 'Online', '98765-4321098-7', '0345-9876543', 'Active'),
  createMockUser(5, 'bobgreen', 'bob.green@example.com', 'Student', 'City Campus', '55555-5555555-5', '0321-5554321', 'Active'),
];

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setUsers(initialMockUsers);
      setLoading(false);
    }, 1000);
    // In a real app:
    // fetchUsers().then(data => setUsers(data)).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = (userId) => {
    // TODO: Implement delete functionality (API call, update state)
    console.log('Delete user:', userId);
    setUsers(users.filter(user => user.id !== userId)); // Optimistic update for now
    alert(`User with ID ${userId} would be deleted. (Placeholder)`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error fetching users: {error}</Alert>;
  }

  const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: 3, margin: 'auto', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/users/add" //  Will define this route later
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
              <TableCell>Branch</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 && !loading ? (
                <TableRow>
                    <TableCell colSpan={8} align="center">
                        No users found.
                    </TableCell>
                </TableRow>
            ) : (
                paginatedUsers.map((user) => (
              <TableRow hover key={user.id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.cnic}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>
                   <Typography
                        variant="body2"
                        sx={{
                            color: user.status === 'Active' ? 'success.main' : 'error.main',
                            fontWeight: 'bold'
                        }}
                    >
                        {user.status}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="view"
                    size="small"
                    component={RouterLink}
                    to={`/users/view/${user.id}`} // Will define this route later
                    sx={{ color: 'primary.main' }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    component={RouterLink}
                    to={`/users/edit/${user.id}`} // Will define this route later
                    sx={{ color: 'secondary.main' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
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
