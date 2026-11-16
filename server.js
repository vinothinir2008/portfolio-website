require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { Project, Message } = require('./models');

const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Only you (with ADMIN_KEY) can add or delete projects
function requireAdmin(req, res, next) {
  if (!process.env.ADMIN_KEY || req.get('x-admin-key') !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Not authorised.' });
  }
  next();
}

// ---- Projects ----
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Could not load projects.' });
  }
});

app.post('/api/projects', requireAdmin, async (req, res) => {
  try {
    const { title, description, tech, image, link } = req.body;
    const project = await Project.create({ title, description, tech, image, link });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: 'Title and description are required.' });
  }
});

app.delete('/api/projects/:id', requireAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: 'Invalid project id.' });
  }
});

// ---- Contact form ----
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');
  if (!name || !message || !emailOk) {
    return res.status(400).json({ error: 'Please enter your name, a valid email and a message.' });
  }
  try {
    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not save your message. Try again later.' });
  }
});

// View messages you received (needs ADMIN_KEY)
app.get('/api/messages', requireAdmin, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });