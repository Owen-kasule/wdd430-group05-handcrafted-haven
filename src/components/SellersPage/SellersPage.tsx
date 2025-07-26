'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockSellers } from '@/data/mockData';
import type { Seller } from '@/types/definitions';
import './SellersPage.css';

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [filteredSellers, setFilteredSellers] = useState<Seller[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    setSellers(mockSellers);
    setFilteredSellers(mockSellers);
  }, []);

  useEffect(() => {
    let filtered = [...sellers];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        seller =>
          seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          seller.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          seller.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          seller.specialties.some(specialty =>
            specialty.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(seller =>
        seller.specialties.some(specialty =>
          specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
        )
      );
    }

    // Sort sellers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'sales':
          return b.totalSales - a.totalSales;
        case 'newest':
          return (
            new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
          );
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return b.rating - a.rating;
      }
    });

    setFilteredSellers(filtered);
  }, [sellers, searchTerm, selectedSpecialty, sortBy]);

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'ceramics', label: 'Ceramics' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'woodwork', label: 'Woodwork' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'leather', label: 'Leather Craft' },
    { value: 'glass', label: 'Glass Art' },
    { value: 'fiber', label: 'Fiber Art' },
  ];

  return (
    <div className="sellers-page">
      {/* Header Section */}
      <div className="sellers-header">
        <h1>Meet Our Artisans</h1>
        <p>Discover talented creators and their unique handcrafted stories</p>
      </div>

      {/* Filters */}
      <div className="sellers-filters">
        <div className="filters-row">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search artisans..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="specialty-filter">
            <select
              value={selectedSpecialty}
              onChange={e => setSelectedSpecialty(e.target.value)}
              className="filter-select"
              aria-label="Filter by specialty"
            >
              {specialties.map(specialty => (
                <option key={specialty.value} value={specialty.value}>
                  {specialty.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sort-filter">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="filter-select"
              aria-label="Sort sellers"
            >
              <option value="rating">Highest Rated</option>
              <option value="sales">Most Sales</option>
              <option value="newest">Newest Members</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing {filteredSellers.length} artisans</p>
      </div>

      {/* Sellers Grid */}
      <div className="sellers-grid">
        {filteredSellers.map(seller => (
          <div key={seller.id} className="seller-card">
            <Link href={`/seller/${seller.id}`} className="seller-link">
              <div className="seller-image">
                <img src={seller.profileImage} alt={seller.name} />
              </div>
              <div className="seller-info">
                <h3 className="seller-name">{seller.name}</h3>
                <p className="seller-location">📍 {seller.location}</p>
                <p className="seller-bio">{seller.bio}</p>

                <div className="seller-stats">
                  <div className="stat">
                    <span className="stat-icon">⭐</span>
                    <span className="stat-value">{seller.rating}</span>
                    <span className="stat-label">
                      ({seller.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">📦</span>
                    <span className="stat-value">{seller.totalSales}</span>
                    <span className="stat-label">sales</span>
                  </div>
                </div>

                <div className="seller-specialties">
                  {seller.specialties.slice(0, 3).map(specialty => (
                    <span key={specialty} className="specialty-tag">
                      {specialty}
                    </span>
                  ))}
                  {seller.specialties.length > 3 && (
                    <span className="specialty-tag more">
                      +{seller.specialties.length - 3} more
                    </span>
                  )}
                </div>

                <div className="seller-join-date">
                  Member since {seller.joinDate}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {filteredSellers.length === 0 && (
        <div className="no-sellers">
          <h3>No artisans found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
