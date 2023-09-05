export interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
}
export interface AwsConfig {
  region: string;
  credentials: AwsCredentials
}
export interface S3Params {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: "image";
}
