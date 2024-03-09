import path from "node:path";
import express from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize AWS S3 client
const bucket = "rami-estore";
const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MY_S3_ACCESS_KEY,
    secretAccessKey: process.env.MY_S3_SECRET_KEY,
  },
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname).toLowerCase();
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".gif" &&
    ext !== ".jpeg" &&
    ext !== "webp"
  ) {
    return cb(new Error("Only images are allowed"));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

/* router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
}); */

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file to S3:", err);
      return res.status(400).json({ error: "Failed to upload file to S3" });
    } else if (req.file) {
      const file = req.file;
      if (!file) {
        throw new Error("No image file provided");
      }

      const extension = file.originalname.split(".")[1];
      const newPath = Date.now() + "." + extension;

      const uploadParams = {
        Bucket: bucket,
        Key: newPath,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read", // Adjust permissions as needed
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      res.status(200).json({
        message: "Image uploaded successfully",
        image: `https://${bucket}.s3.amazonaws.com/${newPath}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
