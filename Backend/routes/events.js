const express =require('express');
const multer = require('multer');
const {createEvent,getAllEvents,getSpecificEvent,deleteEvent,updateEvent}=require('../controllers/events');

const Router=express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Frontend/public/uploads/events/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });



Router.post('/createEvent',upload.single('image'),createEvent);
Router.get('/getAllEvents',getAllEvents);
Router.get('/getEvent/:id',getSpecificEvent);
Router.put('/updateEvent/:id',upload.single('image'),updateEvent);
Router.delete('/deleteEvent/:id',deleteEvent);

module.exports=Router