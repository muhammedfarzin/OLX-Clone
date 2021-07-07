import React, { useState,useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import { firebaseContext } from '../../store/Context';
import { LoadContext } from '../../store/LoadContext';
import './Signup.css';

export default function Signup() {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [place,setPlace]=useState('India')
  const [allPlace,setAllPlace]=useState([])
  const [otherPlace,setOtherPlace]=useState(Boolean)

  const {firebase} =useContext(firebaseContext)
  const {setLoading}=useContext(LoadContext)
  const history=useHistory()

  useEffect(()=>{
    setLoading(true)
    firebase.firestore().collection('place').get().then(snapshot=>{
      const allCategory=snapshot.docs.map(item=>{
        return{...item.data()}
      })
      setAllPlace(allCategory)
      setLoading(false)
    })
  },[firebase,setLoading])

  const handleSubmit=(e)=>{
    e.preventDefault()
    setLoading(true)
    if(place!=="India"){firebase.auth().createUserWithEmailAndPassword(email,password).then(result=>{
      result.user.updateProfile({displayName:username,h:place}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone,
          place
        }).then(()=>{
          otherPlace && firebase.firestore().collection('place').add({name:place})
            history.push('/login')
        })
      })
    })}else alert("Please change your location")
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img alt="" width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          
          <br />
          <label htmlFor="place">Place</label>
          <br />
          <select 
            id="place"
            className="input"
            onChange={(e)=>{
              e.target.value === 'Other' ? setOtherPlace(true) : setOtherPlace(false);
                setPlace(e.target.value)
            }}>
            <option className="input">India</option>
            {allPlace.map(item=>{
              if(item.name!=='India'){return <option className="input">{item.name}</option>}else return null
            })}
            <option className="input">Other</option>
          </select>
          {otherPlace && <input
            className="input"
            type="text"
            onChange={(e)=>setPlace(e.target.value)}
            value={place==='Other' ? "" : place}
            name="place"
            defaultValue="John"
          />}
          <br />
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
          <br/>
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a href="/login" onClick={(e)=>{
          e.preventDefault()
          setLoading(true)
          history.push('/login')
        }}>Login</a>
      </div>
    </div>
  );
}
