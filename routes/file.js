var express = require('express');
var router = express.Router();
const fileControllers = require('../controllers/file.controllers');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  var upload = multer({ storage: storage })

router.post('/api/save', upload.single("file"), fileControllers.saveFile);

router.get('/api/down/:path', fileControllers.downFile);

module.exports = router;