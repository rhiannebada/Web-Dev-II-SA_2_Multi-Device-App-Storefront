import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext)
    
    return (
        <div className='cartitems'> {/* Main container for the cart items */}
            <div className="cartitems-format-main">
                <p>-</p>
                <p>Product</p>
                <p>Price</p>
                <p>Qty.</p>
                <p>Total</p>
            </div>
            <hr/>
            {all_product.map((e) => { // Iterate through all products
                if(cartItems[e.id] > 0) { // Check if the product is in the cart
                    return ( 
                        <div key={e.id}> {/* Wrapper for each cart item */} 
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon'/>
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                <img className='cartitems-remove-icon' 
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(e.id)} //remove the product from the cart when clicked 
                                    alt="" 
                                />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null; // Skip rendering items not in the cart
            })}
            <div className="cartitems-down"> {/* section of the cart with price summary and promo code */}
                <div className="cartitems-total">
                    <h1>Summary</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Sub Total</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>  
                            <p>Free</p> 
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>Proceed to Checkout</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here:</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='Enter your promo code'/>
                        <button>Submit</button> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems // Export the component for use in other parts of the application