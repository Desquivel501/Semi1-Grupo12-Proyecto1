import { AwsConfig } from "../interfaces/aws";

export const configS3: AwsConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION as string,
};
