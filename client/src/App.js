import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "./components/homepage/Navbar";
import "./app.css";
import LoginBox from "./components/homepage/LoginBox";
import SignupBox from "./components/homepage/SignupBox";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path="/login" element={<LoginBox />} />
      <Route exact path="/signup" element={<SignupBox />} />
    </Routes>
  </BrowserRouter>
);

export default App;
