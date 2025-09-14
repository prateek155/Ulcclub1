import lostModel from "../models/lostModel.js";
import fs from "fs";

// Create a new item
export const createItemController = async (req, res) => {
  try {
    const { name, description, venue } = req.fields;
    const { photo } = req.files;

    // Validations
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !venue:
        return res.status(400).send({ error: "Venue is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const losts = new lostModel({ name, description, venue });

    if (photo) {
      losts.photo.data = fs.readFileSync(photo.path);
      losts.photo.contentType = photo.type;
    }

    await losts.save();

    res.status(201).send({
      success: true,
      message: "Item created successfully",
      losts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating item",
    });
  }
};

// Get all items
export const getItemController = async (req, res) => {
  try {
    const lost = await lostModel
      .find({})
      .select("-photo")
      .limit(50) // set a sensible limit
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      Totalcount: lost.length,
      message: "All items",
      lost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting items",
      error: error.message,
    });
  }
};

// Get single item by slug
export const getSingleItemController = async (req, res) => {
  try {
    const lost = await lostModel.findOne({ slug: req.params.slug }).select("-photo");
    res.status(200).send({
      success: true,
      message: "Single item fetched",
      lost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single item",
      error,
    });
  }
};

// Get item by ID
export const getItemByIdController = async (req, res) => {
  try {
    const lost = await lostModel.findById(req.params.pid);
    if (!lost) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(lost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get item photo
export const itemPhotoController = async (req, res) => {
  try {
    const lost = await lostModel.findById(req.params.pid).select("photo");
    if (lost.photo?.data) {
      res.set("Content-Type", lost.photo.contentType);
      return res.status(200).send(lost.photo.data);
    }
    res.status(404).send({ message: "Photo not found" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

// Delete item
export const deleteItemController = async (req, res) => {
  try {
    await lostModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting item",
      error,
    });
  }
};
