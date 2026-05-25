interviewai/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── contexts/
│ └── App.js
└── package.json

User's Browser
│
├── WebRTC/RecordRTC ──> Records video answer
│
├── Web Speech API ──> Transcribes voice → text
│
├── Web Speech API ──> Reads questions aloud
│
└── Calls your Backend API
│
└── Local Ollama (DeepSeek) ──> Generates questions & evaluates answers
