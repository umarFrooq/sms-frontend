import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <AuthLayout title="Sign Up">
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
