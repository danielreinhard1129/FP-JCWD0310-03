'use client'
import AuthGuard from '@/hoc/AuthGuard';
import React from 'react';

const Outlet = () => {
  return <div>Outlet</div>;
};

export default AuthGuard(Outlet);
