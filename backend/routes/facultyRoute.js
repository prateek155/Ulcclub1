import express from 'express'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    createFacultyController, 
    deleteFacultyController, 
    getFacultyController, 
    facultyPhotoController, 
} from "../controllers/facultyController.js";
import formidable from "express-formidable";

const router = express.Router()

//routes
router.post(
    "/create-faculty", 
    requireSignIn,
    isAdmin, 
    formidable(), 
    createFacultyController
);

//get products
router.get("/all-faculty", getFacultyController);

//get photo
router.get('/faculty-photo/:fid', facultyPhotoController);

//delete product
router.delete('/faculty/:id', deleteFacultyController);


export default router;
