import React from 'react';
import { Code } from 'lucide-react';

interface CodeInputProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, onChange }) => {
  return (
    <div className="bg-slate-800 rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="text-sm font-medium">Code Input</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onChange('')}
            className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={() => onChange(exampleCode)}
            className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition-colors"
          >
            Load Example
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 text-slate-100 font-mono text-sm p-4 h-80 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none"
        placeholder="Paste your HTML or JavaScript code here..."
      />
    </div>
  );
};

const exampleCode = `// Example 1: SQL Injection Vulnerability
function searchUsers(userInput) {
  return db.query("SELECT * FROM users WHERE name LIKE '%" + userInput + "%'");
}

// Example 2: Cross-Site Scripting (XSS)
function displayMessage(message) {
  document.getElementById('output').innerHTML = message;
}

// Example 3: Insecure Authentication
function login(username, password) {
  // Sending password in plain text
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

// Example 4: Insecure Direct Object Reference
function getUserData(userId) {
  return fetch('/api/users/' + userId);
}

// Example 5: Sensitive Data Exposure
localStorage.setItem('token', userAuthToken);
localStorage.setItem('password', userPassword);

// Example 6: Security Misconfiguration
app.use(cors({
  origin: '*'
}));

// Example 7: Broken Access Control
function getAdminData() {
  // No role checking before accessing admin data
  return fetch('/api/admin/data');
}

// Example 8: Insecure Deserialization
const userData = eval('(' + receivedData + ')');

// Example 9: Using Components with Known Vulnerabilities
const md5Password = md5(userPassword);

// Example 10: Insufficient Logging
function deleteUser(userId) {
  db.query('DELETE FROM users WHERE id = ' + userId);
  // No logging of critical operation
}`;