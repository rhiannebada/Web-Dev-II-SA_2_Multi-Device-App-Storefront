import React, {useContext} from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => { // ProductDisplay functional component, which takes product props
    const {product} = props; // Destructuring the product prop
    const {addToCart} = useContext(ShopContext); // Using useContext to get addToCart function from ShopContext
  return ( // Main container for the product display section
    <div className='productdisplay'> 
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt={product.name} />
                <img src={product.image} alt={product.name} />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt={product.name} />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(1,432)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-new">${product.new_price}</div>
                <div className="productdisplay-right-price-old">${product.old_price}</div>
            </div>
            <div className="productdisplay-right-description">{product.description}</div>
            <button onClick={()=>{addToCart(product.id)}}>Add to Cart</button> {/* Button to add product to cart */}
        </div>
    </div>
  )
}

export default ProductDisplay // Exporting the ProductDisplay component for use in other parts of the application
