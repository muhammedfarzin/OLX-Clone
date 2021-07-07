import React, { useContext, useEffect, useState } from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { CategoryContext, FilterSearchContext } from '../../store/CategoryContext';
import { useHistory } from 'react-router-dom';
import { LoadContext } from '../../store/LoadContext';
import { firebaseContext } from '../../store/Context';
function Banner() {
  const { categories, setCategories } = useContext(CategoryContext)
  const { setFilterSearch, setFilter } = useContext(FilterSearchContext)
  const { setLoading } = useContext(LoadContext)
  const { firebase } = useContext(firebaseContext)
  const [clickCategory, setClickCategory] = useState(Boolean)
  const history = useHistory()

  useEffect(() => {
    firebase.firestore().collection('categories').get().then(snapshot => {
      const allCategories = snapshot.docs.map(item => {
        return { ...item.data() }
      })
      setCategories(allCategories)
    })
  }, [firebase, setCategories])
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
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
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>

    </div>
  );
}

export default Banner;
