import React from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthLayout title="Sign In">
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
