import axios from "axios";

export const loadUsersApi = async () =>
  await axios.get("http://localhost:8000/contact");

export const createUserApi = async (contact) =>
  await axios.post("http://localhost:8000/contact", contact);

export const deleteUserApi = async (contactId) =>
  await axios.delete(`http://localhost:8000/contact/${contactId}`);

export const updateUserApi = async (contactId, contactInfo) =>
  await axios.put(`http://localhost:8000/contact/${contactId}`, contactInfo);
