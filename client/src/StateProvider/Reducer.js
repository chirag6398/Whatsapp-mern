export const initialState = {
  user: null,
  rooms: [],
};

export const reducer = (state, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.user,
    };
  } else if (action.type === "ADD_ROOM") {
    let currTime = new Date();

    let obj = {
      name: action.payload,
      id: currTime.getTime().toLocaleString(),
    };
    let updateRooms = [...state.rooms, obj];

    return { ...state, rooms: updateRooms };
  }

  return state;
};
