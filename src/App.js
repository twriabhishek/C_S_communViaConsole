import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage) {
      socket.emit('chat message', inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="App">
      <h1>Socket.IO Chat</h1>
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;