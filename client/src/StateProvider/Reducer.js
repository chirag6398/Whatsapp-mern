export const initialState = {
  user: null,
  isLogin: false,
  rooms: [],
  triger: false,
};

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "ADD_ROOM") {
    return { ...state, rooms: action.payload };
  } else if (action.type === "USER_LOGINED") {
    return {
      ...state,
      isLogin: action.payload,
    };
  } else if (action.type === "TRIGER_CALL") {
    return { ...state, triger: action.payload };
  }

  return state;
};
