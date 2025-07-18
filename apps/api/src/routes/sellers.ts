import { Router, Request, Response } from 'express';
import { mockSellers, mockProducts } from '../data/mockData';

const router: Router = Router();

// Get all sellers
router.get('/', (req: Request, res: Response) => {
  res.json(mockSellers);
});

// Get seller by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const seller = mockSellers.find(s => s.id === id);
  
  if (!seller) {
    return res.status(404).json({ error: 'Seller not found' });
  }
  
  res.json(seller);
});

// Get products by seller
router.get('/:id/products', (req: Request, res: Response) => {
  const { id } = req.params;
  const sellerProducts = mockProducts.filter(product => product.sellerId === id);
  
  res.json(sellerProducts);
});

export { router as sellersRouter };
