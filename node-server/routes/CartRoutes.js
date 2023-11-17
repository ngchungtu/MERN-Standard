import express from 'express';
import { deleteProduct, getProductById, getProducts, postProduct, updateProduct } from '../controllers/CartController.js';
const router = express.Router()

router.post('/', postProduct)

router.get('/', getProducts)

router.get('/:id', getProductById)

router.delete('/:id', deleteProduct)

router.patch('/:id', updateProduct)

export default router