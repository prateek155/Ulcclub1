import sponsersModel from "../models/sponsersModel.js";
import fs from "fs";
import formidable from "formidable";

// create a new Sponser
export const createSponserController = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("Formidable Error", err);
      return res.status(400).send({ error: "Form data parsing error" });
    }

    const { sponsername, description, startDate, endDate } = fields;
    const { photo } = files;

    // Basic validations
    switch (true) {
      case !sponsername:
        return res.status(400).send({ error: "SponserName is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !startDate:
        return res.status(400).send({ error: "Start date is required" });
      case !endDate:
        return res.status(400).send({ error: "End date is required" });
      case photo && photo.size > 5000000:
        return res.status(400).send({ error: "Photo should be less than 5MB" });
    }

    try {
      const sponsers = new sponsersModel({
        sponsername,
        description,
        startDate,
        endDate,
      });

      if (photo) {
        sponsers.photo.data = fs.readFileSync(photo.path);
        sponsers.photo.contentType = photo.type;
      }

      await sponsers.save();
      res.status(201).send({
        success: true,
        message: "Sponser created successfully",
        sponsers,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in creating sponser",
      });
    }
  });
};

// Get single sponser photo
export const sponserPhotoController = async (req, res) => {
  try {
    const sponser = await sponsersModel.findById(req.params.sid).select("photo");
    if (sponser?.photo?.data) {
      res.set("Content-type", sponser.photo.contentType);
      return res.status(200).send(sponser.photo.data);
    }
  } catch (error) {
    res.status(500).send({ error: "Error while fetching sponser photo" });
  }
};

// GET all sponsers (excluding photo) for slideshow
export const getSponserController = async (req, res) => {
  try {
    const sponsers = await sponsersModel
      .find({})
      .select("-photo") // Exclude binary photo data
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).send({
      success: true,
      message: "All sponsers fetched successfully",
      sponser: sponsers,
    });
  } catch (error) {
    console.log("Error fetching sponsers:", error);
    res.status(500).send({
      success: false,
      message: "Error in getting sponsers",
      error: error.message,
    });
  }
};

// DELETE a specific sponser by ID
export const deleteSponserController = async (req, res) => {
  try {
    const sponserId = req.params.sid;

    const deletedSponser = await sponsersModel.findByIdAndDelete(sponserId);

    if (!deletedSponser) {
      return res.status(404).send({
        success: false,
        message: "Sponser not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Sponser deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting sponser:", error);
    res.status(500).send({
      success: false,
      message: "Error while deleting sponser",
      error: error.message,
    });
  }
};
