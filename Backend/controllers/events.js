
const eventSchema = require('../models/events');

const createEvent = async (req, res) => {
    try {
        const {
            name,
            location,
            totalSubscribers,
            price,
            startDate,
            endDate,
            startTime,
            endTime,
            category,
            description,
        } = req.body;

        const image = req.file ? req.file.filename : null;

        const event = new eventSchema({
            name,
            location,
            totalSubscribers,
            price,
            startDate,
            endDate,
            startTime,
            endTime,
            category,
            description,
            image,
        });

        await event.save();

        res.status(201).json({
            message: 'Event created successfully',
            event,
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
function calculateEventStatus(event) {
    let status = 'upcoming';
    const now = new Date();
    const startDate = event.startDate ? new Date(event.startDate) : null;
    const endDate = event.endDate ? new Date(event.endDate) : null;
    let start = startDate;
    let end = endDate;
    if (startDate && event.startTime) {
        const [h, m] = event.startTime.split(':');
        start = new Date(startDate);
        start.setHours(Number(h), Number(m || 0), 0, 0);
    }
    if (endDate && event.endTime) {
        const [h, m] = event.endTime.split(':');
        end = new Date(endDate);
        end.setHours(Number(h), Number(m || 0), 59, 999);
    }
    if (start && end) {
        if (now < start) {
            status = 'upcoming';
        } else if (now >= start && now <= end) {
            status = 'ongoing';
        } else {
            status = 'completed';
        }
    } else {
        status = 'upcoming';
    }
    return status;
}

const getAllEvents = async (req, res) => {
    try {
        const events = await eventSchema.find().sort({ createdAt: -1 });
        const eventsWithStatus = events.map(event => {
            const obj = event.toObject();
            obj.status = calculateEventStatus(event);
            return obj;
        });
        res.status(200).json({
            success: true,
            count: eventsWithStatus.length,
            events: eventsWithStatus,
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
 async function getSpecificEvent(req, res) {
    try {
        const event = await eventSchema.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const obj = event.toObject();
        obj.status = calculateEventStatus(event);
        res.status(200).json(obj);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
 }

 async function updateEvent(req, res) {
    const { id } = req.params;
    const {
        name,
        location,
        totalSubscribers,
        price,
        startDate,
        endDate,
        startTime,
        endTime,
        category,
        description
    } = req.body;

    try {
        const specificEvent = await eventSchema.findById(id);
        if (!specificEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const image = req.file ? req.file.filename : specificEvent.image;
        const updatedEvent = await eventSchema.findByIdAndUpdate(
            id,
            {
                name,
                location,
                totalSubscribers,
                price,
                startDate,
                endDate,
                startTime,
                endTime,
                category,
                description,
                image
            },
            { new: true }
        );
        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
 }
 async function deleteEvent(req, res) {
    try {
        const event = await eventSchema.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
 }

 async function getSpecificEventbyCategory(req, res) {
    try {
        const category = req.params.id;
        const events = await eventSchema.find({ category: category });
        // Add status to each event
        const eventsWithStatus = events.map(event => {
            const obj = event.toObject();
            obj.status = calculateEventStatus(event);
            return obj;
        });
        res.status(200).json({
            success: true,
            count: eventsWithStatus.length,
            events: eventsWithStatus,
        });
    } catch (error) {
        console.error('Error fetching events by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
 }
module.exports = {
    createEvent,
    getAllEvents,
    getSpecificEvent,
    deleteEvent,
    updateEvent,
    getSpecificEventbyCategory
};
