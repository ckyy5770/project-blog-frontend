import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import rootReducer from './reducers/rootReducer'

import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import NavigationBar from './components/NavigationBar'


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => {
	return (
		<Provider store={createStoreWithMiddleware(rootReducer)}>
			<BrowserRouter>
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<NavigationBar />
						</div>
						<div className="row">
							<Switch>
								<Route path="/login" component={LoginPage}/>
								<Route path="/" component={IndexPage} />

							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		</Provider>
	)
};

ReactDOM.render(<App />, document.querySelector('.container'));
