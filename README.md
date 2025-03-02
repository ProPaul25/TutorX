# TutorX 🚀


**Transform your study material's text into summaries and quizzes with AI!**

The **AI Study Assistant** is a web application that uses AI to generate concise summaries and interactive quizzes from any text input. It’s designed to help students, educators, and lifelong learners quickly understand and test their knowledge on any topic.


---

## Features ✨

- **AI-Powered Summarization**: Generate concise summaries from any text.
- **Interactive Quizzes**: Create customizable quizzes with multiple-choice questions.
- **User-Friendly Interface**: Clean and intuitive design for seamless interaction.
- **Customizable Quiz Length**: Choose the number of questions (1–10).
- **Instant Feedback**: Get results with correct/incorrect answers highlighted.
- **Responsive Design**: Works on desktop, tablet, and mobile devices.

---

## How It Works 🛠️

1. **Paste Your Text**: Input any study material, article, or notes.
2. **Generate Summary**: Get a concise text summary.
3. **Create Quiz**: Specify the number of questions and generate a quiz.
4. **Take the Quiz**: Select answers and submit them to see your score.
5. **Learn & Improve**: Review correct answers and retry the quiz.

---

## Tech Stack 💻

- **Frontend**: React.js, Tailwind CSS (via custom CSS)
- **Backend**: Python (Flask)
- **AI Model**: Google Gemini API
- **Hosting**: (Optional: Vercel for frontend, Render/Heroku for backend)

---

## Installation 🛠️

### Prerequisites
- Node.js (for frontend)
- Python 3.x (for backend)
- Google Gemini API key

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ai-study-assistant.git
   cd ai-study-assistant
2. **Set Up Backend:**
     ```bash
    cd backend
    pip install -r requirements.txt
3. **Create a .env file and add your Gemini API key:**
      ```env
      GEMINI_API_KEY=your_api_key_here
4. **Start the Flask server:**
    ```bash
    python app.py
5. **Set Up Frontend:**
   ```bash
   cd ../frontend
    npm install
    npm start
6. **Open the App:**
    Visit http://localhost:3000 in your browser.
---
### Contributing 🤝
Contributions are welcome! Here’s how you can help:

- Fork the repository.
- Create a new branch (git checkout -b feature/AmazingFeature).
- Commit your changes (git commit -m 'Add some AmazingFeature').
- Push to the branch (git push origin feature/AmazingFeature).
- Open a pull request.

---
### Acknowledgments 🙏
- React and Flask communities for their amazing tools and libraries.
- Google Gemini for providing the API.
  
### NOTE

- If you find the code is giving a model error then please change the model endpoint of GEMINI. To see the list of Gemini endpoints please visit: **https://ai.google.dev/gemini-api/docs/models/gemini**
    

---
Made with ❤️ by Invisipaul





   



