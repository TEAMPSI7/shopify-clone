import { Router } from 'express';
import multer from 'multer';
import ProductController from '../controllers/product.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/:id', ProductController.getProduct);
router.get('/', ProductController.getAllProduct);
router.post('', upload.single('productImage'), ProductController.createProduct); 
router.put('/:id', upload.single('productImage'), ProductController.updateProduct); 
router.delete('/:id', ProductController.deleteProduct);

export default router;
