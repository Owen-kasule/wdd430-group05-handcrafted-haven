import React from 'react';
import './skeletonLoader.css';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm`}
    >
      <div className="flex flex-col h-full">
        {/* Image placeholder */}
        <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>

        {/* Content placeholder */}
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-3-4 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-1-4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1-2 mb-2"></div>
          <div className="flex items-center mb-3">
            <div className="h-4 bg-gray-200 rounded w-16 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </div>
        </div>

        {/* Button placeholder */}
        <div className="h-10 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}

export function SellerProfileSkeleton() {
  return (
    <div className="seller-profile skeleton">
      <div className="seller-header">
        <div className="seller-info">
          <div className="seller-avatar skeleton-element"></div>
          <div className="seller-details">
            <div className="skeleton-element skeleton-title"></div>
            <div className="skeleton-element skeleton-text"></div>
            <div className="seller-stats">
              {[1, 2, 3].map(item => (
                <div key={item} className="stat">
                  <div className="skeleton-element skeleton-stat-number"></div>
                  <div className="skeleton-element skeleton-stat-label"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="seller-content">
        <div className="seller-story">
          <div className="skeleton-element skeleton-subtitle"></div>
          <div className="skeleton-element skeleton-paragraph"></div>
          <div className="skeleton-element skeleton-paragraph"></div>
          <div className="skeleton-element skeleton-paragraph"></div>

          <div className="seller-specialties">
            <div className="skeleton-element skeleton-subtitle"></div>
            <div className="specialty-tags">
              {[1, 2, 3].map(item => (
                <div key={item} className="skeleton-element skeleton-tag"></div>
              ))}
            </div>
          </div>

          <div className="seller-contact">
            <div className="skeleton-element skeleton-subtitle"></div>
            <div className="contact-info">
              {[1, 2, 3].map(item => (
                <div
                  key={item}
                  className="skeleton-element skeleton-text"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="seller-products">
          <div className="skeleton-element skeleton-subtitle"></div>
          <div className="products-grid">
            {[1, 2, 3, 4].map(item => (
              <div key={item} className="product-card-skeleton">
                <div className="skeleton-element skeleton-product-image"></div>
                <div className="skeleton-element skeleton-product-title"></div>
                <div className="skeleton-element skeleton-product-price"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map(item => (
        <div key={item} className="seller-card-skeleton">
          <div className="seller-image-skeleton skeleton-shimmer"></div>
          <div className="seller-info-skeleton">
            <div className="skeleton-title skeleton-shimmer"></div>
            <div className="skeleton-text skeleton-shimmer"></div>
            <div className="skeleton-text short skeleton-shimmer"></div>
            <div className="skeleton-stats">
              <div className="skeleton-stat skeleton-shimmer"></div>
              <div className="skeleton-stat skeleton-shimmer"></div>
            </div>
            <div className="skeleton-tags">
              <div className="skeleton-tag skeleton-shimmer"></div>
              <div className="skeleton-tag skeleton-shimmer"></div>
            </div>
            <div className="skeleton-date skeleton-shimmer"></div>
          </div>
        </div>
      ))}
    </>
  );
}
