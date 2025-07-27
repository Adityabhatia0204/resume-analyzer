const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

// Ensure 'uploads' directory exists (especially for Render)
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


const parseResume = require('./utils/parseResume');
const compareLogic = require('./utils/compareLogic');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Resume upload route
app.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.resume) {
      return res.status(400).send({ error: 'No resume uploaded' });
    }

    const resumeFile = req.files.resume;
    const uploadPath = path.join(__dirname, 'uploads', resumeFile.name);
    await resumeFile.mv(uploadPath);

    const resumeText = await parseResume(uploadPath);
    res.send({ resumeText });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Resume parsing failed' });
  }
});

// Analyze match score
app.post('/analyze', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).send({ error: 'Missing resume or job description' });
  }

  try {
    const feedback = await compareLogic(resumeText, jobDescription);
    res.send(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Comparison failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

