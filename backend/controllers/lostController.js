import lostModel from "../models/lostModel.js";
import fs from "fs";

// create a new Library
export const createItemController = async (req, res) => {
   try {
     const { name, description,venue } = req.fields;
     const { photo } = req.files;
 
     // Basic validations
     switch (true) {
       case !name:
         return res.status(500).send({ error: "Name is required" });
      case !venue:
         return res.status(500).send({ error: "venue is required" });
      case !description:
         return res.status(500).send({ error: "Description is required" });
      case photo && photo.size > 1000000:
         return res
           .status(500)
           .send({ error: "Photo should be less than 1MB" });
     }
 
     const losts = new lostModel({
       name,
       description,
       venue,   
     });
 
     if (photo) {
       losts.photo.data = fs.readFileSync(photo.path);
       losts.photo.contentType = photo.type;
     }
 
     await losts.save();
 
     res.status(201).send({
       success: true,
       message: "Event created successfully",
       losts,
     });
   } catch (error) {
     console.log(error);
     res.status(500).send({
       success: false,
       error,
       message: "Error in creating product",
     });
   }
 };

// Get all products
export const getItemController = async (req, res) => {
   try {
      const lost = await lostModel
         .find({})
         .select("-photo")
         .limit()
         .sort({ createdAt: -1 });
      res.status(200).send({
         success: true,
         Totalcount: lost.length,
         message: "All products",
         product,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: 'Error in getting products',
         error: error.message
      });
   }
};

// Get single product by User mail id (this feture is cretion is pending -completed till 9 may.)
export const getSingleItemController = async (req, res) => {
   try {
      const lost = await lostModel
         .findOne({ slug: req.params.slug })
         .select("-photo")
      res.status(200).send({
         success: true,
         message: 'Single event fetched',
         lost
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: 'Error while getting single product',
         error,
      });
   }
};

// Get product by ID (new controller method)
export const getItemByIdController = async (req, res) => {
   try {
      const lost = await lostModel.findById(req.params.productId);
      if (!product) {
         return res.status(404).json({ message: 'Event not found' });
      }
      res.json(lost);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error });
   }
};

// Get photo
export const itemPhotoController = async (req, res) => {
   try {
      const lost = await lostModel.findById(req.params.pid).select("photo");
      if (lost.photo.data) {
         res.set('Content-Type', lost.photo.contentType);
         return res.status(200).send(lost.photo.data);
      }
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: 'Error while getting photo',
         error,
      });
   }
};

// Delete product
export const deleteItemController = async (req, res) => {
   try {
      await lostModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
         success: true,
         message: 'Event deleted successfully'
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         message: 'Error while deleting event',
         error,
      });
   }
};


