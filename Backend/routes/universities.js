const express=require('express');
const multer = require('multer');
const {addUniversity,getAllUniversities,updateUniversity,deleteUniversity,getUniversityById}=require('../controllers/universities');
const Router=express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Frontend/public/uploads/universities/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

Router.post('/addUniversity',upload.single('logo'),addUniversity);
Router.get('/getUniversities',getAllUniversities);
Router.get('/getUniversity/:id',getUniversityById);
Router.put('/updateUniversity/:id',upload.single('logo'),updateUniversity);
Router.delete('/deleteUniversity/:id',deleteUniversity);

module.exports=Router