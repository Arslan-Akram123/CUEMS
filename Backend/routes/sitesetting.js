const express = require('express');
const multer = require('multer');
const Router = express.Router();
const {
    getSiteSetting,
    updateSiteSetting
} = require('../controllers/sitesetting');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Frontend/public/uploads/siteSettings/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

Router.get('/getSiteSetting', getSiteSetting);
Router.put('/updateSiteSetting',upload.fields([
  { name: 'siteMainImage', maxCount: 1 },
  { name: 'siteLogo', maxCount: 1 }
]), updateSiteSetting);
module.exports = Router;