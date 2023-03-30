import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import ViewContact from "./components/ViewContact";


import "./App.css";

export const LocationDisplay = () => {
  const location = useLocation();
  console.log()
  return <div data-testid="location-display">{location.pathname}</div>;
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />

        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/add" element={<AddContact />} />

          <Route path="/edit/:id" element={<EditContact />} />

          <Route path="/viewinfo/:id" element={<ViewContact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
