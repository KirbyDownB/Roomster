const initialState = {
  user: {}
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'USER_LOGIN':
      return {...state, user: action.payload};
    default: return state;
  }
}
