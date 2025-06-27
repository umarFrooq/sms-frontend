import React, { useState, useEffect } from 'react';
import SubjectForm from '../../../components/academicManagement/subjects/SubjectForm';
import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// Mock function to simulate fetching subject data - replace with actual API call
const fetchSubjectById = async (subjectId) => {
  console.log(`Mock Fetch: Subject with ID: ${subjectId}`);
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay

  const mockSubjectsList = [ // Consistent with SubjectListPage mock data
    { id: 1, title: 'Introduction to Programming', code: 'CS101', creditHours: '3', description: 'Fundamentals of programming concepts using a high-level language. Covers basic syntax, control structures, data types, and problem-solving techniques.', teacher: 'Dr. Ada Lovelace' },
    { id: 2, title: 'Calculus I', code: 'MA101', creditHours: '4', description: 'Introduction to differential and integral calculus. Topics include limits, continuity, derivatives, and their applications, as well as basic integration techniques.', teacher: 'Prof. Isaac Newton' },
    { id: 3, title: 'English Composition', code: 'EN100', creditHours: '3', description: 'Focuses on developing effective writing skills for academic and professional purposes, including argumentation, research, and revision.', teacher: 'Ms. Jane Austen' },
    { id: 4, title: 'Physics for Engineers', code: 'PHY102', creditHours: '4', description: 'Covers classical mechanics, heat, light, sound, electricity, and magnetism, with an emphasis on applications relevant to engineering disciplines.', teacher: 'Dr. Albert Einstein' },
    { id: 5, title: 'Data Structures & Algorithms', code: 'CS201', creditHours: '3', description: 'Study of fundamental data structures (arrays, linked lists, trees, graphs, hash tables) and algorithm analysis. Includes sorting, searching, and graph algorithms.', teacher: 'Dr. Ada Lovelace' },
    { id: 6, title: 'Linear Algebra', code: 'MA202', creditHours: '3', description: 'Vector spaces, linear transformations, matrices, determinants, eigenvalues, and eigenvectors. Applications in various fields.', teacher: 'Prof. Isaac Newton' },
  ];
  const subject = mockSubjectsList.find(s => s.id.toString() === subjectId);
  if (subject) {
    return subject; // Return the found subject
  } else {
    throw new Error(`Subject with ID ${subjectId} not found in mock data.`);
  }
};

const EditSubjectPage = () => {
  const { subjectId } = useParams(); // Get subjectId from URL
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (subjectId) {
      setLoading(true);
      fetchSubjectById(subjectId)
        .then(data => {
          setInitialData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch subject data for edit:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [subjectId]);

  const handleEditSubject = (formData) => {
    // TODO: Implement API call to update subject
    console.log('Updated Subject Data for ID:', subjectId, formData);
    alert(`Subject ${subjectId} information updated successfully! (Placeholder - API call needed)`);
    navigate('/subjects'); // Redirect to subject list page
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
        <CircularProgress />
        <Typography sx={{ml: 2}}>Loading subject data for editing...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{m:2}}>Error loading subject data: {error}</Alert>;
  }

  if (!initialData && !loading) {
    return <Alert severity="warning" sx={{m:2}}>Subject data could not be loaded or found.</Alert>;
  }

  return (
    <Box>
      {/* <Typography variant="h4" gutterBottom sx={{mb: 2}}>Edit Subject Details</Typography> */}
      {initialData && <SubjectForm onSubmit={handleEditSubject} initialData={initialData} isEditMode={true} />}
    </Box>
  );
};

export default EditSubjectPage;
