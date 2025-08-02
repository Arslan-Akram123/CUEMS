const commentSchema = require("../models/comment");


const getAllComments = async (req, res) => {
    try {
        const comments = await commentSchema.find().populate('user').populate('event');
        console.log(comments);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addComment = async (req, res) => {
    const {eventId ,comment,rating } = req.body;
    // console.log(req.user);
    const userId = req.user.id;
    const payload = { user:userId, event:eventId, comment, rating };
    try {
        const newComment = await commentSchema.create(payload);
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCommentById = async (req, res) => {
    const eventId = req.params.id;
    try {
        const comments = await commentSchema.find({ event: eventId })
            .populate('user')
            .populate('event');
            console.log(comments);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { getAllComments, addComment, getCommentById };