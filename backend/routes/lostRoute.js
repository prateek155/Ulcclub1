import express from 'express'
import { 
    createItemController, 
    deleteItemController, 
    getItemController, 
    getSingleItemController,
    itemPhotoController, 
    getItemByIdController,  // <-- Import this from the controller
} from "../controllers/lostController.js";
import formidable from "express-formidable";

const router = express.Router()

//routes
router.post(
    "/create-item", 
    formidable(), 
    createItemController
);

//get products
router.get("/get-item", getItemController);

//single product by slug
router.get("/get-item/:slug", getSingleItemController);

//get single product by ID
router.get("/item/:itemId", getItemByIdController);  // <-- New route for fetching by ID

//get photo
router.get('/item-photo/:pid', itemPhotoController);

//delete product
router.delete('/item/:iid', deleteItemController);


export default router;
