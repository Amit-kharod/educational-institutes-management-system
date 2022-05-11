import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import StateLoader from "./utils/stateLoader"

const stateLoader = new StateLoader();
const middleware = [thunk];

const store = createStore(
  rootReducer,stateLoader.loadState(),
  composeWithDevTools(applyMiddleware(...middleware)),
);

store.subscribe(() => {
  //this is just a function that saves state to localStorage
  stateLoader.saveState(store.getState());
}); 
console.log(store.getState())

export default store;
