import React, {useEffect, useState} from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

// NewCollections functional component
const NewCollections = () => {

  const [new_collections, setNew_collection] = useState([]); // State hook to manage the new collections data

  // useEffect hook to fetch new collections data when the component is mounted
  useEffect(() =>{ // Fetching new collections from the server (API endpoint)
    fetch('http://localhost:4000/newcollections')
    .then((response)=>response.json()) // Parsing the response as JSON
    .then((data)=>setNew_collection(data)); // Updating the state with the fetched data
  },[]) // Empty dependency array ensures this effect runs only once when the component mounts

  return ( // Main container div for the New Collections section
    <div id="new-collections" className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className="new-collections-item">
            {new_collections.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> // Rendering an Item component for each collection item, passing necessary props
            })}

        </div>
    </div>
  )
}

export default NewCollections // Exporting the NewCollections component for use in other parts of the application