# Personal Portfolio Website

A full-stack personal portfolio built as part of my Thiranex Full Stack Internship. It showcases my projects and skills, and includes a working contact form backed by a database.

**Live Demo:** https://portfolio-website-g45d.onrender.com

## Features
- Responsive portfolio pages (About, Skills, Projects, Contact)
- Projects loaded from a MongoDB database
- Contact form that stores messages in the database
- Only the owner can add or delete projects and view contact messages using a secret admin key

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Hosting:** Render

## Project Structure
```
public/        Frontend files (index.html, script.js, style.css)
models.js      Database models
server.js      Express server and API routes
seed.js        Script to add sample project data
package.json   Dependencies and scripts
```

## Run Locally
1. Clone the repository
   ```
   git clone https://github.com/vinothinir2008/portfolio-website.git
   cd portfolio-website
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the root folder
   ```
   MONGODB_URI=your_mongodb_connection_string
   ADMIN_KEY=your_secret_key
   ```
4. (Optional) Add sample data
   ```
   node seed.js
   ```
5. Start the server
   ```
   node server.js
   ```
6. Open `http://localhost:3000` in your browser

## Deployment
Deployed on Render as a Node web service. Environment variables (`MONGODB_URI`, `ADMIN_KEY`) are set in the Render dashboard.

## Author
Vinothini R

GitHub: https://github.com/vinothinir2008
