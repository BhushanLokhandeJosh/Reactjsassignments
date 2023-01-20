import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./Components/Home";
import Form from "./Components/Form";
import DeleteTodo from "./Components/DeleteTodo";
import TodoInfo from "./Components/TodoInfo";

import "./App.css";
import CreateTodoFormik from "./Components/CreateTodoFormik";
import TodoEditFormik from "./Components/TodoEditFormik";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<CreateTodoFormik />}></Route>

          <Route path="/tododetails/:id" element={<TodoInfo />}></Route>

          <Route path="/todos/edit/:id" element={<TodoEditFormik />}></Route>

          <Route path="/todos/delete/:id" element={<DeleteTodo />}></Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
