const initialState = {
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AddUser':
      return { ...state, user: action.payload };

    case 'DelUser':
      return { ...state, user: {} };

    default:
      return state;
  }
};

export default authReducer;
