import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, TablePagination, CircularProgress, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';

// Mock Data - Replace with API call
const createMockSubject = (id, title, code, creditHours, teacher) => {
  return { id, title, code, creditHours, teacher };
};

const initialMockSubjects = [
  createMockSubject(1, 'Introduction to Programming', 'CS101', 3, 'Dr. Smith'),
  createMockSubject(2, 'Calculus I', 'MA101', 4, 'Prof. Jones'),
  createMockSubject(3, 'English Composition', 'EN100', 3, 'Ms. Davis'),
  createMockSubject(4, 'Physics for Engineers', 'PHY102', 4, 'Dr. Brown'),
  createMockSubject(5, 'Data Structures', 'CS201', 3, 'Dr. Smith'),
];

const SubjectListPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setSubjects(initialMockSubjects);
      setLoading(false);
    }, 1000); // Simulate API call
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteSubject = (subjectId) => {
    // TODO: Implement delete functionality (API call, update state)
    console.log('Delete subject:', subjectId);
    setSubjects(subjects.filter(subject => subject.id !== subjectId)); // Optimistic update
    alert(`Subject with ID ${subjectId} would be deleted. (Placeholder)`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error fetching subjects: {error}</Alert>;
  }

  const paginatedSubjects = subjects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: 3, margin: 'auto', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Subjects Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/subjects/add"
        >
          Add Subject
        </Button>
      </Box>

      <TableContainer>
        <Table stickyHeader aria-label="subjects table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Credit Hours</TableCell>
              <TableCell>Teacher (Placeholder)</TableCell>
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
                  <TableCell>{subject.id}</TableCell>
                  <TableCell>{subject.title}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>{subject.creditHours}</TableCell>
                  <TableCell>{subject.teacher}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      component={RouterLink}
                      to={`/subjects/edit/${subject.id}`}
                      sx={{ color: 'secondary.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
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
