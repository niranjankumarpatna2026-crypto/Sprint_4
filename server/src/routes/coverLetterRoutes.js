import express from "express";
import multer from "multer";
import { generateCoverLetterController } from "../controllers/coverLetterController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed."));
    }
  }
});

router.post(
  "/generate",
  upload.single("resume"),
  generateCoverLetterController
);

export default router;