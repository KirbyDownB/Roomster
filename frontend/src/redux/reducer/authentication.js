const initialState = {
  user: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {...state, user: action.payload};
    case 'USER_LOGOUT':
      return {user: {}};
    default: return state;
  }
}
