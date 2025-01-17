import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

// Offers functional component
const Offers = () => {
  return ( // Main container for the Offers section
    <div className='offers'> 
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>Limited Time Only!</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" /> 
        </div>
    </div>
  )
}

export default Offers // Export the Offers component for use in other parts of the application