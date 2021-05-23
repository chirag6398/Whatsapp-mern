export const initialState = {
  user: null,
  isLogin: false,
  rooms: [],
};

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return {
      ...state,
      user: action.payload,
    };
  } else if (action.type === "ADD_ROOM") {
    // let currTime = new Date();

    // let obj = {
    //   name: action.payload,
    //   id: currTime.getTime().toLocaleString(),
    // };
    // let updateRooms = [...state.rooms, obj];

    return { ...state, rooms: action.payload };
  } else if (action.type === "USER_LOGINED") {
    return {
      ...state,
      isLogin: action.payload,
    };
  }

  return state;
};
