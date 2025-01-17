import React from'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // React Router components for routing
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LogInSignup';
import Footer from './Components/Footer/Footer';
import banner_books from './Components/Assets/banner_books.png';
import banner_merch from './Components/Assets/banner_merch.png';
import banner_albums from './Components/Assets/banner_albums.png';


// App component: Contains navigation bar, main content, and footer components.
// The App function sets up the main structure and routing for the application, 
// including pages for the shop, categories, products, cart, and login/signup, 
// while ensuring consistent layout with Navbar and Footer components.
function App() { 
  return (
    <div>
      <BrowserRouter> 
        <Navbar />
        <Routes> 
          <Route path='/' element={<Shop />} /> 
          <Route path='/books' element={<ShopCategory banner={banner_books} category="books" />} />
          <Route path='/merch' element={<ShopCategory banner={banner_merch} category="merch" />} />
          <Route path='/albums' element={<ShopCategory banner={banner_albums} category="albums" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App; // Make App available to other components
