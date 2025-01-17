import React from 'react'
import './Item.css'
import { Link } from'react-router-dom';

const Item = (props) => { // Define the Item functional component with props to pass data dynamically
  return (
    <div className='item'> {/* Main container for the individual item */}
      <Link to={`/product/${props.id}`}> {/* Link to navigate to the product details page based on the item's ID */}
        <img onClick={window.scrollTo(0,0)} src={props.image} alt={props.name} /> {/* Display the item image and scroll to the top of the page when clicked */}
      </Link> 
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item // exporting the Item component for use in other parts of the application