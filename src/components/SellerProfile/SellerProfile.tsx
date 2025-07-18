'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '@/components/Loading/Loading';
import type { Product } from '@/data/mockData';
import './SellerProfile.css';

interface Seller {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  location: string;
  joinDate: string;
  rating: number;
  totalReviews: number;
  totalSales: number;
  specialties: string[];
  story: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
  };
}

export default function SellerProfile() {
  const params = useParams();
  const id = params.id as string;
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Mock seller data - in real app, this would fetch from API
    const mockSeller: Seller = {
      id: id,
      name: "Maria Rodriguez",
      bio: "Passionate ceramic artist with over 15 years of experience creating unique, handcrafted pieces. I draw inspiration from traditional Mexican pottery techniques passed down through generations, combined with contemporary design elements.",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      location: "Santa Fe, New Mexico",
      joinDate: "March 2020",
      rating: 4.8,
      totalReviews: 247,
      totalSales: 1250,
      specialties: ["Ceramics", "Pottery", "Home Decor", "Garden Art"],
      story: "My journey as an artisan began in my grandmother's workshop in Oaxaca, where I learned the ancient art of pottery making. Each piece I create tells a story, blending traditional techniques with modern aesthetics to create functional art that brings joy to everyday life.",
      contact: {
        email: "maria@handcraftedhaven.com",
        phone: "(505) 123-4567",
        website: "www.mariaceramics.com"
      },
      socialMedia: {
        instagram: "@mariaceramics",
        facebook: "Maria Rodriguez Ceramics"
      }
    };

    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Ceramic Dinner Plate Set",
        price: 125.00,
        image: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
        images: ["https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300"],
        sellerName: "Maria Rodriguez",
        sellerId: id,
        featured: true,
        category: "ceramics",
        description: "Beautiful ceramic dinner plates",
        rating: 4.8,
        createdAt: new Date("2024-01-01"),
        inStock: true,
        specifications: {
          "Material": "Ceramic",
          "Size": "10 inches",
          "Color": "Earth tones"
        }
      },
      {
        id: "2",
        name: "Handcrafted Coffee Mug",
        price: 32.00,
        image: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
        images: ["https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300"],
        sellerName: "Maria Rodriguez",
        sellerId: id,
        featured: false,
        category: "ceramics",
        description: "Handcrafted ceramic coffee mug",
        rating: 4.7,
        createdAt: new Date("2024-01-02"),
        inStock: true,
        specifications: {
          "Material": "Ceramic",
          "Capacity": "12 oz",
          "Color": "Blue"
        }
      },
      {
        id: "3",
        name: "Decorative Serving Bowl",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
        images: ["https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300"],
        sellerName: "Maria Rodriguez",
        sellerId: id,
        featured: false,
        category: "ceramics",
        description: "Decorative ceramic serving bowl",
        rating: 4.9,
        createdAt: new Date("2024-01-03"),
        inStock: true,
        specifications: {
          "Material": "Ceramic",
          "Size": "8 inches",
          "Color": "Green"
        }
      }
    ];

    setSeller(mockSeller);
    setProducts(mockProducts);
  }, [id]);

  if (!seller) {
    return <Loading message="Loading seller profile..." />;
  }

  return (
    <div className="seller-profile">
      <div className="seller-header">
        <div className="seller-info">
          <img src={seller.profileImage} alt={seller.name} className="seller-avatar" />
          <div className="seller-details">
            <h1 className="seller-name">{seller.name}</h1>
            <p className="seller-location">{seller.location}</p>
            <div className="seller-stats">
              <div className="stat">
                <span className="stat-number">{seller.rating}</span>
                <span className="stat-label">Rating</span>
                <div className="rating-stars">
                  <span className="stars">★★★★★</span>
                  <span className="review-count">({seller.totalReviews} reviews)</span>
                </div>
              </div>
              <div className="stat">
                <span className="stat-number">{seller.totalSales}</span>
                <span className="stat-label">Total Sales</span>
              </div>
              <div className="stat">
                <span className="stat-number">{seller.joinDate}</span>
                <span className="stat-label">Member Since</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="seller-content">
        <div className="seller-story">
          <h2>About the Artisan</h2>
          <p className="seller-bio">{seller.bio}</p>
          <p className="seller-story-text">{seller.story}</p>
          
          <div className="seller-specialties">
            <h3>Specialties</h3>
            <div className="specialty-tags">
              {seller.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">{specialty}</span>
              ))}
            </div>
          </div>

          <div className="seller-contact">
            <h3>Contact Information</h3>
            <div className="contact-info">
              <p><strong>Email:</strong> {seller.contact.email}</p>
              <p><strong>Phone:</strong> {seller.contact.phone}</p>
              <p><strong>Website:</strong> <a href={`https://${seller.contact.website}`} target="_blank" rel="noopener noreferrer">{seller.contact.website}</a></p>
            </div>
            <div className="social-media">
              <p><strong>Follow on Social Media:</strong></p>
              <div className="social-links">
                <a href={`https://instagram.com/${seller.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                  Instagram: {seller.socialMedia.instagram}
                </a>
                <a href={`https://facebook.com/${seller.socialMedia.facebook.replace(' ', '')}`} target="_blank" rel="noopener noreferrer">
                  Facebook: {seller.socialMedia.facebook}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="seller-products">
          <h2>Products by {seller.name}</h2>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
