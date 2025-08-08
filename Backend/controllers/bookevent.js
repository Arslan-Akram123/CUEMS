const bookingEventSchema = require('../models/bookevent');
const eventSchema = require('../models/events');

const bookEvent = async (req, res) => {
    console.log(req.body);
    const {notes, eventId} = req.body;
   const userId=req.user.id;
    const findusers = await bookingEventSchema.findOne({ user: userId, event: eventId });
    if (!findusers) {
        const newBooking = new bookingEventSchema({ user: userId, event: eventId, bookingNotes: notes });
        try {
            const savedBooking = await newBooking.save();
            res.status(201).json(savedBooking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'You have already booked this event' });
    }
};

async function getNewBookings(req, res) {
    console.log("get new bookings called");
    try {
        const newBookings = await bookingEventSchema.find().populate('user').populate('event').sort({ createdAt: -1 });
        const filterbookings = newBookings.filter(booking => booking.status === 'pending');
        res.status(200).json(filterbookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function UpdateAdminRead(req, res) {
    const {notif_id} = req.body;
  console.log(notif_id);
    try {
        const updatedBooking = await bookingEventSchema.findByIdAndUpdate(notif_id, { adminRead: 'true' }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getSpecificBooking(req, res) {
    const {id} = req.params;
    console.log(" get specific booking",id);
    try {
        const specificBooking = await bookingEventSchema.findById(id).populate('user').populate('event');
        if (!specificBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(specificBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function UpdateConfirmBooking(req, res) {
    const {id} = req.params;
    try {
        const updatedBooking = await bookingEventSchema.findByIdAndUpdate(id, { status: 'confirmed',userRead:'false' }, { new: true }).populate('user').populate('event');
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const event = await eventSchema.findById(updatedBooking.event._id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        event.reservedSeats += 1;
        event.totalSubscribers -= 1;
        await event.save();
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function UpdateCancelBooking(req, res) {
    const {id} = req.params;
    try {
        const updatedBooking = await bookingEventSchema.findByIdAndUpdate(id, { status: 'cancelled',userRead:'false' }, { new: true }).populate('user').populate('event');
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const event = await eventSchema.findById(updatedBooking.event._id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        event.reservedSeats -= 1;
        event.totalSubscribers += 1;
        await event.save();
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllBookings(req, res) {
    try {
        const allBookings = await bookingEventSchema.find().populate('user').populate('event').sort({ createdAt: -1 });
        res.status(200).json(allBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllUserBookings(req, res) {
    console.log("get all user bookings called");
    const userId = req.user.id;
    try {
        const userBookings = await bookingEventSchema.find({ user: userId }).populate('user').populate('event').sort({ createdAt: -1 });
        res.status(200).json(userBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function UpdateUserRead(req, res) {
    console.log("update user read called");
    const {notif_id} = req.body;
    console.log(notif_id);
    try {
        const updatedBooking = await bookingEventSchema.findByIdAndUpdate(notif_id, { userRead: 'true' }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { bookEvent,getNewBookings,UpdateAdminRead,getSpecificBooking,UpdateConfirmBooking,UpdateCancelBooking,getAllBookings,getAllUserBookings,UpdateUserRead };