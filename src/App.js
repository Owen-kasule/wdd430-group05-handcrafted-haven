import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import ProductPage from './components/ProductPage';
import ProductsPage from './components/ProductsPage';
import SellerProfile from './components/SellerProfile';
import SellersPage from './components/SellersPage';
import AboutPage from './components/AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/seller/:id" element={<SellerProfile />} />
            <Route path="/sellers" element={<SellersPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<div className="placeholder">Login Page - Coming Soon</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
