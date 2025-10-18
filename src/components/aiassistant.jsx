// src/components/aiassistant.jsx
import React, { useState, useEffect, useRef } from 'react';
import './aiassistant.css';

// --- START: NEW "HIGH-LEVEL BRAIN" V2 ---

const responses = {
  greeting: [
    "Hello! I'm Chetanya's AI assistant. You can ask me about his education, skills, projects, or professional experience.",
  ],
  summary: [
    "Chetanya is a results-driven Software Developer currently pursuing his Master's in Computer Science at Syracuse University. He has hands-on experience in full-stack development with the MERN stack, cloud systems using AWS, and multiple AI/ML projects.",
  ],
  education: [
    "Chetanya is currently pursuing a Master of Science in Computer Science at Syracuse University, with an expected graduation in May 2026. He also holds a Bachelor of Technology in Artificial Intelligence and Data Science from Savitribai Phule Pune University.",
  ],
  skills_overview: [
    "He's proficient in languages like JavaScript & Python, frameworks like React & Next.js, backend tech like Node.js & REST APIs, and AWS cloud services. Do you want to know about a specific technology?",
  ],
  specific_skill: {
    react: "Chetanya has strong experience with React.js. He used it at Main 10 to build a full-stack web app that reduced data retrieval time by 25%, and at Hum Aspen to improve a wellness app's UI, increasing user engagement by 35%. His own portfolio is also built with React!",
    aws: "He has experience with several AWS services. At his Main 10 internship, he used AWS S3 for scalable storage, AWS Lambda to automate workflows, and AWS RDS for a PostgreSQL database.",
    python: "Python is one of his primary languages. He used it with Flask for his award-winning hackathon project and with machine learning libraries like BERT for his Tweet AI detection project.",
    mongodb: "He has practical experience with MongoDB. He used it as the primary database for a full-stack MERN application at his Main 10 internship and also optimized a MongoDB database at Hum Aspen, reducing query execution times by 30%.",
    ai_ml: "Chetanya has a strong background in AI and Machine Learning. His projects include a deep learning model for Voice Forgery Detection with 95% accuracy, and a BERT-based classifier for detecting AI-generated text with 96.81% accuracy. He is also the Project Lead for the AI Club at Syracuse University.",
  },
  experience_overview: [
    "Chetanya has completed two software development internships: one at 'Main 10' and another at 'Hum Aspen'. Which one would you like to know more about?",
  ],
  main10_experience: [
    "At Main 10, he was a Software Developer Intern where he engineered a full-stack web application using React.js and MongoDB. His work reduced data retrieval time by 25% and he deployed several AWS services to enhance real-time alerting and system resilience.",
  ],
  humaspen_experience: [
    "During his internship at Hum Aspen Wellness, he worked on the 'Now Zone Life' wellness app. He improved the UI with React.js, leading to a 35% increase in user engagement, and optimized their MongoDB database, which improved data accuracy by 50%.",
  ],
  projects_overview: [
    "He has worked on several impressive projects. You can ask me about the 'grading system', 'tweet detection', or 'voice cloning' projects. Which one interests you?",
  ],
  hackathon_project: [
    "At the EECS Hackathon at Syracuse University, Chetanya's team won first prize for their automated grading system. The system uses Natural Language Processing (NLP) to reduce manual grading time by 60% and was built with Flask and Python.",
  ],
  voice_cloning_project: [
    "He developed a deep learning model for voice cloning and forgery detection that achieved 95% accuracy. It integrated advanced techniques like Wave GAN and Spec GAN, boosting detection precision by 20%. This work was also published in an IEEE paper.",
  ],
  tweet_detection_project: [
    "Chetanya built a project to detect AI-generated text in tweets. He deployed a BERT-based classifier that could distinguish AI from human-written text with 96.81% accuracy by using advanced fine-tuning techniques.",
  ],
  contact: [
    "You can reach Chetanya via email at rathi.chetanya@gmail.com or by phone at (315) 278-3090. His GitHub and LinkedIn profiles are also linked on the portfolio.",
  ],
  default: [
    "That's a great question! I can answer specifics about his internships at 'Main 10' or 'Hum Aspen', his projects like the 'grading system' or 'voice cloning', or his experience with technologies like 'React' or 'AWS'.",
  ],
};

// This new rule-based system checks for keywords in a specific order of priority.
const rules = [
  // Specific projects and companies first
  { category: 'main10_experience', keywords: ['main 10', 'maintenance'] },
  { category: 'humaspen_experience', keywords: ['hum aspen', 'wellness'] },
  { category: 'hackathon_project', keywords: ['hackathon', 'grading', 'award-winning', 'automated system'] },
  { category: 'voice_cloning_project', keywords: ['voice', 'cloning', 'forgery', 'gan', 'ieee'] },
  { category: 'tweet_detection_project', keywords: ['tweet', 'bert', 'generated text'] },
  // Specific skills
  { category: 'react', keywords: ['react', 'react.js', 'reactjs'] },
  { category: 'aws', keywords: ['aws', 'cloud', 'lambda', 's3', 'rds'] },
  { category: 'python', keywords: ['python'] },
  { category: 'mongodb', keywords: ['mongo', 'mongodb', 'nosql'] },
  { category: 'ai_ml', keywords: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'deep learning', 'nlp'] },
  // Broader categories
  { category: 'experience_overview', keywords: ['experience', 'work', 'job', 'intern', 'internship', 'professional'] },
  { category: 'skills_overview', keywords: ['skill', 'tech', 'language', 'proficient', 'framework'] },
  { category: 'projects_overview', keywords: ['project'] },
  { category: 'education', keywords: ['education', 'college', 'university', 'degree', 'gpa', 'syracuse', 'studying', 'study', 'major', 'pursuing', 'academics'] },
  { category: 'summary', keywords: ['about', 'summary', 'tell me about him', 'who is he', 'himself'] },
  { category: 'contact', keywords: ['contact', 'email', 'phone', 'reach out'] },
  { category: 'greeting', keywords: ['hello', 'hi', 'hey', 'greetings'] },
];

const getResponse = (message) => {
  const msg = message.toLowerCase();

  // Iterate through the priority-ordered rules
  for (const rule of rules) {
    if (rule.keywords.some(keyword => msg.includes(keyword))) {
      // Check if it's a specific skill with its own response object
      if (responses.specific_skill[rule.category]) {
        return responses.specific_skill[rule.category];
      }
      return responses[rule.category][Math.floor(Math.random() * responses[rule.category].length)];
    }
  }

  // If no rule matches, return a default response
  return responses.default[Math.floor(Math.random() * responses.default.length)];
};

// --- END: UPGRADED KNOWLEDGE BASE AND LOGIC ---


const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Chetanya's AI assistant. Ask me anything about his experience, projects, or skills!", sender: 'ai' }
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const currentUserInput = userInput;
    setMessages(prev => [...prev, { text: currentUserInput, sender: 'user' }]);
    setUserInput('');

    setTimeout(() => {
      const botResponse = getResponse(currentUserInput);
      setMessages(prev => [...prev, { text: botResponse, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <>
      <div className={`ai-chat-window ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <h3>AI Assistant</h3>
          <button onClick={() => setIsOpen(false)} className="close-btn">&times;</button>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-footer">
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
      <button className="chat-toggle-button" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-solid fa-robot"></i>
      </button>
    </>
  );
};

export default AIAssistant;