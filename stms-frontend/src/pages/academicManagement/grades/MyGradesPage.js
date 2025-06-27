import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, CircularProgress, Alert,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Mock Data - Replace with API call for the logged-in student/child
const mockStudentGrades = [
  {
    term: 'Fall Semester 2023',
    subjects: [
      { id: 'SUB1', name: 'Mathematics', assessments: [{name: 'Midterm', grade: 'A', marks: '92/100'}, {name: 'Final', grade: 'A-', marks: '88/100'}], overallGrade: 'A' },
      { id: 'SUB2', name: 'Physics', assessments: [{name: 'Midterm', grade: 'B+', marks: '85/100'}, {name: 'Lab Work', grade: 'A', marks: '95/100'}, {name: 'Final', grade: 'B', marks: '80/100'}], overallGrade: 'B+' },
      { id: 'SUB3', name: 'English', assessments: [{name: 'Essay 1', grade: 'A-', marks: '87/100'}, {name: 'Presentation', grade: 'A', marks: '90/100'}, {name: 'Final Exam', grade: 'B+', marks: '86/100'}], overallGrade: 'A-' },
    ],
    gpa: '3.80' // Example GPA
  },
  {
    term: 'Spring Semester 2024',
    subjects: [
      { id: 'SUB4', name: 'Computer Science', assessments: [{name: 'Project 1', grade: 'A', marks: '95/100'}, {name: 'Midterm', grade: 'A-', marks: '89/100'}, {name: 'Final', grade: 'A', marks: '92/100'}], overallGrade: 'A' },
      { id: 'SUB5', name: 'History', assessments: [{name: 'Midterm', grade: 'B', marks: '82/100'}, {name: 'Research Paper', grade: 'B+', marks: '86/100'}, {name: 'Final', grade: 'B-', marks: '78/100'}], overallGrade: 'B' },
    ],
    gpa: '3.65'
  },
];


const MyGradesPage = () => {
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // In a real app, studentId would come from auth context
  // const { studentId } = useAuth();

  useEffect(() => {
    setLoading(true);
    // Simulate API call to fetch grades for the logged-in student
    // fetchGradesForStudent(studentId).then(...)
    setTimeout(() => {
      setGradesData(mockStudentGrades);
      setLoading(false);
    }, 1000);
  }, []); // Add studentId to dependency array if it's dynamic

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ml:1}}>Loading your grades...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error fetching grades: {error}</Alert>;
  }

  if (gradesData.length === 0) {
    return <Alert severity="info">No grades are available at this time.</Alert>;
  }

  return (
    <Paper sx={{ p: {xs: 2, md:3}, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        My Grades & Report Card
      </Typography>
      {/* TODO: Add role check here - only visible to Student/Parent */}

      {gradesData.map((termData, index) => (
        <Accordion key={index} defaultExpanded={index === 0} sx={{mb: 2, '&:before': {display: 'none'}, boxShadow: 2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', borderRadius: 1}}
          >
            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <Typography variant="h6">{termData.term}</Typography>
                {termData.gpa && <Typography variant="h6">GPA: {termData.gpa}</Typography>}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{p: {xs: 1, md: 2}}}>
            {termData.subjects.map(subject => (
              <Box key={subject.id} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold', color: 'secondary.main'}}>
                  {subject.name} (Overall: {subject.overallGrade || 'N/A'})
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead sx={{backgroundColor: 'grey.200'}}>
                      <TableRow>
                        <TableCell>Assessment</TableCell>
                        <TableCell>Marks</TableCell>
                        <TableCell>Grade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {subject.assessments.map((assessment, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{assessment.name}</TableCell>
                          <TableCell>{assessment.marks || 'N/A'}</TableCell>
                          <TableCell>{assessment.grade || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}
             {/* Placeholder for Report Card download/view */}
            <Box sx={{mt:3, textAlign: 'right'}}>
                <Button variant="contained" disabled>Download Report Card (Coming Soon)</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default MyGradesPage;
