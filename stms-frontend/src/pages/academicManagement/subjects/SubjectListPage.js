import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, TablePagination, CircularProgress, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility'; // If a view page is needed
import { Link as RouterLink } from 'react-router-dom';

// Mock Data - Replace with API call
const createMockSubject = (id, title, code, creditHours, teacher) => {
  return { id, title, code, creditHours, teacher }; // teacher is placeholder
};

const initialMockSubjects = [
  createMockSubject(1, 'Introduction to Programming', 'CS101', 3, 'Dr. Ada Lovelace'),
  createMockSubject(2, 'Calculus I', 'MA101', 4, 'Prof. Isaac Newton'),
  createMockSubject(3, 'English Composition', 'EN100', 3, 'Ms. Jane Austen'),
  createMockSubject(4, 'Physics for Engineers', 'PHY102', 4, 'Dr. Albert Einstein'),
  createMockSubject(5, 'Data Structures & Algorithms', 'CS201', 3, 'Dr. Ada Lovelace'),
  createMockSubject(6, 'Linear Algebra', 'MA202', 3, 'Prof. Isaac Newton'),
];

const SubjectListPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSubjects(initialMockSubjects);
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

  const handleDeleteSubject = (subjectId) => {
    // TODO: Implement delete functionality (API call, update state, confirmation dialog)
    console.log('Attempting to delete subject:', subjectId);
    setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== subjectId)); // Optimistic update
    alert(`Subject with ID ${subjectId} would be deleted. (Placeholder - API call needed)`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress /> <Typography sx={{ml:1}}>Loading subjects...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error fetching subjects: {error}</Alert>;
  }

  const paginatedSubjects = subjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: {xs: 2, sm: 3}, margin: 'auto', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Subjects Management
        </Typography>
        {/* TODO: Role-based rendering for this button (e.g., admin/registrar only) */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/subjects/add"
        >
          Add Subject
        </Button>
      </Box>

      {/* TODO: Add filtering/search inputs here */}

      <TableContainer>
        <Table stickyHeader aria-label="subjects table">
          <TableHead>
            <TableRow>
              <TableCell sx={{display: {xs: 'none', sm: 'table-cell'}}}>ID</TableCell> {/* Hide ID on extra small screens */}
              <TableCell>Title</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Credit Hours</TableCell>
              <TableCell sx={{display: {xs: 'none', md: 'table-cell'}}}>Teacher (Placeholder)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSubjects.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No subjects found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedSubjects.map((subject) => (
                <TableRow hover key={subject.id}>
                  <TableCell sx={{display: {xs: 'none', sm: 'table-cell'}}}>{subject.id}</TableCell>
                  <TableCell>{subject.title}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell align="center">{subject.creditHours}</TableCell>
                  <TableCell sx={{display: {xs: 'none', md: 'table-cell'}}}>{subject.teacher}</TableCell>
                  <TableCell align="center">
                    {/* <IconButton
                      aria-label="view subject"
                      size="small"
                      component={RouterLink}
                      to={`/subjects/view/${subject.id}`} // If a view page is needed
                      sx={{ color: 'info.main', mr: {xs:0, sm:0.5}}} >
                      <VisibilityIcon />
                    </IconButton> */}
                    {/* TODO: Role-based rendering for these buttons */}
                    <IconButton
                      aria-label="edit subject"
                      size="small"
                      component={RouterLink}
                      to={`/subjects/edit/${subject.id}`}
                      sx={{ color: 'secondary.main', mr: {xs:0, sm:0.5} }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete subject"
                      size="small"
                      onClick={() => handleDeleteSubject(subject.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={subjects.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SubjectListPage;
