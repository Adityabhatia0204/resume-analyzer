# Quesera Resume Analyzer

An AI-powered full-stack web application that analyzes resumes against job descriptions using LLMs (Phi-3 via Ollama) and provides feedback including match score, strengths, weaknesses, and improvement suggestions.
Built using Node.js, React.js, Flask, and Ollama’s Phi-3 model. Ideal for job seekers, HR professionals, and career coaches.

# Project Structure

resume-analyzer/
resume-frontend/     # React frontend to upload resume & JD
backend-node/        # Node.js backend to parse and send data to LLM
main.py              # Flask-based chatbot for real-time interaction with Phi-3

# Features
Upload PDF resume
Paste or type a Job Description
Get:
Match Score (0–100%)
Key Strengths
Key Gaps
Suggestions to improve your resume
Integrated chatbot to interact with your resume/job description
Built with fast, modern tools


# Tech Stack

Frontend -> React.js + HTML/CSS 
Backend -> Node.js + Express + Ollama + Phi-3 + Axios, PDF-Parse, Flask (Chatbot) ,Git, VSCode

# How to Run Locally

# 1. Clone Repositories

git clone https://github.com/Adityabhatia0204/resume-analyzer.git
cd resume-analyzer


# 2. Setup Backend (Node.js)

cd backend-node
npm install
node server.js


Make sure port 5000 is free.


# 3. Setup Frontend (React)

cd ../resume-frontend
npm install
npm start

Runs on http://localhost:3000


# 4. Start Chatbot (Python + Flask)

cd ..
ollama run phi3
# In another terminal
python main.py


Flask should run on http://127.0.0.1:5001

---

# Workflow

1. Frontend → Sends resume (PDF) and job description to backend.
2. Backend → Parses PDF and sends prompt to local Phi-3 model (via Flask).
3. Chatbot (main.py) → Generates match analysis and returns to frontend.
4. Result is displayed beautifully on UI.


# Deployment

- Backend is deployed on Render: [https://quesera-backend.onrender.com](https://quesera-backend.onrender.com)
- Ollama model runs locally (no external API cost).
- Frontend can be deployed via Vercel, Netlify, or hosted manually.

# Use Cases

- Job Seekers improving their resumes
- HR teams screening candidates
- Career counselors giving AI-powered feedback

# GitHub Repositories

- Backend: https://github.com/Adityabhatia0204/quesera-backend
- Frontend: https://github.com/Adityabhatia0204/quesera-frontend
- Master Repo: https://github.com/Adityabhatia0204/resume-analyzer



# Created by Aditya Bhatia
Reach out: LinkedIn https://www.linkedin.com/in/aditya-bhatia-020404-/ 
Gmail-> adhibhatia0204@gmail.com
