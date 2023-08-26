import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
// Set the AWS Region.
const REGION = process.env.REGION //e.g. "us-east-1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const Bucket = process.env.RISEVEST_BUCKET
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})
export { s3Client }

export const upload = async (data) => {
  try {
    const command = new PutObjectCommand({ ...data, Bucket })
    const results = await s3Client.send(command)

    console.log(results)

    return results
  } catch (e) {
    console.log(e)
  }
}

export const downloadFilesFromBucket = async (Key) => {
  // const { Contents } = await s3Client.send(
  //   new ListObjectsCommand({ Bucket: })
  // );
  // const path = await promptForText("Enter destination path for files:");

  // for (let content of Contents) {
  const obj = await s3Client.send(new GetObjectCommand({ Bucket, Key }))
  //   writeFileSync(
  //     `${path}/${content.Key}`,
  //     await obj.Body.transformToByteArray()
  //   );
  // }
  // console.log("Files downloaded successfully.\n");
  return obj
}

export const deleteFileFromBucket = async (Key) => {
  await s3Client.send(new DeleteObjectCommand({ Bucket, Key }))

  return
}

const remove = async (name) => {}
