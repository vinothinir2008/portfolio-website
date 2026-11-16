require('dotenv').config();
const mongoose = require('mongoose');
const { Project } = require('./models');

const projects = [
  {
    title: 'Task Manager App',
    description: 'Create, edit and complete tasks with filters and reminders.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/your-username/task-manager'
  },
  {
    title: 'Weather Dashboard',
    description: 'Search any city and see a 5-day forecast from a public API.',
    tech: ['JavaScript', 'REST API'],
    link: 'https://github.com/your-username/weather-dashboard'
  },
  {
    title: 'Blog REST API',
    description: 'Express API with MongoDB for posts and comments.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    link: 'https://github.com/your-username/blog-api'
  }
];

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log('Seeded ' + projects.length + ' projects');
  await mongoose.disconnect();
})();