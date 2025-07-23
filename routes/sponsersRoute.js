import express from "express";
import {
  getSponserController,
  createSponserController,
  sponserPhotoController,
  deleteSponserController
} from "../controllers/sponserController.js";

const router = express.Router();

router.post("/create", createSponserController);
router.get("/get-sponsers", getSponserController);
router.get("/photo/:sid", sponserPhotoController);
// DELETE sponsor
router.delete("/delete-sponser/:sid", deleteSponserController);


export default router;
