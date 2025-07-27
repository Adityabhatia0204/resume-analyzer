import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description.');
      return;
    }

try {
  setLoading(true);
  const formData = new FormData();
  formData.append('resume', resumeFile);

const uploadRes = await axios.post('http://localhost:5000/upload', formData);
const resumeText = uploadRes.data.resumeText;

const analyzeRes = await axios.post('http://localhost:5000/analyze', {
  resumeText,
  jobDescription,
});


      setResult(analyzeRes.data.response);
    } catch (err) {
      console.error(err);
      setResult('Sorry some error occurred while processing your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '4rem auto',
    padding: '2rem',
    borderRadius: '16px',
    backgroundColor: '#272757ff',
    boxShadow: '0 0 20px rgba(0,0,0,0.06)',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#ffffffff',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#ffffffff'
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: '0.5rem',
    display: 'block'
  };

  const inputStyle = {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '1.5rem',
    fontSize: '1rem'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#000000ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const resultStyle = {
    marginTop: '2rem',
    backgroundColor: '#000000ff',
    padding: '1.25rem',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    fontSize: '1rem',
    lineHeight: '1.6'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle} >QUESERA</h1>
      <h2 style={{ fontWeight: 600, color: '#ffffff7c', fontSize: '1.3rem', marginBottom: '2rem', fontWeight: 'bold'}}>
        Your Resume & Job Match Analyzer
      </h2>

      <label style={labelStyle}>Upload Your Resume (PDF):</label>
      <input type="file" accept=".pdf" onChange={handleResumeChange} style={inputStyle} />

      <label style={labelStyle}>Enter Job Description:</label>
      <textarea
        rows={6}
        style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
        placeholder="Paste or type the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <button style={buttonStyle} onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Good things take time, so wait' : 'Tell me, am I a good fit?'}
      </button>

      {result && <div style={resultStyle}>{result}</div>}
    </div>
  );
}

export default App;
