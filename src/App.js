import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import MyAdsPage from './Pages/MyAdsPage';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { authContext, firebaseContext } from './store/Context';
import Post from './store/postContext'
import Loader from './store/LoadContext';
import Category from './store/CategoryContext';

import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import SearchPage from './Pages/SearchPage';
import FavoritesPage from './Pages/FavoritesPage';

function App() {
  const { setUser } = useContext(authContext)
  const { firebase } = useContext(firebaseContext)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [firebase, setUser])
  return (
    <div>
      <Post>
        <Loader>
          <Category>
            <Router>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/create'>
                <Create />
              </Route>
              <Route path='/view'>
                <ViewPost />
              </Route>
              <Route path='/search'>
                <SearchPage />
              </Route>
              <Route path='/myads'>
                <MyAdsPage />
              </Route>
              <Route path="/favorites">
                <FavoritesPage />
              </Route>
            </Router>
          </Category>
        </Loader>
      </Post>
    </div>
  );
}

export default App;
