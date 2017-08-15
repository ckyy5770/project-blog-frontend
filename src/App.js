import React, { Component } from 'react';
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
import PostShowPage from './components/pages/post/PostShowPage';
import PostNewPage from './components/pages/post/PostNewPage';
import PostEditPage from './components/pages/post/PostEditPage';
import CommentEditPage from './components/pages/post/CommentEditPage';
import Footer from './components/Footer';

import { Row, Col } from 'antd';

import {styleContent} from "./style";


import RequireAuth from './components/RequireAuth';

import { AUTH_USER} from "./actions/index";

const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxPromise)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const user = localStorage.getItem('user');

if(user){
    store.dispatch({ type: AUTH_USER, payload: JSON.parse(user)});
}

class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <Router history={history}>
                  <div>
                      <Row>
                          <NavigationBar />
                      </Row>

                      <Row>
                          <Col xs={{offset:1, span: 22}} sm={{offset:2, span: 20}} md={{offset:3,span:18}} lg={{offset:4,span:16}}  style={styleContent}>
                              <Switch>
                                  <Route path="/posts/new" component={PostNewPage}/>
                                  <Route path="/posts/:postId/comments/:commentId" component={CommentEditPage}/>
                                  <Route path="/posts/:postId/edit" component={PostEditPage}/>
                                  <Route path="/posts/:postId" component={PostShowPage}/>
                                  <Route path="/posts" component={PostIndexPage}/>

                                  <Route path="/profile" component={RequireAuth(ProfilePage)}/>
                                  <Route path="/signup" component={SignupPage}/>
                                  <Route path="/login" component={LoginPage}/>
                                  <Route path="/logout" component={LogoutPage}/>
                                  <Route path="/" component={IndexPage} />
                              </Switch>
                          </Col>
                      </Row>

                      <Row>
                          <Footer />
                      </Row>
                  </div>


              </Router>
          </Provider>
      );
  }
}

export default App;







