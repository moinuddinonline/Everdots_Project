// Toggle the navbar for mobile view
document.getElementById('menu-icon').addEventListener('click', function() {
    const navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('active');
  });
  
  // Scroll Animation: Add "in-view" class when the map section is in the viewport
  document.addEventListener('DOMContentLoaded', function () {
    const googleMapSection = document.getElementById('google-map-section');
    
    const onScroll = () => {
      const rect = googleMapSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        googleMapSection.classList.add('in-view');
      } else {
        googleMapSection.classList.remove('in-view');
      }
    };
    
    window.addEventListener('scroll', onScroll);
    onScroll();  // Trigger it on page load as well
  });
  
  
// Toggle the visibility of the chatbot
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '' ? 'block' : 'none';
  }
  
  // Display message in the chat window
  function displayMessage(message, sender) {
    const chatBox = document.getElementById('chatbox');
  
    // Create a div for the message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    
    if (sender === 'user') {
      messageDiv.classList.add('user-message');
    } else {
      messageDiv.classList.add('bot-message');
    }
    messageDiv.textContent = message;
  
    // Append the message to the chatbox
    chatBox.appendChild(messageDiv);
  
    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // Basic AI logic (this can be connected to an actual backend for ChatGPT)
  function getBotResponse(userMessage) {
    let response = '';
    
    // Simple AI response logic
    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      response = 'Hello! How can I assist you today?';
    } else if (userMessage.includes('your name')) {
      response = 'I am your assistant!';
    } else if (userMessage.includes('how are you')) {
      response = "I'm doing great, thanks for asking!";
    } else if (userMessage.includes('bye')) {
      response = 'Goodbye! Have a great day!';
    } else {
      response = 'Sorry, I didn’t understand that. Can you rephrase?';
    }
    
    return response;
  }
  
  // Send the user message and get a bot response
  function sendMessage() {
    const userInput = document.getElementById('user-input').value;
  
    // Only proceed if the user typed something
    if (userInput.trim() !== '') {
      // Display the user's message
      displayMessage(userInput, 'user');
  
      // Get and display the bot's response
      const botResponse = getBotResponse(userInput.toLowerCase());
      displayMessage(botResponse, 'bot');
  
      // Clear the input field
      document.getElementById('user-input').value = '';
    }
  }
  
  // Event listener for "Enter" key press to send the message
  document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.AIzaSyD1U4ML7sh79fQ-Uu1n1eC22wGS76RREb4;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-1219",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();
  