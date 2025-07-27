import sys
import os

# ✅ Add this line to manually register the project root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

import importlib.util
import os

# Get the full path to utils/parser.py
parser_path = os.path.join(os.path.dirname(__file__), 'utils', 'parser.py')

# Load the module dynamically
spec = importlib.util.spec_from_file_location("parser", parser_path)
parser_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(parser_module)

# Extract the function
extract_text = parser_module.extract_text


from flask import Flask, render_template, request, jsonify
import requests
import json

# rest of your code...

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    resume_file = request.files['resume']
    jobdesc_file = request.files['jobdesc']

    resume_text = extract_text(resume_file)
    jd_text = extract_text(jobdesc_file)

    prompt = f"""
You are an expert HR assistant. Given the resume and the job description, evaluate whether the candidate is suitable. 
Give honest feedback and improvement suggestions if needed.

Resume:
{resume_text}

Job Description:
{jd_text}
"""

    response = query_ollama(prompt)
    return jsonify({'response': response})


def query_ollama(prompt, model="phi3"):
    url = "http://localhost:11434/api/generate"
    headers = {'Content-Type': 'application/json'}
    data = {
        "model": model,
        "prompt": prompt
    }

    response = requests.post(url, headers=headers, json=data, stream=True)
    response.raise_for_status()

    full_response = ""
    for line in response.iter_lines():
        if line:
            chunk = json.loads(line.decode('utf-8'))
            full_response += chunk.get('response', "")
            if chunk.get('done', False):
                break

    return full_response

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    print("Received prompt:", data) 
    prompt = data.get('prompt', '')
    answer = query_ollama(prompt)
    return jsonify({'response': answer})

if __name__ == '__main__':
    app.run(debug=True)
