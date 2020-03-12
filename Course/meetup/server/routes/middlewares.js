const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  }
});

module.exports.upload = upload;

module.exports.handleAvatar = avatars => async (request, response, next) => {
  if (!request.file) return next();
  if (request.file.mimetype !== 'image/png' && request.file.mimetype !== 'image/jpeg') {
    return next(new Error('File format is not supproted'));
  }

  request.file.storedFilename = await avatars.store(request.file.buffer);
  return next();
};
