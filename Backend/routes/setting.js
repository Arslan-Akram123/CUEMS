const express = require('express');
const multer = require('multer');
const { addProfileData,getProfileData,ChangePassword } = require('../controllers/setting');
const Router = express.Router();


// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Frontend/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

  Router.post('/addProfileData',upload.single('profileImage'),addProfileData);
Router.get('/getProfileData',getProfileData);
Router.post('/change-password',ChangePassword); 


module.exports = Router;