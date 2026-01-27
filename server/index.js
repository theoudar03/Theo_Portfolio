require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});


// Import Models
const Message = require('./models/Message');

// --- API ROUTES ---

const projectRoutes = require('./routes/projectRoutes');

// Static Folder for Images
app.use('/uploads', express.static('uploads'));

// --- API ROUTES ---

const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

// --- API ROUTES ---

// 1. Projects Routes
app.use('/api/projects', projectRoutes);

// 2. Skills Routes
app.use('/api/skills', skillRoutes);

// 3. Experience Routes
app.use('/api/experience', experienceRoutes);

// 3. Contact (POST)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
