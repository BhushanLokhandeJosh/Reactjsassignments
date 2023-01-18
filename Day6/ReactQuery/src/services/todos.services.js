import { DELETE, GET, PATCH, POST } from "./api";

export const getAllTodos = (params) => {
  console.log("In get todo api");
  return GET("/todo", params);
};

export const getTodoById = (id) => {
  return GET(`/todo/${id}`);
};
export const patchTodo = (id, body) => {
  return PATCH(`/todo/${id}`, body);
};
export const postTodo = (body) => {
  console.log("In post method...");
  return POST("/todo", body);
};

export const deleteTodo = (id) => {
  return DELETE(`/todo/${id}`);
};
