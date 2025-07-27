const fs = require('fs');
const pdfParse = require('pdf-parse');

const parseResume = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);

  // Clean the text to reduce LLM errors
  let cleanedText = pdfData.text
    .replace(/\s+/g, ' ')
    .trim();

  return cleanedText;
};

module.exports = parseResume;
