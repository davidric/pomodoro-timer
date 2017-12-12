import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import buttons from './buttons';

const rootReducer = combineReducers({buttons, routing: routerReducer});

export default rootReducer;