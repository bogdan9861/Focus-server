const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "dfw8vboac",
  api_key: "253866699782782",
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFile = async function (path, public_id) {
  // Configuration

  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id,
    })
    .catch((error) => {
      console.log(error);
    });

  const optimizeUrl = cloudinary.url(public_id, {
    fetch_format: "auto",
    quality: "high",
  });

  console.log(optimizeUrl);

  const autoCropUrl = cloudinary.url(public_id, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  return optimizeUrl;
};

module.exports = uploadFile;
