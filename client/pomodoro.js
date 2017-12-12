import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import css from './styles/style.styl';
import App from './components/App'; 
import Timer from './components/Timer';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store, {history} from './store';

import Raven from 'raven-js';
import { sentry_url } from './data/config';

Raven.config(sentry_url).install();

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Timer}></IndexRoute>
			</Route>
		</Router>
	</Provider>
)

render( router , document.getElementById('root'));