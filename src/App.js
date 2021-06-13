import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Alert from './components/AlertComponent';
import Profile from './components/Profile';
import Post from './components/SinglePost';
import Album from './components/SingleAlbum';
import Task from './components/Task';
import './styles/App.css';
import { createBrowserHistory } from 'history'
import PrivateRoute from './components/PrivateRoute';
import UserContext from './components/UserContext';

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const history = createBrowserHistory();
  const [user, setUser] = useState({});


  return (
    <Router history={history}>
      <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <Header title={title} />
        <div className="flex-column">
          <Switch>
            <Route path="/" exact={true} render={(props) => <Login {...props} showError={updateErrorMessage} updateTitle={updateTitle} />} />
            <PrivateRoute exact path="/home" ><Home updateTitle={updateTitle} /></PrivateRoute>
            <PrivateRoute exact path="/users/:id" ><Profile updateTitle={updateTitle} /></PrivateRoute>
            <PrivateRoute exact path="/users/:id/posts/:postid" ><Post /></PrivateRoute>
            <PrivateRoute exact path="/users/:id/albums/:albumid" ><Album updateTitle={updateTitle} /></PrivateRoute>
            <PrivateRoute exact path="/users/:id/todos/:taskid" ><Task updateTitle={updateTitle} /></PrivateRoute>
          </Switch>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;