import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import css from './styles/style.styl';
import App from './components/App'; 
import Timer from './components/Timer'; 
// import Photo from './components/Photo'; 
// import Single from './components/Single'; 
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import store, {history} from './store';

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