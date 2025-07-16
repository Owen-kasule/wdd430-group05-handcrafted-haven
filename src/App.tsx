import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from '@/src/components/HomePage/Homepage';
import ProductPage from './components/ProductPage';
import SellerProfile from './components/SellerProfile';
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
            <Route path="/seller/:id" element={<SellerProfile />} />
            <Route path="/products" element={<div className="placeholder">Products Page - Coming Soon</div>} />
            <Route path="/sellers" element={<div className="placeholder">Sellers Page - Coming Soon</div>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<div className="placeholder">Login Page - Coming Soon</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
