'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '../ProductCard/ProductCard';
import { getProducts, getCategories } from '@/data/server-data';
import type { Product, Category } from '@/types/definitions';
import { CardsSkeleton } from '@/components/skeletonLoader/skeleton';
import { Suspense } from 'react';
import { useDebounce } from 'use-debounce';
import './ProductsPage.css';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 3000);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 12;
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial filters from URL
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    if (categoryParam) {
      if (!isNaN(Number(categoryParam))) {
        setSelectedCategory(categoryParam);
      } else if (categoryParam === 'all') {
        setSelectedCategory('all');
      }
    }

    if (searchParam) {
      setInputValue(searchParam);
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products (debounced search)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { products: filteredProducts, totalCount } = await getProducts({
          query: debouncedSearchTerm,
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          sortBy,
          page: currentPage,
          itemsPerPage,
        });

        setProducts(filteredProducts);
        setTotalCount(totalCount);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm, selectedCategory, priceRange, sortBy, currentPage]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (searchTerm) params.set('search', searchTerm);

    router.replace(`/products${params.toString() ? `?${params}` : ''}`);
  }, [selectedCategory, searchTerm, router]);

  const handleSearchChange = (term: string) => {
    setInputValue(term);
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setInputValue('');
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 1000 });
    setSortBy('featured');
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="products-page">
      {/* Header Section */}
      <div className="products-header">
        <h1>All Products</h1>
        <p>Discover unique handcrafted items from talented artisans</p>
      </div>

      {/* Filters and Search */}
      <div className="filters-container">
        <div className="filters-row">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search products..."
              value={inputValue}
              onChange={e => handleSearchChange(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="price-filter">
            <label>
              Price Range: ${priceRange.min} - ${priceRange.max}
            </label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={e =>
                  setPriceRange({
                    ...priceRange,
                    min: parseInt(e.target.value) || 0,
                  })
                }
                className="price-input"
                min="0"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={e =>
                  setPriceRange({
                    ...priceRange,
                    max: parseInt(e.target.value) || 1000,
                  })
                }
                className="price-input"
                min="0"
              />
            </div>
          </div>

          <div className="sort-filter">
            <select
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>
          Showing {loading ? '...' : products.length} of{' '}
          {loading ? '...' : totalCount} products
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <Suspense fallback={<CardsSkeleton />}>
          <div className="products-grid">
            <CardsSkeleton />
          </div>
        </Suspense>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
