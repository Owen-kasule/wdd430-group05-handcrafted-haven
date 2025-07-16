import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <Link href={`/product/${product.id}`} className="btn btn-primary">
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
