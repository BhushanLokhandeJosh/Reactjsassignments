import ACTIONS from "../Actions/action";

const stateReducer = (state, Action) => {
  switch (Action.type) {
    case ACTIONS.SET_PAGE_NUMBER:
      return { ...state, pageNumber: Action.payload };

    case ACTIONS.SET_SEARCHTITLE:
      return { ...state, searchtitle: Action.payload };

    case ACTIONS.SET_ORDER:
      return { ...state, order: Action.payload };

    case ACTIONS.SET_SORT:
      return { ...state, sort: Action.payload };

    case ACTIONS.SET_STATUS:
      return { ...state, status: Action.payload };

    case ACTIONS.SET_BUTTONDATA:
      return { ...state, buttondata: Action.payload };

    default:
      return state;
  }
};

export default stateReducer;
