import facultyModel from "../models/facultyModel.js";
import fs from "fs";

// create faculty
export const createFacultyController = async (req, res) => {
  try {
    const { name, description, category, Date, cabin, phone , email} = req.fields;
    const { photo } = req.files;

    // validations
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !Date:
        return res.status(400).send({ error: "Date is required" });
      case !email:
        return res.status(400).send({ error: "email is required" }); 
      case !phone:
        return res.status(400).send({ error: "Phone is required" });
      case !cabin:
        return res.status(400).send({ error: "Cabin is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const faculty = new facultyModel({
      name,
      description,
      category,
      Date,
      cabin,
      phone,
      email
    });

    if (photo) {
      faculty.photo.data = fs.readFileSync(photo.path);
      faculty.photo.contentType = photo.type;
    }

    await faculty.save();

    res.status(201).send({
      success: true,
      message: "Faculty created successfully",
      faculty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating faculty",
    });
  }
};

// get all faculty
export const getFacultyController = async (req, res) => {
  try {
    const faculty = await facultyModel
      .find({})
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      Totalcount: faculty.length,
      message: "All faculty",
      faculty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting faculty",
      error: error.message,
    });
  }
};

// get photo
// get faculty photo
export const facultyPhotoController = async (req, res) => {
  try {
    const faculty = await facultyModel.findById(req.params.fid).select("photo");
    if (faculty.photo.data) {
      res.set("Content-type", faculty.photo.contentType);
      return res.status(200).send(faculty.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};



// delete faculty
export const deleteFacultyController = async (req, res) => {
  try {
    const { id } = req.params; // match your route
    const faculty = await facultyModel.findByIdAndDelete(id);
    if (!faculty) return res.status(404).send({ message: "Faculty not found" });
    res.status(200).send({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting faculty", error });
  }
};
