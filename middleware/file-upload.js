const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

function upload(bucketName) {
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, res, cb) {
        cb(null, 'image.jpeg');
      },
    }),
  });
}

module.exports = upload;
