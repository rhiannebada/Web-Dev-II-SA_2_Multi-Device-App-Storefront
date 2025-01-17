import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import CartItems from '../Components/CartItems/CartItems';

const Cart = () => { // Cart component to display the shopping cart
    const { cartItems, all_product } = useContext(ShopContext); // Using the useContext hook to access cartItems and all_product from the ShopContext

    return (
        <div>
            <CartItems cartItems={cartItems} all_product={all_product} />
        </div>
    )
};

export default Cart; // Exporting the Cart component for use in other parts of the application