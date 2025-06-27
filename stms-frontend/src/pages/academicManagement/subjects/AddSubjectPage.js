import React from 'react';
import SubjectForm from '../../../components/academicManagement/subjects/SubjectForm';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddSubjectPage = () => {
  const navigate = useNavigate();

  const handleAddSubject = (formData) => {
    // TODO: Implement API call to add subject
    console.log('New Subject Data to submit:', formData);
    // Simulate successful API call
    alert('Subject created successfully! (Placeholder - API call needed)');
    navigate('/subjects'); // Redirect to subject list page
  };

  return (
    <Box>
      {/* Optional: Page Title if not handled by MainLayout or a higher component */}
      {/* <Typography variant="h4" gutterBottom sx={{mb: 2}}>Create New Subject</Typography> */}
      <SubjectForm onSubmit={handleAddSubject} isEditMode={false} />
    </Box>
  );
};

export default AddSubjectPage;
