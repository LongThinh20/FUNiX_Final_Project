const getImage = (req, res) => {
  const fileName = req.params.imageName;
  if (fileName) {
    res.sendFile(path.resolve(`./images/${fileName}`));
  }
};

module.exports = { getImage };
