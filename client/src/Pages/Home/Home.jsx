import React from 'react'
import Hero from '../../Components/Hero/Hero'
import Homepost from '../../Components/Homepost/Homepost'
import Featurecourse from '../../Components/Featurecourse/Featurecourse'
import Topcategory from '../../Components/Topcategory/Topcategory'
import Homeshop from '../../Components/Homeshop/Homeshop'
import Homeofferbanner from '../../Components/Homeofferbanner/Homeofferbanner'
import TopRatedBook from '../../Components/TopRatedBook/TopRatedBook'
import OurClient from '../../Components/OurClient/OurClient'
import Features from '../../Components/Features/Features'
import OurTeam from '../../Components/OurTeam/OurTeam'
import BundleHome from '../../Components/BundleHome/BundleHome'
import BookBundle from '../../Components/BookBundle/BookBundle'

function Home() {
  return (
    <>
        <Hero />
        <Homepost />
        <Featurecourse />
        <Topcategory />
        <Homeshop />
        <BundleHome />
        <Homeofferbanner />
        <BookBundle />
        <TopRatedBook />
        <OurClient />
        <Features />
        <OurTeam />
    </>
  )
}

export default Home
