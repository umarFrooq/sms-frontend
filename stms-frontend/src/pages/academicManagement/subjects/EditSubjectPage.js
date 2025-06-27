import React, { useState, useEffect } from 'react';
import SubjectForm from '../../../components/academicManagement/subjects/SubjectForm';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// Mock function to simulate fetching subject data
const fetchSubjectById = async (subjectId) => {
  console.log(`Fetching subject with ID: ${subjectId}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

  const mockSubjects = [
    { id: 1, title: 'Introduction to Programming', code: 'CS101', creditHours: '3', description: 'Fundamentals of programming.' },
    { id: 2, title: 'Calculus I', code: 'MA101', creditHours: '4', description: 'Limits, derivatives, and integrals.' },
    { id: 3, title: 'English Composition', code: 'EN100', creditHours: '3', description: 'Developing writing skills.' },
  ];
  const subject = mockSubjects.find(s => s.id.toString() === subjectId);
  if (subject) {
    return subject;
  } else {
    throw new Error('Subject not found');
  }
};

const EditSubjectPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjectById(subjectId)
      .then(data => {
        setInitialData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch subject data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [subjectId]);

  const handleEditSubject = (formData) => {
    // TODO: Implement API call to update subject
    console.log('Updated Subject Data for ID:', subjectId, formData);
    alert(`Subject ${subjectId} updated successfully! (Placeholder)`);
    navigate('/subjects');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading subject data...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading subject data: {error}</Alert>;
  }

  if (!initialData) {
    return <Alert severity="warning">Subject data not found.</Alert>;
  }

  return (
    <Box>
      <SubjectForm onSubmit={handleEditSubject} initialData={initialData} isEditMode={true} />
    </Box>
  );
};

export default EditSubjectPage;
