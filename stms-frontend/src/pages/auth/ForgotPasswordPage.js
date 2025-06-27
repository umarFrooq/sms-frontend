import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout title="Forgot Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
