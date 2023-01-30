import { actions } from "./actionTypes";

export const addAction = (payload) => {
  return {
    type: actions.ADD_CONTACT,
    payload,
  };
};

export const updateAction = (payload) => {
  return {
    type: actions.UPDATE_CONTACT,
    payload,
  };
};

export const deleteAction = (payload) => {
  return {
    type: actions.DELETE_CONTACT,
    payload,
  };
};
