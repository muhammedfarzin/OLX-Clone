import React from 'react'

import Header from '../Components/Header/Header'
import View from '../Components/View/View'
import LoadingPage from './LoadingPage'
import Footer from '../Components/Footer/Footer'

function ViewPost(props) {
    return (
        <div>
            <LoadingPage />
            <Header />
            <View />
            <Footer />
        </div>
    )
}

export default ViewPost
