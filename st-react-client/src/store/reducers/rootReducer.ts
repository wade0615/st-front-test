import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import initReducer from './initReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  sample: sampleReducer,
  init: initReducer,
  loading: loadingReducer
  // ...other reducers...
});

export default rootReducer;
