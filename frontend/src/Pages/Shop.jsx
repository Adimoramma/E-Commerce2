import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import './CSS/Shop.css'

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <a href="/shop" className="explore-more-btn">Explore More</a>
      </div>
      <NewsLetter />
    </div>
  )
}

export default Shop