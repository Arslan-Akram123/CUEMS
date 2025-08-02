const express = require('express');

const { getAllComments, addComment, getCommentById }=require('../controllers/comment');

const Router=express.Router();


Router.get('/getAllComments',getAllComments);
Router.post('/addComment',addComment);
Router.get('/getComment/:id',getCommentById);


module.exports=Router