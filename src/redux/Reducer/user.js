const initialState = {
  loading: false,
  loggedIn: false,
  username: null,
  email: null,
  id: null,
  RecordClick: [],
};

const userData = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'LOGIN':
      return {...state, ...action.payload, loggedIn: true};

    case 'INSET_NEW':
      return {...state, RecordClick: [...action.payload]};

    case 'EDIT':
      const exitdata = state.RecordClick.filter(
        e => e._id != action.payload._id,
      );
      const final = [...exitdata, action.payload];
      return {...state, RecordClick: [...exitdata, action.payload]};

    case 'DEL':
      const {_id} = action.payload;
      const data = state.RecordClick.filter(e => e._id != _id);
      return {
        ...state,
        RecordClick: [...data],
      };

    case 'LOGOUT':
      return {...state, loggedIn: false};

    default:
      return state;
  }
};
export default userData;
