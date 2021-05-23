export const initialState = {
  user: null,
  isLogin: false,
  rooms: [],
  triger: false,
  messageTriger: false,
  messages: [],
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
  } else if (action.type === "MESSAGE_TRI") {
    return { ...state, messageTriger: action.payload };
  } else if (action.type === "ROOM_MESSAGES") {
    return { ...state, messages: action.payload };
  }

  return state;
};
