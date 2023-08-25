import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
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

const remove = async (name) => {}
