

var aws = require('aws-sdk'); 
const { addPhoto } = require('../db');
// Configure aws with accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.Bucket
module.exports = (req, res) => {
  const s3 = new aws.S3();  // Create a new instance of S3

  const fn = `${Date.now()}-${req.body.fileName}`

  const data = {
    Bucket: S3_BUCKET,
    Key: fn,
    Body: req.file.buffer
  };
  console.log(req)
  const photo = {
    fileName: fn,
    creationDate: req.body.creationDate,
    cameraModel: req.body.cameraModel,
    category: req.body.category,
    size: req.body.size
  }
  
  s3.upload(data, (err, data) => {
    if (err) {
      throw err;
    }

    console.log(`File uploaded successfully. ${data.Location}`);
    
    photo.url= data.Location;

    // console.log(photo);
  
    addPhoto(photo)
  })

  
}