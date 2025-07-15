import { Router, Request, Response } from 'express';
import { mockProducts, mockReviews } from '../data/mockData';
import { Product } from '@handcrafted-haven/types';

const router: Router = Router();

// Get all products
router.get('/', (req: Request, res: Response) => {
  const { category, featured, limit } = req.query;

  let filteredProducts = [...mockProducts];

  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(
      (product: Product) =>
        product.category.toLowerCase() === category.toString().toLowerCase()
    );
  }

  // Filter by featured
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(
      (product: Product) => product.featured
    );
  }

  // Apply limit
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit.toString()));
  }

  res.json(filteredProducts);
});

// Get product by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = mockProducts.find((p: Product) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

// Get reviews for a product
router.get('/:id/reviews', (req: Request, res: Response) => {
  const { id } = req.params;
  const productReviews = mockReviews.filter(
    (review: any) => review.productId === id
  );

  res.json(productReviews);
});

export { router as productsRouter };
