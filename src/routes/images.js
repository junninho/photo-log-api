const { getPhotos } = require("../db")

module.exports = async (req, res) => {
  const photos = await getPhotos();
  res.send(photos);
}