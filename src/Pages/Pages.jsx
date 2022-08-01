import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Modal from "../components/Modal/Modal";

const Pages = () => {
  return (
    
      <Routes>
        <Route path="/brief/:name" element={<Modal />} />
        <Route path="/" element={<Navigate to='/brief' replace />} />
      </Routes>
    
  );
};

export default Pages;
