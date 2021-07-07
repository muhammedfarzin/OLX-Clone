import './LoadingPage.css'

import React, { useContext } from 'react'
import { LoadContext } from '../store/LoadContext'

function LoadingPage() {
    const {loading}=useContext(LoadContext)
    if (loading) {
        return(
            <div className='loadingScreen'>
                <div className="loadingIcon">
                    <svg class="loadingSvg" width="65px" height="65px" viewBox="0 0 52 52"><circle class="loadingCircle" cx="26px" cy="26px" r="20px" fill="none" stroke-width="2px"></circle></svg>
                    <p>
                        <span>Loading...</span>
                    </p>
                </div>
            </div>
        )
    }else return null
}

export default LoadingPage
