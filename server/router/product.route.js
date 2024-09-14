import express from 'express'
import {getAllProduct , updateProduct , deleteProduct , createProduct} from '../controllers/product.controller.js';

const router = express.Router();

router.get("/getproduct", getAllProduct);

router.post("/create", createProduct)

router.delete("/delete/:id", deleteProduct)

router.put("/update/:id", updateProduct)

export default router;