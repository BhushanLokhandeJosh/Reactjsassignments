import * as types from "../action/actionTypes";

export const loadUsersStart = () => ({
  type: types.LOAD_USERS_START,
});

export const loadUsersSuccess = (contact) => ({
  type: types.LOAD_USERS_SUCCESS,
  payload: contact,
});

export const loadUsersError = (error) => ({
  type: types.LOAD_USERS_ERROR,
  payload: error,
});

export const createUserStart = (contact) => ({
  type: types.CREATE_USER_START,
  payload: contact,
});

export const createUserSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
});

export const createUserError = (error) => ({
  type: types.CREATE_USER_ERROR,
  payload: error,
});

export const deleteUserStart = (contactId) => ({
  type: types.DELETE_USER_START,
  payload: contactId,
});

export const deleteUserSuccess = (contactId) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: contactId,
});

export const deleteUserError = (error) => ({
  type: types.DELETE_USER_ERROR,
  payload: error,
});

export const updateUserStart = (contactInfo) => ({
  type: types.UPDATE_USER_START,
  payload: contactInfo,
});

export const updateUserSuccess = () => ({
  type: types.UPDATE_USER_SUCCESS,
});

export const updateUserError = (error) => ({
  type: types.UPDATE_USER_ERROR,
  payload: error,
});
