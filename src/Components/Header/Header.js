import React, { useContext, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext, firebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import { LoadContext } from '../../store/LoadContext';
import { FilterSearchContext } from '../../store/CategoryContext';

function Header(props) {
  const [userMenuClick, setUserMenuClick] = useState()
  const [languageClick, setLanguageClick] = useState(Boolean)
  const { user, userLocation, setUserLocation } = useContext(authContext)
  const { firebase } = useContext(firebaseContext)
  const { setLoading } = useContext(LoadContext)
  const { setFilterSearch, filterSearch, setFilter, setSearchResult } = useContext(FilterSearchContext)
  const history = useHistory()

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <a href='/' onClick={(e) => {
          e.preventDefault()
          history.push('/')
        }} className="brandName pointer">
          <OlxLogo></OlxLogo>
        </a>
        <div className="placeSearch">
          <Search></Search>
          <input onChange={(e) => setUserLocation(e.target.value)} placeholder="Search city, area or locality" value={userLocation && userLocation} type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={filterSearch}
              onChange={(e) => {
                setFilterSearch(e.target.value)
              }}
            />
          </div>
          <div onClick={() => {
            if (filterSearch) {
              if (props.searchHeader) {
                setLoading(true)
                firebase.firestore().collection('products').where("name", ">=", filterSearch).get().then(snapshot => {
                  const allPost = snapshot.docs.map(product => {
                    return {
                      ...product.data(),
                      id: product.id
                    }
                  })
                  setSearchResult(allPost)
                  setLoading(false)
                })
              } else {
                setFilter(false)
                setLoading(true)
                history.push('/search')
              }
            }
          }} className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="languagesDiv">
          <div className="language pointer" onClick={() => {
            setLanguageClick(!languageClick)
          }}>
            <span> ENGLISH </span>
            {languageClick ? <Arrow rotate></Arrow> : <Arrow></Arrow>}
          </div>
          {languageClick && <div className="languageClick">
            <div className="LanguageLists languageLists block">
              <ul>
                <li onClick={() => { setLanguageClick(false) }}><span>English</span></li>
                <li onClick={() => {
                  setLanguageClick(false)
                  alert('हिंदी Language currently not available')
                }}><span>हिंदी</span></li>
              </ul>
            </div>
          </div>}
        </div>
        <div onClick={() => {
          if (user) {
            setUserMenuClick(!userMenuClick)
          } else {
            setLoading(true)
            history.push('/login')
          }
        }} className="loginPage pointer" style={user && { display: 'flex' }}>
          <span className={user && 'userIcon'}>{user ? user.displayName.charAt(0) : 'Login'}</span>
          {user && <svg width="20px" height="20px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-77aaa" d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path></svg>}
          {!user && <hr />}
          {userMenuClick && <div className="userIconClick">
            <div className="iconClickMenu">
              <div className="userProfile">
                <div className="userProfileIconDiv">
                  <span className="userProfileIcon">{user && user.displayName.charAt(0)}</span>
                </div>
                <div className="userDetails">
                  <div className="userDetailsHelloDiv">
                    <span className='userDetailsHello'>Hello,</span>
                  </div>
                  <div className="userNameDiv">
                    <span className="userName">{user && user.displayName}</span>
                  </div>
                  <br />
                </div>
              </div>
              <a href="/myads" onClick={(e) => {
                e.preventDefault()
                setLoading(true)
                history.push('/myads')
              }} className="menu">
                <div className="menuIcon">
                  <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-77aaa" d="M349.46 85.333h487.619l40.635 40.635v609.524l-40.635 40.635h-487.619l-40.635-40.635v-609.524l40.635-40.635zM390.095 694.857h406.35v-528.254h-406.35v528.254zM146.286 247.873l40.635-40.635 40.635 40.635v609.524h528.254l40.635 40.635-40.635 40.635h-568.889l-40.635-40.635v-650.159zM512 329.143h162.54l40.635 40.635-40.635 40.635h-162.54l-40.635-40.635 40.635-40.635zM512 491.683h81.27l40.635 40.635-40.635 40.635h-81.27l-40.635-40.635 40.635-40.635z"></path></svg>
                </div>
                <span>My Ads</span>
              </a>
              <a href="/favorites" className="menu" onClick={(e) => {
                e.preventDefault()
                setLoading(true)
                history.push('/favorites')
              }}>
                <div className="menuIcon">
                  <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-4K4Y7" d="M705.941 124.121c-80.853 0-152.204 41.445-193.939 104.204-41.736-62.759-113.086-104.204-193.939-104.204-128.33 0-232.727 104.398-232.727 232.727 0 50.657 16.194 98.967 47.806 140.916l328.766 402.114h100.189l329.716-403.355c30.662-40.708 46.856-89.018 46.856-139.675 0-128.33-104.398-232.727-232.727-232.727z"></path></svg>
                </div>
                <span>Favorites</span>
              </a>
              <a href="/" className="menu" onClick={(e) => {
                e.preventDefault()
                setLoading(true)
                firebase.auth().signOut()
                history.push('/login')
              }}>
                <div className="menuIcon">
                  <svg width="23px" height="23px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-77aaa" d="M128 85.333l-42.667 42.667v768l42.667 42.667h768l42.667-42.667v-213.333l-42.667-42.667-42.667 42.667v170.667h-682.667v-682.667h682.667v170.667l42.667 42.667 42.667-42.667v-213.333l-42.667-42.667h-768zM494.336 298.667l-183.168 183.168v60.331l183.168 183.168h60.331v-60.331l-110.336-110.336h323.669l42.667-42.667-42.667-42.667h-323.669l110.336-110.336v-60.331h-60.331z"></path></svg>
                </div>
                <span>Logout</span>
              </a>
            </div>
          </div>}
        </div>

        <a href='/create' className="sellMenu" onClick={(e) => {
          e.preventDefault()
          setLoading(true)
          history.push('/create')
        }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Header;
