import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFile = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME!,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const folderName = process.env.S3_FOLDER_NAME!;
      const fileName = Date.now().toString() + "-" + file.originalname.split(" ").join("_");
      const fullPath = `${folderName}/${fileName}`;
      cb(null, fullPath);
    },
  }),
});

export const deleteFile = async (key: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};
