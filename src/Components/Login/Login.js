import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {authContext, firebaseContext} from '../../store/Context'

import Logo from '../../olx-logo.png';
import './Login.css';
import { LoadContext } from '../../store/LoadContext';

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const {firebase}=useContext(firebaseContext)
  const {setLoading}=useContext(LoadContext)
  const {user}=useContext(authContext)
  const history=useHistory()

  useEffect(() => {
    user && history.push('/')
  }, [history,user])

  const handleLogin=(e)=>{
    e.preventDefault()
    setLoading(true)
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
      setLoading(false)
    }).catch((err)=>{
      setLoading(false)
      alert(err.message)
    })
    
  }

  useEffect(()=>{
    setLoading(false)
  },[setLoading])
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href="/signup" onClick={(e)=>{
          e.preventDefault()
          setLoading(true)
          history.push('/signup')
        }} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
