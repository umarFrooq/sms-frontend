import React from 'react';
import SubjectForm from '../../../components/academicManagement/subjects/SubjectForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddSubjectPage = () => {
  const navigate = useNavigate();

  const handleAddSubject = (formData) => {
    // TODO: Implement API call to add subject
    console.log('New Subject Data:', formData);
    // Simulate successful API call
    alert('Subject added successfully! (Placeholder)');
    navigate('/subjects'); // Redirect to subject list page
  };

  return (
    <Box>
      <SubjectForm onSubmit={handleAddSubject} isEditMode={false} />
    </Box>
  );
};

export default AddSubjectPage;
