import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Favorites from '../Components/Favorites/Favorites'
import LoadingPage from './LoadingPage'

function FavoritesPage() {
    return (
        <div>
            <LoadingPage />
            <Header />
            <Favorites />
            <Footer />
        </div>
    )
}

export default FavoritesPage
