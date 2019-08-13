const compressFile = require('./compressFile')

module.exports = function (file, options, callback) {
  compressFile(file, options)
    .then(() => callback(null))
    .catch((err) => callback(err))
}
