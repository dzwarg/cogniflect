import { combineReducers } from 'redux'
import initialState from './initialState'; 

const appState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return state.setIn(action.payload.path, action.payload.value);
    default:
      return state
  }
}

export default combineReducers({
  appState
});