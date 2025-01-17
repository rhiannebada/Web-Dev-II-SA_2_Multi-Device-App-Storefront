import React, {useState, useEffect} from 'react'
import './Popular.css'
import Item from '../Item/Item'

// Popular functional component
const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]); // State hook to manage the list of popular products
  useEffect(() =>{ // useEffect hook to fetch popular products data when the component is mounted
    fetch('http://localhost:4000/popularmerch')  // Fetching popular products data from the backend (API endpoint)
   .then((response)=>response.json())
   .then((data)=>setPopularProducts(data));
  },[])

  return ( // Main container for the Popular Releases section
    <div className='popular'>
        <h1>Popular Releases</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item, i)=>{ // Looping through the popularProducts array to display each product item
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> // Rendering an Item component for each product, passing necessary props
            })}
        </div>
    </div>
  )
}

export default Popular // Exporting the Popular component for use in other parts of the application