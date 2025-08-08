const express=require('express');

const router=express.Router();

const {getsepcificEvents}=require('../controllers/scraping');

router.get('/getsepcificEvents/:uniname',getsepcificEvents);

module.exports=router