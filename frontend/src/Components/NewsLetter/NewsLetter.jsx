import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className="newsletter">
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscribe to our newsletter and stay updated on the latest products and offers!</p>
        <div>
            <input type="email" placeholder='Enter your email address' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter