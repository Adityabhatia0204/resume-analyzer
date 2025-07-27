# Quesera – Resume & Job Match Analyzer

This is a minimal full-stack web application that helps users analyze how well their resume matches a job description.

## Features

- Upload resume (PDF)
- Paste or type job description
- AI-based matching using Ollama + Phi-3
- Match score, strength/gap analysis, improvement suggestions

## Stack

- Frontend: React.js
- Backend: Node.js + Express
- AI Model: Ollama + Phi-3 (local)
- Resume Parsing: pdf-parse

## How to Run Locally

1. Start backend:  
   cd backend-node  
   node server.js

2. Start frontend:  
   cd resume-frontend  
   npm start

3. Ensure Ollama is running:
   ollama serve

---

Made by Aditya Bhatia.
