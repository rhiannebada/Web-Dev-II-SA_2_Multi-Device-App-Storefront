import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'; // Component for rendering individual product items

// Component for displaying products within a specific category
const ShopCategory = ({ category, banner }) => {
    const { all_product = [] } = useContext(ShopContext); // Accessing shared state (all products) from the ShopContext
    const filteredProducts = all_product.filter(item => item.category === category); // Filtering products that match the given category
    // Sort products by category, banner, and number of items displayed on the page
    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={banner} alt={`${category} banner`} />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} products
                </p>
            </div>
            <div className="shopCategory-products">
                {filteredProducts.map((item) => (
                    <Item 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    )
}
// Defining the expected props and their types
ShopCategory.propTypes = {
    category: PropTypes.string.isRequired, // Category name for filtering products
    banner: PropTypes.string.isRequired, // Banner image URL for the category
};

export default ShopCategory; // Exporting the ShopCategory component for use in other parts of the application