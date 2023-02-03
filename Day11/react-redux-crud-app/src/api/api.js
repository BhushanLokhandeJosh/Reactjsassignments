import axios from "axios";

export const MOCKAPI = "http://localhost:8000/contact";

export const loadUsersApi = async () =>
  await axios.get(MOCKAPI);

export const createUserApi = async (contact) =>
  await axios.post(MOCKAPI, contact);

export const deleteUserApi = async (contactId) =>
  await axios.delete(`${MOCKAPI}/${contactId}`);

export const updateUserApi = async (contactId, contactInfo) =>
  await axios.put(`${MOCKAPI}/${contactId}`, contactInfo);
