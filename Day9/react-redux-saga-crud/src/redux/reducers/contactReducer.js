import { actions } from "../../action/actionTypes";

const initialState = [
  {
    id: 0,
    name: "Bhushan",
    number: 9999999999,
    email: "bhushan@gmail.com",
  },
  {
    id: 1,
    name: "Dhawal",
    number: 6758973000,
    email: "dhawal@gmail.com",
  },
  {
    id: 2,
    name: "Maaz",
    number: 6758973567,
    email: "maaz@gmail.com",
  },
  {
    id: 3,
    name: "Shubham",
    number: 9876543210,
    email: "shubham@gmail.com",
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_CONTACT:
      return [...state, action.payload];
    case actions.UPDATE_CONTACT:
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return updateState;
    case actions.DELETE_CONTACT:
      const filteredState = state.filter(
        (contact) => contact.id !== action.payload
      );
      return filteredState;

    default:
      return state;
  }
};

export default contactReducer;
