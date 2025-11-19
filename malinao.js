const chatWindow = document.getElementById('chat-window');
const inputMsg = document.getElementById('input-msg');
const sendBtn = document.getElementById('send-btn');

// Generate natural replies without keywords
function generateReply(text) {
  const lower = text.toLowerCase();

  // If message includes a question mark
  if (lower.includes('?')) {
    return "That's an interesting question! Let me think about it.";
  }

  // If message is short
  if (text.length < 5) {
    return "Could you tell me a little more?";
  }

  // If message looks like a greeting
  if (["hello", "hi", "hey"].some(greet => lower.includes(greet))) {
    return "Hi there! How can I help you today?";
  }

  // Default reply
  return "I understand! Feel free to ask me anything else.";
}

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function sendMessage() {
  const userText = inputMsg.value.trim();
  if (!userText) return;

  appendMessage('user', userText);
  inputMsg.value = '';

  const botReply = generateReply(userText);
  appendMessage('bot', botReply);
}

sendBtn.addEventListener('click', sendMessage);

inputMsg.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});