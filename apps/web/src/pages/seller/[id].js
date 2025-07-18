import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';

export default function SellerProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!id) return;
    
    // Mock seller data - in real app, this would fetch from API
    const mockSeller = {
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

    const mockProducts = [
      {
        id: "1",
        name: "Ceramic Dinner Plate Set",
        price: 125.00,
        imageUrl: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
        sellerName: "Maria Rodriguez",
        reviewCount: 45,
        featured: true
      },
      {
        id: "2",
        name: "Handcrafted Coffee Mug",
        price: 32.00,
        imageUrl: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
        sellerName: "Maria Rodriguez",
        reviewCount: 28,
        featured: false
      },
      {
        id: "3",
        name: "Decorative Serving Bowl",
        price: 89.99,
        imageUrl: "https://images.unsplash.com/photo-1571864358655-eda1b38b2549?w=300",
        sellerName: "Maria Rodriguez",
        reviewCount: 52,
        featured: false
      }
    ];

    setSeller(mockSeller);
    setProducts(mockProducts);
  }, [id]);

  if (!seller) {
    return <div className="loading">Loading seller profile...</div>;
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
