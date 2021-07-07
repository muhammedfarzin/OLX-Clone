import React, { useContext, useEffect, useState } from 'react'
import './MyAds.css'
import { useHistory } from 'react-router-dom'

import Arrow from '../../assets/Arrow'
import Search from '../../assets/Search'

import { CategoryContext, FilterSearchContext } from '../../store/CategoryContext'
import { LoadContext } from '../../store/LoadContext'
import { authContext, firebaseContext } from '../../store/Context'
import { postContext } from '../../store/postContext'

function MyAds() {
  const [clickCategory, setClickCategory] = useState(Boolean)
  const [products, setProducts] = useState()

  const { categories } = useContext(CategoryContext)
  const { setLoading } = useContext(LoadContext)
  const { setFilterSearch, setFilter } = useContext(FilterSearchContext)
  const { firebase } = useContext(firebaseContext)
  const { user } = useContext(authContext)
  const { setPostDetails } = useContext(postContext)

  const history = useHistory()

  useEffect(() => {
    !user && history.push('/')
    setLoading(true)
    user && firebase.firestore().collection("products").where("userId", "==", user.uid).get().then(snapshot => {
      const allPost = snapshot.docs.map(product => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)
      setLoading(false)
    })
  }, [firebase, history, setLoading, user])
  return (
    <div className="myAdsParent">
      <div className="myAdsChild">
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
                  <a href="/search" onClick={() => {
                    setLoading(true)
                    setFilter(true)
                    setFilterSearch(item)
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
                    <a href='/search' className="categoryList" onClick={(e) => {
                      e.preventDefault()
                      setLoading(true)
                      setFilter(true)
                      setFilterSearch(item)
                      history.push('/search')
                    }}>
                      <span>{item.name}</span>
                    </a>
                  </div>
                )
              })
            }
          </div>
        </div>}

        <div className="myAdsMain">
          <div className="myAdsMainChild">
            <div className="myAdsMainSection">
              <div className="topNavigation">
                <nav className="topNavigationLeft">
                  <div className="topNavigationLeftDiv">
                    <ul className="topNavigationLists">
                      <li className="topNavigationList">
                        <a href="/myads" className="topNavList topNavListTrue" onClick={(e) => {
                          e.preventDefault()
                          history.push('/myads')
                        }}>Ads</a>
                      </li>
                      <li className="topNavigationList">
                        <a href="/favourites" className="topNavList" onClick={(e) => {
                          e.preventDefault()
                          history.push('/favorites')
                        }}>Favourites</a>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="downloadLeadsDiv">
                  <button className="downloadLeadsBtn">
                    <div className="downloadLeadsIcon"><svg width="22px" height="22px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-367TP rui-27W37" d="M891.008 822.315l47.659 48.853-47.701 48.085h-757.931l-47.701-48.853 47.787-48.043h757.888zM493.525 85.333l46.507 46.592 0.213 475.179 178.475-189.483 62.976 0.299-0.256 58.752 2.091 4.267-290.005 302.592-291.84-304.512 4.011-4.139 0.256-57.472 62.507 0.213 178.475 189.483 0.171-475.179 46.421-46.592z"></path></svg></div>
                    <span>Download leads</span>
                  </button>
                </div>
              </div>
              <div className="searchFilterDiv">
                <div className="searchSectionDiv">
                  <div className="searchSectionDivChild">
                    <div className="searchSectionIconDiv">
                      <span className="searchSectionIconSpan">
                        <Search small />
                      </span>
                    </div>
                    <input type="text" placeholder="Search by Ad Title" maxLength="255" />
                  </div>
                </div>
                <div className="filterSectionDiv">
                  <div className="filterSectionTitle">Filter By:</div>
                  <div className="filterSectionBtnLists filterSectionBtnListsTrue">
                    <div>View all ({products ? products.length : 0})</div>
                  </div>
                  <div className="filterSectionBtnLists filterSectionBtnListsFalse">
                    <div>Active Ads ({products ? products.length : 0})</div>
                  </div>
                  <div className="filterSectionBtnLists filterSectionBtnListsFalse">
                    <div>Inactive Ads (0)</div>
                  </div>
                  <div className="filterSectionBtnLists filterSectionBtnListsFalse">
                    <div>Pending Ads (0)</div>
                  </div>
                  <div className="filterSectionBtnLists filterSectionBtnListsFalse">
                    <div>Moderated Ads (0)</div>
                  </div>
                </div>
              </div>
              <div className="showMyAdsHereDiv">
                <div className="showMyAdsHereChild">
                  <div>
                    <ul className="showMyAdsLists">
                      {
                        products && products.map((product, index) => {
                          return (
                            <div className="showMyAdsList">
                              <div className="showMyAdsListDiv">
                                <span className="showMyAdsListLeftSpan"></span>
                                <div className="showMyAdsListDetails">
                                  <div className="showMyAdsListDate">
                                    <span className="showMyAdsListLeftSpan"></span>
                                    <div className="showMyAdsListDateSection">
                                      <div className="showMyAdsListDateDiv">
                                        <span>Date: <strong>{product.createdAt}</strong></span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="showMyAdsListMoreDetails">
                                    <div className="showMyAdsListMoreDetailsChild">
                                      <a href="/view" className="resultProduct" onClick={(e) => {
                                        e.preventDefault()
                                        setLoading(true)
                                        setPostDetails(product)
                                        history.push('/view')
                                      }}>
                                        <div className="resultImgDiv">
                                          <figure className="resultImgFig">
                                            <img src={product.url}
                                              alt="upload-preview" className="resultImg"
                                              sizes="(min-width: 1280px) 100vw, (min-width: 1024px) 20vw, (min-width: 960px) 25vw, (min-width: 540px) 25vw, (min-width: 320px) 30vw, 35vw" />
                                          </figure>
                                        </div>
                                        <div className="resultTitleDiv">
                                          <div className="resultTitleChild">
                                            <span className="resultTitle">{product.name}</span>
                                          </div>
                                        </div>
                                        <div className="resultPriceDiv">
                                          <span className="resultPrice">₹ {product.price}</span>
                                        </div>
                                        <div className="resultStatusDiv">
                                          <label htmlFor="" className="resultStatus">Active</label>
                                        </div>
                                        <div className="resultStatusDescriptionDiv">
                                          <div className="resultStatusDescriptionChild">
                                            <span>This ad is currently live</span>
                                          </div>
                                        </div>
                                      </a>
                                      <div className="showMoreOptionDiv">
                                        <div className="showMoreOptionChild">
                                          <span className="showMoreOptionSpan pointer" onClick={(e) => {
                                            window.confirm('Are you sure, you want to delete?') && firebase.firestore().collection('products').doc(product.id).delete().then(response => {
                                              const array = [...products]
                                              array.splice(array.indexOf(product), 1)
                                              setProducts(array)
                                              alert('Deleted successfully')
                                            })
                                          }}>
                                            <i className="showMoreOptionI">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                              </svg>
                                            </i>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className="showMyAdsHereBottom"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAds
