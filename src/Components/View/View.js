import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseContext } from '../../store/Context';
import { LoadContext } from '../../store/LoadContext';
import { postContext } from '../../store/postContext';

import './View.css';
function View() {
  const history=useHistory()

  const [userDetails,setUserDetails]=useState()
  const {postDetails}=useContext(postContext)
  const {firebase}=useContext(firebaseContext)
  const {setLoading}=useContext(LoadContext)
  useEffect(()=>{
    !postDetails && history.push('/')
    setLoading(true)
    postDetails && firebase.firestore().collection('users').where('id','==',postDetails.userId).get().then((res)=>{
      res.forEach(doc=>{
        setUserDetails(doc.data())
        setLoading(false)
      })
    })
  },[setLoading,firebase,postDetails,history])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails && postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails && postDetails.price} </p>
          <span>{postDetails && postDetails.name}</span>
          <p>{postDetails && postDetails.category}</p>
          <span>{postDetails && postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
