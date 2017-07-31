import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history'
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer'

import IndexPage from './components/pages/IndexPage'
import LoginPage from './components/pages/LoginPage'
import NavigationBar from './components/NavigationBar'


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const App = () => {
	return (
		<Provider store={createStoreWithMiddleware(rootReducer)}>
			<Router history={history}>
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
			</Router>
		</Provider>
	)
};

ReactDOM.render(<App />, document.querySelector('.container'));
