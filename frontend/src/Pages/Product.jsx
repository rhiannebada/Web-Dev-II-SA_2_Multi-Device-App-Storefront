import React, {useContext} from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

// Product component to display detailed information about a specific product
const Product = () => {
    const {all_product} = useContext(ShopContext); // Extracting all_product data from the ShopContext
    const {productId} = useParams(); // Retrieving the productId parameter from the URL
    const product = all_product.find((e) => e.id === Number(productId)); // Finding the product in the all_product array that matches the productId
    return ( // Order of components: ProductDisplay, DescriptionBox, RelatedProducts
        <div>
            <ProductDisplay product={product}/>
            <DescriptionBox />
            <RelatedProducts />
        </div>
    )
};

export default Product; // exporting the Product component for use in other parts of the application
