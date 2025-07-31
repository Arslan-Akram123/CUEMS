// Load environment variables
require('dotenv').config();

// Import necessary modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// internal modules
const {auth} = require('./middlewares/auth');
const connectDB = require('./utils/connection');
const userRoutes = require('./routes/user');
const settingRoutes = require('./routes/setting');
const categoryRoutes = require('./routes/category');
const universityRoutes = require('./routes/universities');
const noticeRoutes = require('./routes/notice');
// Connect to the database
connectDB();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT ;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use('/auth', userRoutes);
app.use('/settings',auth, settingRoutes);
app.use('/category',auth, categoryRoutes);
app.use('/universities',auth, universityRoutes);
app.use('/notices',auth, noticeRoutes);




app.listen(PORT, (err) => {
    console.log(err ? `Error starting server: ${err}` : '');
  console.log(`Server is running on http://localhost:${PORT}`);
});

