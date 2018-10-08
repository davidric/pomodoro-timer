import React from 'react';
import { render } from 'react-dom';
import css from './styles/style.styl';
import App from './components/App'; 
import Timer from './components/Timer';
import { Provider } from 'react-redux';
import store from './store';
import Raven from 'raven-js';
import { sentry_url } from './data/config';

Raven.config(sentry_url).install();

const router = (
	<Provider store={store}>
		<App>
			<Timer/>
		</App>
	</Provider>
);

render( router , document.getElementById('root'));