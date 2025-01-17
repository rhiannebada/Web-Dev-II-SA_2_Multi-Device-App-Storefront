import React, { createContext, useMemo, useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types'; // For type-checking of props

// Provide a default value for the context
const defaultContextValue = { all_product: [] }; 
// Creating the ShopContext to manage and share state across the app
export const ShopContext = createContext(defaultContextValue);

const getDefaultCart = () => { // Function to generate a default empty cart with 300 items
    let cart = {}; // Looping through to create cart items and setting their initial quantity to 0
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

// ShopContextProvider component that wraps the app to provide context values
const ShopContextProvider = ({ children }) => {
    // State to manage all products and cart items
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart()); // Initializing cart with default values
    // useEffect hook to fetch product data and cart items (if authenticated) on component mount
    useEffect(() => {
        fetch('http://localhost:4000/allproducts') // Fetching all products from the backend
       .then((response)=>response.json())
       .then((data)=>setAll_Product(data))
        // Checking if the user is authenticated and retrieving cart data from the backend
       if(localStorage.getItem('auth-token')) {
        fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: "",
       }).then((response)=>response.json())
       .then((data) => setCartItems(data)); // Setting fetched cart items to state
    }
    
}, []); // Empty dependency array means this effect runs once on component mount
    // Function to add an item to the cart and send it to the backend
    const addToCart = useCallback((itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem('auth-token')) { // If authenticated, sending the updated cart data to the backend
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}), // Sending the itemId in the request body
            })
            .then((response) => response.json())
            .then((data) => console.log(data)); // Handling the response from the backend
    }});   
    // Function to remove an item from the cart and send it to the backend
    const removeFromCart = useCallback((itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 })); // Decrementing cart quantity for the item
        if(localStorage.getItem('auth-token')) { // If authenticated, sending the updated cart data to the backend
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"itemId": itemId}),
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
    }});   
    // Function to calculate the total cart amount based on cart items and product prices
    const getTotalCartAmount = useCallback(() => {
        let totalAmount = 0;
        for (const item in cartItems) { // Looping through cartItems to calculate the total price of items in the cart
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }, [cartItems, all_product]);
    // Function to calculate the total number of items in the cart
    const getTotalCartItems = useCallback(() => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item]; // Adding the quantity to the total
            }
        }
        return totalItem; // Returning the total number of items
    }, [cartItems]);
    // Memoizing the context value to optimize performance and avoid unnecessary re-renders
    const contextValue = useMemo(() => ({ 
        getTotalCartAmount, 
        getTotalCartItems, 
        all_product, 
        cartItems, 
        addToCart, 
        removeFromCart 
    }), [cartItems, getTotalCartAmount, getTotalCartItems, all_product, addToCart, removeFromCart]);

    return ( // Returning the ShopContext.Provider to provide the context value to the children components
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = { // PropTypes validation for the children prop
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider; // Exporting the ShopContextProvider component for use in other components