import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { OtpVerify } from './pages/VerifyOtp'

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verify-otp" element={<OtpVerify/>} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </>
  )
}

export default App