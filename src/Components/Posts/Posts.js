import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Heart from '../../assets/Heart';
import { firebaseContext } from '../../store/Context';
import { LoadContext } from '../../store/LoadContext';
import { postContext } from '../../store/postContext'
import './Post.css';

function Posts() {
  const [products, setProducts] = useState()
  const [recommendProducts, setRecommendProducts] = useState([])

  const { firebase } = useContext(firebaseContext)
  const { setPostDetails } = useContext(postContext)
  const { setLoading } = useContext(LoadContext)

  const history = useHistory()
  const date=new Date()
  const today=date.toDateString()

  // const setFavorite=(){}

  useEffect(() => {
    if (!products) {
      setLoading(true)
      firebase.firestore().collection('products').limit(12).get().then((snapshot) => {
        const allPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id
          }
        })
        setProducts(allPost)
        setLoading(false)
      }).catch(err => {
        console.log(err);
        setLoading(false)
      })
      firebase.firestore().collection('products').where('recommend', '==', true).limit(15).get()
        .then((snapshot) => {
          const recommendPost = snapshot.docs.map(product => {
            return {
              ...product.data(),
              id: product.id
            }
          })
          setRecommendProducts(recommendPost)
        })
    } else setLoading(false)
  }, [firebase, products, setLoading])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products && products.map((product, index) => {
              return (
                <a href='/view'
                  onClick={(e) => {
                    e.preventDefault()
                    setLoading(true)
                    setPostDetails(product)
                    history.push('/view')
                  }}
                  key={index}
                  className="card"
                >
                  <div title="favorite" className="favorite">
                    <Heart proId={product.id}></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name"> {product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.place}</span>
                    <span>{product.createdAt===today ? "Today" : product.createdAt}</span>
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            recommendProducts.map((product, index) => {
              return (
                <a href="/view" className="card" key={index} onClick={(e) => {
                  e.preventDefault()
                  setLoading(true)
                  setPostDetails(product)
                  history.push('/view')
                }}>
                  <div title="favorite" className="favorite">
                    <Heart proId={product.id}></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name"> {product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.place}</span>
                    <span>{product.createdAt===today ? "Today" : product.createdAt}</span>
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
