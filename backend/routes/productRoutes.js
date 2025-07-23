import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    createProductController, 
    deleteProductController, 
    getProductController, 
    getSingleProductController,
    productPhotoController, 
    updateProductController,
    getProductByIdController,  // <-- Import this from the controller
    productFilterController,
    searchProductController,
    getUserProductsController
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router()

//routes
router.post(
    "/create-product", 
    requireSignIn,
    isAdmin, 
    formidable(), 
    createProductController
);
router.put(
    "/update-product/:pid", 
    requireSignIn, 
    formidable(), 
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product by slug
router.get("/get-product/:slug", getSingleProductController);

//get single product by ID
router.get("/product/:productId", getProductByIdController);  // <-- New route for fetching by ID

//get photo
router.get('/product-photo/:pid', productPhotoController);

//delete product
router.delete('/product/:pid', deleteProductController);

//filter product
router.post('/product-filters', productFilterController);

//search product
router.get('/search/:keyword', searchProductController);

// fetching specific products for specific users
router.get("/user-products", requireSignIn, getUserProductsController);

export default router;