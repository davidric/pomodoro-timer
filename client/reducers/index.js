import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import buttons from './buttons';
import time from './time';

const rootReducer = combineReducers({buttons, time, routing: routerReducer});

export default rootReducer;