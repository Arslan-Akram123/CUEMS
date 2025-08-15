
const Contactus = require('../models/contactus'); 

async function createContactUs(req, res) {
    console.log('Received contact data:', req.user, req.body);
    const userId = req.user.id; 
    if (!req.body.message) {
        return res.status(400).json({ message: 'Message is required' });
    }
    const {  message } = req.body;
    
    try {
        const contactUs = await Contactus.create({userId, message });
        res.status(201).json(contactUs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createContactUs };