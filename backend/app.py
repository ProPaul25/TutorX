import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

def parse_text(text):
    return text[:3000]

@app.route('/generate-summary', methods=['POST'])
def generate_summary():
    data = request.json
    text = parse_text(data.get('text'))
    
    response = model.generate_content(
        f"Summarize this concisely for a student:\n{text}"
    )
    return jsonify({"summary": response.text})

@app.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    text = parse_text(data.get('text'))
    num_questions = data.get('numQuestions', 3)  # Default to 3 if not provided
    
    prompt = f"""
    Generate {num_questions} multiple-choice questions with 4 options and answers from this text:
    {text}
    
    Format as JSON without any markdown formatting. Example:
    {{
        "questions": [
            {{
                "question": "...",
                "options": ["...", "...", "...", "..."],
                "answer": 0
            }}
        ]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        json_str = response.text.replace('```json', '').replace('```', '').strip()
        return jsonify(json.loads(json_str))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)