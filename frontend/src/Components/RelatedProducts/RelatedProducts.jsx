import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

// RelatedProducts functional component
const RelatedProducts = () => { // Main container for the Related Products section
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {data_product.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> // Rendering an Item component for each product, passing necessary props
            })}
        </div>
    </div>
  )
}

export default RelatedProducts // Exporting the RelatedProducts component for use in other parts of the application
