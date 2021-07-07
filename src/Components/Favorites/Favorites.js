import React, { useContext, useEffect, useState } from 'react'
import './Favorites.css'

import { useHistory } from 'react-router-dom'
import Arrow from '../../assets/Arrow'
import Heart from '../../assets/Heart'
import { CategoryContext, FilterSearchContext } from '../../store/CategoryContext'
import { LoadContext } from '../../store/LoadContext'
import { authContext, firebaseContext } from '../../store/Context'
import { postContext } from '../../store/postContext'

function Favorites() {
  const { categories } = useContext(CategoryContext)
  const { setLoading } = useContext(LoadContext)
  const { user, userDoc } = useContext(authContext)
  const { firebase, favorites, admin } = useContext(firebaseContext)
  const { setFilter, setFilterSearch } = useContext(FilterSearchContext)
  const { setPostDetails } = useContext(postContext)

  const [clickCategory, setClickCategory] = useState(Boolean)
  const [products, setProducts] = useState([])

  const history = useHistory()

  useEffect(() => {
    setLoading(true)
    !user && history.push('/')
    if (favorites) {
      firebase.firestore().collection('products').where(admin.firestore.FieldPath.documentId(), "in", favorites).get().then(snapshot => {
        const allPost = snapshot.docs.map(product => {
          return {
            ...product.data(),
            id: product.id
          }
        })
        setProducts(allPost)
        setLoading(false)
      })
    }
  }, [admin.firestore.FieldPath,favorites,firebase,history,setLoading,user])
  return (
    <div className="favoritesParentDiv">
      <div className="favoritesChildDiv">
        <div className="menuBar">
          <div className="categoryMenu" onClick={() => {
            setClickCategory(!clickCategory)
          }}>
            <span>ALL CATEGORIES</span>
            {clickCategory ? <Arrow rotate></Arrow> : <Arrow></Arrow>}
          </div>
          <div className="otherQuickOptions">
            {
              categories && categories.slice(0, 8).map((item, index) => {
                return (
                  <a href="/search" onClick={(e) => {
                    e.preventDefault()
                    setLoading(true)
                    setFilter(true)
                    setFilterSearch(item.name)
                    history.push('/search')
                  }} className='topCategory' key={index}>{item.name}</a>
                )
              })
            }
          </div>
        </div>
        {clickCategory && <div className="categoryLists">
          <div className="categoryListsChild">
            {
              categories && categories.map((item, index) => {
                return (
                  <div className="categoryDiv category" key={index}>
                    <a href='/search' onClick={(e) => {
                      e.preventDefault()
                      setLoading(true)
                      setFilter(true)
                      setFilterSearch(item.name)
                      history.push('/search')
                    }} className="categoryList hoverBlue">
                      <span>{item.name}</span>
                    </a>
                  </div>
                )
              })
            }
          </div>
        </div>}
        <div className="favoritesMainDiv">
          <div className="favoritesMainChild">
            <div className="favChildDiv">
              <div className="favTopNavDiv">
                <div className="favTopNavDivChild">
                  <ul className="favTopNavLists">
                    <li className="favTopNavList">
                      <a href="/myads" className="favTopNavListTitle" onClick={(e) => {
                        e.preventDefault()
                        history.push('/myads')
                      }}>
                        <span>Ads</span>
                      </a>
                    </li>
                    <li className="favTopNavList">
                      <a href="/favorites" className="favTopNavListTitle favTopNavListTitleTrue" onClick={(e) => {
                        e.preventDefault()
                        history.push('/favorites')
                      }}>
                        <span>Favourites</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="showFavProductsParentDiv">
                <div className="showFavProductsChildDiv">
                  <div>
                    <ul className="favProductsLists">
                      {
                        products.map((product, index) => {
                          return (
                            <li className="favProductsList" key={index}>
                              <a href="/view" onClick={(e) => {
                                e.preventDefault()
                                setLoading(true)
                                setPostDetails(product)
                                history.push('/view')
                              }}>
                                <figure className="favProductsImgFigure">
                                  <img src={product.url}
                                    alt="Product Preview"
                                    sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 960px) 25vw, (min-width: 540px) 25vw, (min-width: 320px) 30vw, 35vw"
                                    className="favProductsImg" />
                                  <noscript></noscript>
                                </figure>
                                <div className="favProductDetailsDiv">
                                  <span className="productPrice">₹ {product.price}</span>
                                  <span className="productName">{product.name}</span>
                                  <div className="placeDateDiv">
                                    <span className="placeDate">
                                      <span>{product.place}</span>
                                    </span>
                                    <span className="placeDate">
                                      <span>{product.createdAt}</span>
                                    </span>
                                  </div>
                                </div>
                              </a>
                              <span className="favIconDiv">
                                <button className="favIconBtn" onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  firebase.firestore().collection('users').doc(userDoc).update({
                                    favorites: admin.firestore.FieldValue.arrayRemove(product.id)
                                  })
                                  const array = [...products]
                                  array.splice(array.indexOf(product), 1)
                                  setProducts(array)
                                }}>
                                  <Heart disableOnclick proId={product.id} />
                                </button>
                              </span>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorites
