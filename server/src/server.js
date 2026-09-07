import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import coverLetterRoutes from "./routes/coverLetterRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Cover Letter API is running"
  });
});

app.use("/api/cover-letter", coverLetterRoutes);

app.use((error, req, res, next) => {
  console.error(error);

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "PDF must be smaller than 5 MB."
    });
  }

  return res.status(400).json({
    success: false,
    message: error.message || "Something went wrong."
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});