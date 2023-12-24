// Chatbox.js
import React, { useState } from "react";
import "./ChatBox.css";
import { CircleLoader } from "react-spinners";
import { BASE_URL } from "../../utils/config.js";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send user message to the backend
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/v1/users/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        // Handle error if needed
        console.error("Error sending user message:", response.status);
        return;
      }

      // Handle successful response if needed
      const result = await response.json();
      console.log("Bot response:", result.bot);

      // Add both user and bot messages to the messages state
      setMessages([
        ...messages,
        { type: "user", content: userInput },
        { type: "bot", content: result.bot },
      ]);
      // Clear the user input field
      setUserInput("");
    } catch (error) {
      console.error("Error sending user message:", error);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`chatbox ${!isVisible ? "hidden" : ""}`}>
      <div className="chatbox-header">
        <button className="chatbox-close-button" onClick={onClose}>
          X
        </button>
        <p className="Chatbot-title">Travel World AI</p>
      </div>
      <div className="chatbox-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        />
        {loading ? (
          <div className="loading-spinner" style={{ display: 'inline-block', marginLeft: '2px' }}>

            <CircleLoader
              color="#FAA936"
              size={20} // Adjust the size based on your preference
            />
          </div>
        ) : (
          <button type="submit" className="Chatbot-button">
            ->
          </button>
        )}
      </form>
    </div>
  );
};

export default Chatbox;
