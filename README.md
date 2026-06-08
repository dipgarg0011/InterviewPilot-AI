# 🚀 InterviewPilot AI

AI-powered interview preparation platform that analyzes resumes and job descriptions to generate personalized interview reports, technical questions, behavioral questions, skill-gap analysis, and a structured preparation roadmap.

---

## 📌 Overview

InterviewPilot AI helps candidates prepare for interviews by leveraging Generative AI. Users can upload their resume, provide a job description, and receive a personalized interview preparation report tailored to their profile and target role.

The platform automatically identifies skill gaps, generates relevant interview questions, and creates a preparation plan to improve interview readiness.

---

## ✨ Features

### 🔐 Authentication

* JWT-based authentication
* Protected routes
* Secure user sessions

### 📄 Resume Analysis

* PDF resume upload
* Resume text extraction
* Candidate profile analysis

### 🤖 AI-Powered Interview Preparation

* Technical interview questions
* Behavioral interview questions
* Personalized answers and explanations
* Match score calculation

### 📊 Skill Gap Analysis

* Missing skills identification
* Severity-based skill categorization
* Improvement recommendations

### 🗺️ Preparation Roadmap

* Structured learning plan
* Day-wise preparation tasks
* Focused improvement strategy

### 📁 Interview History

* Save generated reports
* View previous reports
* Revisit preparation plans anytime

### 📥 PDF Export

* Download interview reports as PDF
* Share and review offline

---

## 🖥️ Screenshots

### Home Page

<img width="1025" height="707" alt="image" src="https://github.com/user-attachments/assets/1aced3c2-ce57-4c03-9d8a-dbfd5317d9fa" />


### Interview Report

<img width="1010" height="803" alt="image" src="https://github.com/user-attachments/assets/6d94e5ab-9a61-4f8c-aa28-6fce9997a576" />


### History Page

<img width="1012" height="531" alt="image" src="https://github.com/user-attachments/assets/84314577-0af9-49e0-9c59-abe0c9abc579" />


---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Context API
* SCSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### AI Integration

* Google Gemini API

### Additional Libraries

* PDFKit
* pdf-parse-fork

---

## 📂 Project Structure

```bash
Frontend/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   └── interview/
│   ├── App.jsx
│   └── main.jsx

Backend/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   └── config/
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/InterviewPilot-AI.git
cd InterviewPilot-AI
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_gemini_api_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
```

### Interview Reports

```http
POST /api/interview
GET  /api/interview
GET  /api/interview/:id
GET  /api/interview/download/:interviewReportId
```

---

## 🎯 Future Improvements

* AI Mock Interview Chatbot
* Voice-based Interview Simulation
* Company-specific Interview Preparation
* Interview Performance Analytics
* Email Report Delivery
* Dark/Light Theme Toggle
* Admin Dashboard

---

## 🌟 Key Highlights

* Full Stack MERN Application
* Resume Parsing & Analysis
* Generative AI Integration
* JWT Authentication
* PDF Report Generation
* Persistent Report History
* Responsive UI Design

---

## 👨‍💻 Author

**Dipanshu Garg**

* LinkedIn: https://linkedin.com/in/your-profile
* GitHub: https://github.com/dipgarg0011

---

## 📜 License

This project is licensed under the MIT License.
