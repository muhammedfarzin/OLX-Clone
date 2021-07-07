import React from 'react'

import LoadingPage from './LoadingPage'
import Header from '../Components/Header/Header'
import MyAds from '../Components/MyAds/MyAds'
import Footer from '../Components/Footer/Footer'

function MyAdsPage() {
    return (
        <div>
            <LoadingPage />
            <Header />
            <MyAds />
            <Footer />
        </div>
    )
}

export default MyAdsPage
