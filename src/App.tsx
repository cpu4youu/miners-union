import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import { GetStarted, Signup } from './views'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />      
      </Routes>      
      {/* <GetStarted /> */}
      {/* <Signup /> */}
    </>
  );
}

export default App;
