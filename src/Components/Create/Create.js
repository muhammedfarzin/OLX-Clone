import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { authContext, firebaseContext } from '../../store/Context'
import { useHistory } from 'react-router-dom'
import { LoadContext } from '../../store/LoadContext';
import { CategoryContext } from '../../store/CategoryContext';

const Create = () => {
  const { firebase } = useContext(firebaseContext)
  const { user,userLocation } = useContext(authContext)
  const { setLoading } = useContext(LoadContext)
  const {categories}=useContext(CategoryContext)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [place,setPlace]=useState(userLocation && userLocation)
  const [image, setImage] = useState(null)

  const date = new Date()
  const history = useHistory()

  let rNumber = Math.floor(Math.random() * 100)
  let recommend = rNumber > 50 ? true : false;

  useEffect(() => {
    !user && history.push('/login')
    firebase.firestore().collection('place').get()
    setLoading(false)
  }, [firebase,history,setLoading,user])

  const handeSubmit = () => {
    setLoading(true)
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        firebase.firestore().collection('products').add({
          name: name,
          category,
          price,
          url,
          place,
          userId: user.uid,
          createdAt: date.toDateString(),
          recommend
        })
        
        const isThere= categories.map(item=>{
          if (item.name===category) {
            return true
          }else return false
        })
        console.log(isThere[0]);
        !isThere[0] && firebase.firestore().collection("categories").add({name:category})

        history.push('/')
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            name="Name"
          />

          <br/>
          <label htmlFor="category">Place</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => setPlace(e.target.value)}
            value={place}
            name="Name"
            defaultValue="John"
          />
          
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input onChange={(e) => setPrice(e.target.value)} className="input" type="number" id="fname" name="Price" />
          <br />
          <br />
          <img alt="Posts" src={image ? URL.createObjectURL(image) : ''} style={{maxHeight:"200px",maxWidth:"200px"}}></img>
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handeSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
