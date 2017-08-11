import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history'
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

import ProfilePage from './components/pages/ProfilePage';
import SignupPage from './components/pages/SignupPage';
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';
import LogoutPage from './components/pages/LogoutPage';
import NavigationBar from './components/NavigationBar';
import PostIndexPage from './components/pages/post/PostIndexPage';

import RequireAuth from './components/RequireAuth';

import { AUTH_USER} from "./actions/index";


const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxPromise)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');
if(token){
	store.dispatch({ type: AUTH_USER});
}

const App = () => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<div className="row">
					<div className="col-md-12">
						<div className="row">
							<NavigationBar />
						</div>
						<div className="row">
							<Switch>
								<Route path="/posts" component={PostIndexPage}/>
								<Route path="/profile" component={RequireAuth(ProfilePage)}/>
								<Route path="/signup" component={SignupPage}/>
								<Route path="/login" component={LoginPage}/>
								<Route path="/logout" component={LogoutPage}/>
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
