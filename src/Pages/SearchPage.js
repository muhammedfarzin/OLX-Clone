import React from 'react'
import Footer from '../Components/Footer/Footer'

import Header from '../Components/Header/Header'
import SearchView from '../Components/SearchView/SearchView'
import LoadingPage from './LoadingPage'

function SearchPage() {
    return (
        <div>
            <LoadingPage />
            <Header searchHeader />
            <SearchView />
            <Footer />
        </div>
    )
}

export default SearchPage
