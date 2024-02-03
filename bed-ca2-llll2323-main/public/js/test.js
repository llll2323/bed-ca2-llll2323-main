// @ts-nocheck

const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

let messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'current-user' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

const updateMessages = () => {
  // Fetch new messages from the server (you need to implement the server-side logic)
  // This is a placeholder function, replace it with your actual server endpoint.
  fetch('/api/getMessages')
    .then(response => response.json())
    .then(newMessages => {
      // Add new messages to the existing messages
      messages = [...messages, ...newMessages];
      // Save updated messages to local storage
      localStorage.setItem('messages', JSON.stringify(messages));

      // Display new messages in the chat
      newMessages.forEach(message => {
        chatMessages.innerHTML += createChatMessageElement(message);
      });

      // Scroll to bottom of chat messages
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => {
      console.error('Error fetching messages:', error);
    });
};

window.onload = () => {
  messages.forEach(message => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });

  // Set an interval to periodically update messages (every 5 seconds in this example)
  setInterval(updateMessages, 5000);
};

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: 'current-user', // Hardcode the sender as 'current-user'
    text: chatInput.value,
    timestamp,
  };

  // Save message to local storage
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  // Add message to DOM
  chatMessages.innerHTML += createChatMessageElement(message);

  // Clear input field
  chatInputForm.reset();

  // Scroll to bottom of chat messages
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});
