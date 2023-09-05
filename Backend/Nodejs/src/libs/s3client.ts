import { S3Client } from "@aws-sdk/client-s3";
import { configS3 } from "../config/aws";
import multerS3 from "multer-s3";

const s3Client = new S3Client(configS3);

export const s3StorageImg = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET_NAME as string,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const fileName = "Fotos/" + Date.now() + file.fieldname + file.originalname;
    cb(null, fileName);
  },
});
