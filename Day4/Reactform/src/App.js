import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./Components/Home";
import ActivityList from "./Components/ActivityList";
import BlogEdit from "./Components/BlogEdit";
import Form from "./Components/Form";
import DeleteBlog from "./Components/DeleteBlog";
import BlogInfo from "./Components/BlogInfo";

import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Form />}></Route>

          <Route path="/blogdetails/:id" element={<BlogInfo />}></Route>

          <Route
            path="/blogs/edit/:id/:status/:DueDate"
            element={<BlogEdit />}
          ></Route>

          <Route
            path="/blogs/delete/:id"
            element={<DeleteBlog></DeleteBlog>}
          ></Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
