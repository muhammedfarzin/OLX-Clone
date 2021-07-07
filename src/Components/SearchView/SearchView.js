import React, { useContext, useEffect, useState } from 'react'
import './SearchView.css'

import Arrow from '../../assets/Arrow'
import { CategoryContext, FilterSearchContext } from '../../store/CategoryContext'
import { useHistory } from 'react-router-dom'
import { authContext, firebaseContext } from '../../store/Context'
import { LoadContext } from '../../store/LoadContext'
import { postContext } from '../../store/postContext'

function SearchView() {
  const [clickCategory, setClickCategory] = useState(Boolean)
  const [clickFilterCategory, setClickFilterCategory] = useState(Boolean)
  const [clickFilterLocation, setClickFilterLocation] = useState(Boolean)
  const [clickFilterBudget, setClickFilterBudget] = useState(true)
  const [clickSortBy, setClickSortBy] = useState(Boolean)
  const [budgetApply, setBudgetApply] = useState(Boolean)
  const [minBudget, setMinBudget] = useState()
  const [maxBudget, setMaxBudget] = useState()
  const [beforeBudgetFIlter, setBeforeBudgetFIlter] = useState()

  const { categories } = useContext(CategoryContext)
  const { firebase } = useContext(firebaseContext)
  const { filter, setFilter, filterSearch, setFilterSearch, searchResult, setSearchResult } = useContext(FilterSearchContext)
  const { setLoading } = useContext(LoadContext)
  const { setPostDetails } = useContext(postContext)
  const { userLocation } = useContext(authContext)

  const history = useHistory()


  const filterByList = ['Date Published', 'Relevance', 'Distance', 'Price: Low to High', 'Price: High to Low']

  const handleFilterSearch = () => {
    setLoading(true)
    firebase.firestore().collection('products').where("category", "==", filterSearch).get().then(snapshot => {
      const allPost = snapshot.docs.map(product => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setBeforeBudgetFIlter(allPost)
      setSearchResult(allPost)
      setLoading(false)
    })
  }

  const handleBudgetFilter = () => {
    setLoading(true)
    const allPost = beforeBudgetFIlter.map(product => {
      if (minBudget && maxBudget) {
        if (product.price > minBudget) {
          if (product.price < maxBudget) {
            return product
          }
        }
      } else if (minBudget) {
        if (product.price >= minBudget) {
          return product
        }
      } else if (maxBudget) {
        if (product.price <= maxBudget) {
          return product
        }
      }


      return null
    })
    setSearchResult(allPost)
    console.log(allPost);
    setLoading(false)
  }

  useEffect(() => {
    if (filterSearch) {
      if (filter) {
        firebase.firestore().collection("products").where("category", "==", filterSearch).get().then(snapshot => {
          const allPost = snapshot.docs.map(product => {
            return {
              ...product.data(),
              id: product.id
            }
          })
          setBeforeBudgetFIlter(allPost)
          setSearchResult(allPost)
          setLoading(false)
        })
      } else {
        firebase.firestore().collection("products").where("name", ">=", filterSearch).get().then(snapshot => {
          const allPost = snapshot.docs.map(product => {
            return {
              ...product.data(),
              id: product.id
            }
          })
          setBeforeBudgetFIlter(allPost)
          setSearchResult(allPost)
          setLoading(false)
        })
      }
    } else history.push('/')
  }, [filter, filterSearch, firebase, history, setLoading, setSearchResult])

  return (
    <div className='searchViewParent'>
      <div className="searchViewChild">
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
                    setMinBudget("")
                    setMaxBudget("")
                    setFilter(true)
                    setFilterSearch(item.name)
                    handleFilterSearch()
                    setClickCategory(false)
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
                    <a href="/search" onClick={(e) => {
                      e.preventDefault()
                      setMinBudget("")
                      setMaxBudget("")
                      setFilter(true)
                      setFilterSearch(item.name)
                      handleFilterSearch()
                      setClickCategory(false)
                    }} className="categoryList">
                      <span>{item.name}</span>
                    </a>
                  </div>
                )
              })
            }
          </div>
        </div>}
        <div className="searchResultParent">
          <div className="searchResultChild">
            <div>
              <div className="goHomeButtonDivParent">
                <div className="goHomeButtonDivChild">
                  <ol className='homeBtn'><li onClick={() => history.push('/')}><span>Home</span></li></ol>
                </div>
              </div>
              <h1 className="searchTitle">{filterSearch} in {userLocation}</h1>
              <div className="filterResult">
                <div className="filterDivParent">
                  <div className="filterDivChild">
                    <div className="filterCategoryDiv">
                      <div onClick={() => {
                        setClickFilterCategory(!clickFilterCategory)
                      }} className="filterCategoryTitleDiv">
                        <span className="filterCategoryTitle"><span>Categories</span></span>
                        {clickFilterCategory ? <Arrow rotate /> : <Arrow />}
                      </div>
                      <div className="filterCategoryListsDiv">
                        {
                          !clickFilterCategory ? <span>All Categories</span> : <div className="filterCategoryListsDiv">
                            <ul className="filterCategoryLists">
                              <li>
                                <div className="filterCategoryListDiv">
                                  <div className="filterCategoryListIcon"></div>
                                  <span>All Categories</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        }
                      </div>
                    </div>
                    <div className="filterLocationDiv">
                      <div onClick={() => {
                        setClickFilterLocation(!clickFilterLocation)
                      }} className="filterLocationTitleDiv">
                        <span className='filterLocationTitle'>Locations</span>
                        {clickFilterLocation ? <Arrow rotate /> : <Arrow />}
                      </div>
                      {clickFilterLocation && <div className="filterLocationMenu">India</div>}
                    </div>
                    <div className="filterBudgetDiv">
                      <div className="filterBudgetFilterTitleDiv">
                        <div className="filterBudgetFilterTitle">
                          <span>Filters</span>
                        </div>
                      </div>
                      <div className="filterBudgetChildDiv">
                        <div onClick={() => {
                          setClickFilterBudget(!clickFilterBudget)
                        }} className="filterBudgetTitleDiv">
                          <span className="filterBudgetTitle">Budget</span>
                          {clickFilterBudget ? <Arrow rotate /> : <Arrow />}
                        </div>
                        {clickFilterBudget && <div className="filterBudgetForm">
                          <div className="filterBudgetDescription">Choose a range below</div>
                          <div className="filterBudgetFormChild">
                            <div className="filterBudgetFormInputs">
                              <input type="number" placeholder="min" onChange={(e) => {
                                setMinBudget(e.target.value)
                                e.target.value || maxBudget ? setBudgetApply(true) : setBudgetApply(false)
                              }} className="filterBudgetformInput" min="0" max="10000000000" value={minBudget} />
                              <span>to</span>
                              <input type="number" placeholder="max" onChange={(e) => {
                                setMaxBudget(e.target.value)
                                e.target.value || minBudget ? setBudgetApply(true) : setBudgetApply(false)
                              }} className="filterBudgetformInput" min="0" max="10000000000" value={maxBudget} />
                            </div>
                            <button onClick={handleBudgetFilter} className={budgetApply ? "filterBudgetFormSubmitBtnTrue btnSame" : "filterBudgetFormSubmitBtnFalse btnSame"}><span>Apply</span></button>
                          </div>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="showResultSection">
                  <div className="showResultFilterDiv">
                    <div className="filterLeftSection">
                      <p className="resultTitle">
                        <span>
                          Showing results for
                          <b> "{filterSearch}"</b>
                        </span>
                      </p>
                      <div className="resultTitleRightSection">
                        <span className="resultTitleRightSpan"><span>View</span></span>
                        <button className="resultTitleRightButton">
                          <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-77aaa" d="M896 554.663l42.667 42.667v298.67l-42.667 42.667h-768l-42.667-42.667v-298.67l42.667-42.667h768zM853.333 639.997h-682.667v213.357h682.667v-213.357zM896 85.333l42.667 42.667v298.648l-42.667 42.688h-768l-42.667-42.688v-298.648l42.667-42.667h768zM853.333 170.668h-682.667v213.335h682.667v-213.335z"></path></svg>
                        </button>
                        <button className="resultTitleRightButton">
                          <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-77aaa" d="M896 682.667l42.667 42.667-42.667 42.667h-768l-42.667-42.667 42.667-42.667h768zM896 469.333l42.667 42.667-42.667 42.667h-768l-42.667-42.667 42.667-42.667h768zM896 256l42.667 42.667-42.667 42.667h-768l-42.667-42.667 42.667-42.667h768z"></path></svg>
                        </button>
                        <button className="resultTitleRightButton">
                          <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-2BsmJ" d="M426.662 554.667l42.667 42.667v298.667l-42.667 42.667h-298.667l-42.667-42.667v-298.667l42.667-42.667h298.667zM746.667 554.667c105.856 0 192 86.123 192 192s-86.144 192-192 192c-105.856 0-192-86.123-192-192s86.144-192 192-192zM384.017 640h-213.355v213.355h213.355v-213.355zM746.667 640c-58.816 0-106.667 47.851-106.667 106.667s47.851 106.667 106.667 106.667c58.816 0 106.667-47.851 106.667-106.667s-47.851-106.667-106.667-106.667zM426.662 85.342l42.667 42.667v298.645l-42.667 42.688h-298.667l-42.667-42.688v-298.645l42.667-42.667h298.667zM895.985 85.342l42.667 42.667v298.645l-42.667 42.688h-298.645l-42.688-42.688v-298.645l42.688-42.667h298.645zM384.017 170.675h-213.355v213.333h213.355v-213.333zM853.34 170.675h-213.333v213.333h213.333v-213.333z"></path></svg>
                        </button>
                      </div>
                      <div onClick={() => {
                        setClickSortBy(!clickSortBy)
                      }} className="filterSection">
                        <div className="filterSectionChild">
                          <span className="filterSectionSpanSortBy"><span>Sort By</span></span>
                          <span className="filterSectionSpanDescription">: Date Published</span>
                          <span className="filterSectionSpanDownArrow">
                            {clickSortBy ? <Arrow small rotate /> : <Arrow small />}
                          </span>
                        </div>
                        {clickSortBy && <ul className="filterSectionClick">
                          {
                            filterByList.map((item, index) => {
                              return (<li key={index}>
                                <div className="filterByList">
                                  <span className="filterByListSpan">{item}</span>
                                </div>
                              </li>)
                            })
                          }
                        </ul>}
                      </div>
                    </div>
                  </div>
                  <div className="resultListsShow">
                    <ul className="resultLists">
                      {
                        searchResult && searchResult.map((product, index) => {
                          if (product) {
                            return (<li key={index} onClick={() => {
                              setLoading(true)
                              setPostDetails(product)
                              history.push('/view')
                            }} className="resultList pointer">
                              <div className="resultViewDiv">
                                <figure className="resultViewFig">
                                  <img src={product.url}
                                    sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 20vw, (min-width: 960px) 25vw, (min-width: 540px) 25vw, (min-width: 320px) 30vw, 35vw"
                                    alt="" className="resultViewImg"
                                    style={{ height: "166px" }} />
                                </figure>
                                <div className="resultListInfo">
                                  <span className="resultListPrice">₹ {product.price}</span>
                                  <span className="resultListName">{product.name}</span>
                                  <div className="resultListPlaceDate">
                                    <span className="resultListPlace">{product.place}</span>
                                    <span className="resultListDate"><span>{product.createdAt}</span></span>
                                  </div>
                                </div>
                              </div>
                            </li>)
                          } else return null
                        })
                      }
                    </ul>
                  </div>
                  {!searchResult[0] && <div className="noItemFoundDiv">
                    <h3 className="noItemFound">No Ads Found</h3>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchView
