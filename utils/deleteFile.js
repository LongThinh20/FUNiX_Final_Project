const fs = require("fs");

const deleteFile = async (filePath) => {
  fs.unlink(filePath, (err) => {
    console.error(err);
  });
};

module.exports = deleteFile;
