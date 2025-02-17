import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import initReducer from './initReducer';

const rootReducer = combineReducers({
  sample: sampleReducer,
  init: initReducer
  // ...other reducers...
});

export default rootReducer;
