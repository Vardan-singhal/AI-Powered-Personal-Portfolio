# 🚀 AI Powered Personal Portfolio

An AI-powered full-stack developer portfolio built with the MERN stack, designed to showcase projects, skills, experience, and AI integrations in an interactive and recruiter-friendly way.

The platform goes beyond a traditional portfolio by integrating intelligent features such as an AI Recruiter Assistant, Resume Analysis, Job Matching, Project Explanations, GitHub Analytics, and Dynamic Content Management.

---

## 🌐 Live Demo

**Portfolio:** [Add Live URL]

**Frontend Repository:** [Add GitHub URL]

**Backend Repository:** [Add GitHub URL]

---

## ✨ Features

### 🤖 AI Recruiter Assistant

* Interactive AI chatbot trained on portfolio data
* Answers recruiter questions about:

  * Skills
  * Projects
  * Experience
  * Education
  * Technologies
* Displays project cards with:

  * Live Demo links
  * GitHub links
* Context-aware conversations

---

### 📂 Dynamic Project Showcase

* Admin-managed projects
* Featured projects section
* Technology stack display
* GitHub repository links
* Live deployment links
* AI-powered project explanations

---

### 📄 Resume AI

* Upload resume for AI review
* ATS compatibility analysis
* Strengths and weaknesses detection
* Missing keyword suggestions
* Resume improvement recommendations

---

### 🎯 AI Job Matcher

* Compare resume against job descriptions
* Match score generation
* Skill gap identification
* Personalized recommendations

---

### 📊 GitHub Analytics

* GitHub profile integration
* Repository insights
* Contribution statistics
* Technology usage overview

---

### 🛠 Admin Dashboard

* Secure authentication
* Project management
* Content management
* Portfolio updates without code changes

---

### 📱 Modern Portfolio Experience

* Fully responsive design
* Dark modern UI
* Framer Motion animations
* Interactive hero section
* Professional profile presentation
* AI-enhanced user experience

---

## 🏗 Architecture

```text
Frontend (React + Vite)
        │
        ▼
Backend (Node.js + Express)
        │
        ▼
MongoDB Atlas
        │
        ▼
Google Gemini AI
```

---

## 🧰 Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Tailwind CSS
* Framer Motion
* React Icons
* React Markdown
* React Type Animation

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Cloudinary

### AI & Integrations

* Google Gemini API
* Resume Analysis Engine
* Project Explanation Engine
* AI Recruiter Assistant

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)
* Cloudinary (Media Storage)

---

## 📁 Project Structure

```text
ai-developer-hub/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── uploads/
│   │   └── utils/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_API_URL=your_backend_url
```

### Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/ai-developer-hub.git
```

---

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

### Backend Setup

```bash
cd server

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## 📡 API Modules

### Authentication

```text
/api/auth
```

### AI Chat

```text
/api/chat
```

### Projects

```text
/api/projects
```

### GitHub

```text
/api/github
```

### Resume AI

```text
/api/resume
```

### Job Matcher

```text
/api/job
```

### Contact

```text
/api/contact
```

### Admin

```text
/api/admin
```

### Page Content

```text
/api/pages
```

---

## 🎯 Key Highlights

* AI-powered recruiter assistant
* Dynamic portfolio management
* Resume ATS analysis
* AI job matching system
* GitHub analytics integration
* MERN stack architecture
* Responsive modern UI
* Production-ready deployment

---

## 📈 Future Enhancements

* Voice-enabled AI assistant
* Interview simulator
* AI coding mentor
* Portfolio analytics dashboard
* Project recommendation engine
* Multi-language support

---

## 👨‍💻 Author

### Vardan Singhal

Frontend Developer | MERN Stack Developer | AI Enthusiast

Building modern web applications with React, Node.js, MongoDB, Express, and AI technologies.

GitHub: [Add GitHub Link]

LinkedIn: [Add LinkedIn Link]

Portfolio: [Add Portfolio URL]

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

It helps others discover the project and supports future development.
