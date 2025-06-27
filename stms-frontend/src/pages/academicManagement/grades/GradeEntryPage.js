import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Grid, MenuItem, Select, InputLabel,
  FormControl, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, CircularProgress, Alert
} from '@mui/material';

// Mock Data - Replace with API calls
const mockClasses = [
  { id: 'C1', name: 'Grade 10' },
  { id: 'C2', name: 'Grade 11' },
  { id: 'C3', name: 'Grade 12' },
];

const mockSections = {
  C1: [{ id: 'S1A', name: 'Section A' }, { id: 'S1B', name: 'Section B' }],
  C2: [{ id: 'S2A', name: 'Section A' }],
  C3: [{ id: 'S3A', name: 'Section A' }, { id: 'S3B', name: 'Section B' }, { id: 'S3C', name: 'Section C' }],
};

const mockSubjects = [ // Assuming these are subjects available for the selected class
  { id: 'SUB1', name: 'Mathematics' },
  { id: 'SUB2', name: 'Physics' },
  { id: 'SUB3', name: 'English' },
];

const mockAssessmentTypes = [
  { id: 'AT1', name: 'Midterm Exam' },
  { id: 'AT2', name: 'Final Exam' },
  { id: 'AT3', name: 'Assignment 1' },
  { id: 'AT4', name: 'Class Test 1' },
];

const mockStudents = [ // Students for a selected class & section
  { id: 'STU001', name: 'Alice Johnson', currentGrade: '' },
  { id: 'STU002', name: 'Bob Williams', currentGrade: '' },
  { id: 'STU003', name: 'Charlie Brown', currentGrade: '' },
  { id: 'STU004', name: 'Diana Miller', currentGrade: '' },
  { id: 'STU005', name: 'Edward Davis', currentGrade: '' },
];

const GradeEntryPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [availableSections, setAvailableSections] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedClass) {
      setAvailableSections(mockSections[selectedClass] || []);
      setSelectedSection(''); // Reset section when class changes
    } else {
      setAvailableSections([]);
    }
  }, [selectedClass]);

  const handleFetchStudents = () => {
    if (!selectedClass || !selectedSection || !selectedSubject || !selectedAssessment) {
      setError('Please select Class, Section, Subject, and Assessment Type.');
      setStudents([]);
      return;
    }
    setError(null);
    setLoadingStudents(true);
    // Simulate API call to fetch students for the selected criteria
    console.log('Fetching students for:', { selectedClass, selectedSection, selectedSubject, selectedAssessment });
    setTimeout(() => {
      // In a real app, filter mockStudents based on class/section or fetch from API
      // For now, just use the full mockStudents list and reset grades
      setStudents(mockStudents.map(s => ({ ...s, currentGrade: '' })));
      setLoadingStudents(false);
    }, 1500);
  };

  const handleGradeChange = (studentId, value) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, currentGrade: value } : student
      )
    );
  };

  const handleSaveGrades = () => {
    // TODO: Implement API call to save grades
    console.log('Saving Grades:', students.map(s => ({ studentId: s.id, grade: s.currentGrade, subjectId: selectedSubject, assessmentId: selectedAssessment })));
    alert('Grades saved successfully! (Placeholder)');
    // Optionally reset form or navigate away
  };

  return (
    <Paper sx={{ p: 3, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Enter Student Grades
      </Typography>

      {/* TODO: Add role check here - only visible to Teacher/Admin */}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth required>
            <InputLabel>Class</InputLabel>
            <Select value={selectedClass} label="Class" onChange={(e) => setSelectedClass(e.target.value)}>
              <MenuItem value=""><em>Select Class</em></MenuItem>
              {mockClasses.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth required disabled={!selectedClass}>
            <InputLabel>Section</InputLabel>
            <Select value={selectedSection} label="Section" onChange={(e) => setSelectedSection(e.target.value)}>
              <MenuItem value=""><em>Select Section</em></MenuItem>
              {availableSections.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth required>
            <InputLabel>Subject</InputLabel>
            <Select value={selectedSubject} label="Subject" onChange={(e) => setSelectedSubject(e.target.value)}>
              <MenuItem value=""><em>Select Subject</em></MenuItem>
              {mockSubjects.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth required>
            <InputLabel>Assessment Type</InputLabel>
            <Select value={selectedAssessment} label="Assessment Type" onChange={(e) => setSelectedAssessment(e.target.value)}>
               <MenuItem value=""><em>Select Assessment</em></MenuItem>
              {mockAssessmentTypes.map(at => <MenuItem key={at.id} value={at.id}>{at.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'right' }}>
          <Button variant="outlined" onClick={handleFetchStudents} disabled={loadingStudents}>
            {loadingStudents ? <CircularProgress size={24} sx={{mr:1}}/> : null}
            Load Students
          </Button>
        </Grid>
      </Grid>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {students.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Enter Grades for {mockSubjects.find(s => s.id === selectedSubject)?.name} - {mockAssessmentTypes.find(at => at.id === selectedAssessment)?.name}
          </Typography>
          <TableContainer component={Paper} sx={{ mt: 1, boxShadow: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell sx={{width: '150px'}}>Grade/Marks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={student.currentGrade}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        // TODO: Add validation for grade format (e.g., numeric, A-F)
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSaveGrades}>
              Save All Grades
            </Button>
          </Box>
        </>
      )}
      {loadingStudents && (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
            <CircularProgress />
            <Typography sx={{ml:1}}>Loading students...</Typography>
        </Box>
      )}
       {!loadingStudents && students.length === 0 && selectedClass && selectedSection && selectedSubject && selectedAssessment && (
        <Typography sx={{textAlign: 'center', my: 3}}>No students found for the selected criteria or click "Load Students".</Typography>
      )}
    </Paper>
  );
};

export default GradeEntryPage;
