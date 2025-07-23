import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";
import slugify from "slugify";

// create a new Library
export const createProductController = async (req, res) => {
   try {
     const { name, description, category, createdBy, startDate, endDate, venue, eventType } = req.fields;
     const { photo } = req.files;
 
     // Basic validations
     switch (true) {
       case !name:
         return res.status(500).send({ error: "Name is required" });
      case !createdBy:
         return res.status(500).send({ error: "createdBy is required" });
      case !startDate:
         return res.status(500).send({ error: "startDate is required" });
      case !endDate:
         return res.status(500).send({ error: "endDate is required" });
      case !venue:
         return res.status(500).send({ error: "venue is required" });
      case !eventType:
         return res.status(500).send({ error: "eventType is required" });
      case !category:
         return res.status(500).send({ error: "category is required"});
      case !description:
         return res.status(500).send({ error: "Description is required" });
      case photo && photo.size > 1000000:
         return res
           .status(500)
           .send({ error: "Photo should be less than 1MB" });
     }
 
     // Find user by given email or use default
     const userEmailToUse = createdBy || "prateekagrawal120@gmail.com";
     const user = await userModel.findOne({ email: userEmailToUse });
 
     if (!user) {
       return res.status(404).send({
         success: false,
         error: "User not found for given email",
       });
     }
 
     const products = new productModel({
       name,
       description,
       category,
       startDate,
       endDate,
       venue,
       eventType,
       mail: user._id, // ✅ Assign ObjectId from user
     });
 
     if (photo) {
       products.photo.data = fs.readFileSync(photo.path);
       products.photo.contentType = photo.type;
     }
 
     await products.save();
 
     res.status(201).send({
       success: true,
       message: "Event created successfully",
       products,
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
export const getProductController = async (req, res) => {
   try {
      const product = await productModel
         .find({})
         .select("-photo")
         .limit()
         .sort({ createdAt: -1 });
      res.status(200).send({
         success: true,
         Totalcount: product.length,
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
export const getSingleProductController = async (req, res) => {
   try {
      const product = await productModel
         .findOne({ slug: req.params.slug })
         .select("-photo")
      res.status(200).send({
         success: true,
         message: 'Single event fetched',
         product
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
export const getProductByIdController = async (req, res) => {
   try {
      const product = await productModel.findById(req.params.productId);
      if (!product) {
         return res.status(404).json({ message: 'Event not found' });
      }
      res.json(product);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error', error });
   }
};

// Get photo
export const productPhotoController = async (req, res) => {
   try {
      const product = await productModel.findById(req.params.pid).select("photo");
      if (product.photo.data) {
         res.set('Content-Type', product.photo.contentType);
         return res.status(200).send(product.photo.data);
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
export const deleteProductController = async (req, res) => {
   try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo");
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

// Update product
export const updateProductController = async (req, res) => {
   try {
      const { name, description, category, venue, status  } = req.fields;
      const { photo } = req.files;

      // Validation
      switch (true) {
         case !name:
            return res.status(500).send({ error: "Name is required" });
         case !description:
            return res.status(500).send({ error: "Description is required" });         
         case !category:
            return res.status(500).send({ error: "Category is required" });
         case !venue:
             return res.status(500).send({ error: "venue is required" });
         case !status:
             return res.status(500).send({ error: "status is required" });
         case photo && photo.size > 1000000:
            return res.status(500).send({ error: "Photo should be less than 1MB" });
      }

      const products = await productModel.findByIdAndUpdate(
         req.params.pid,
         { ...req.fields, slug: slugify(name) },
         { new: true }
      );
      if (photo) {
         products.photo.data = fs.readFileSync(photo.path);
         products.photo.contentType = photo.type;
      }
      await products.save();
      res.status(201).send({
         success: true,
         message: "Product updated successfully",
         products,
      });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         success: false,
         error,
         message: 'Error in updating product'
      });
   }
}; 

// filters
export const productFilterController = async (req,res) =>{
   try{
     const {checked} = req.body;
     let args = {};
     if (checked.length > 0) args.category = checked;
     const products =await productModel.find(args);
     res.status(200).send({
      success: true,
      products,
     });
    } catch (error) {
      console.log(error)
      res.status(400).send({
         success:false,
         message:'Error while Filtering Products',
         error,
      });
   }
};



//search product
export const searchProductController = async (req,res) => {
   try{
      const {keyword} = req.params
      const result = await productModel.find({
         $or: [
            {name:{$regex :keyword, $option:"i"}},
            {description:{$regex :keyword, $option:"i"}}

         ]
      }).select("-photo");
      res.json(result);
   } catch (error) {
      console.log(error)
      res.status(400).send({
         success:false,
         message:'Error In Search Product API',
         error
      })
   }
};

// Get products created by a specific user
export const getUserProductsController = async (req, res) => {
   try {
     const userId = req.user._id;
 
     const products = await productModel
       .find({ mail: userId })
       .populate("category")
       .select("-photo")
       .sort({ createdAt: -1 });
 
     res.status(200).send({
       success: true,
       message: "User-specific products fetched successfully",
       products,
     });
   } catch (error) {
     console.error(error);
     res.status(500).send({
       success: false,
       message: "Error while fetching user-specific products",
       error,
     });
   }
 };

