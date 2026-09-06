const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

const jarvis = document.querySelector(".jarvis");

const chatMessages = document.createElement("div");
chatMessages.className = "chat-messages";

jarvis.insertBefore(
    chatMessages,
    document.querySelector(".search-container")
);

let conversation = [];

function addMessage(message, sender) {
    const messageBubble = document.createElement("div");

    messageBubble.className = "message " + sender;
    messageBubble.textContent = message;

    chatMessages.appendChild(messageBubble);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    conversation.push({
        sender: sender,
        message: message
    });
}

function solveEquation(input) {
    let equation = input
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/=/g, "=");

    const match = equation.match(
        /^([+-]?\d*\.?\d*)x([+-]\d*\.?\d+)?=([+-]?\d*\.?\d+)$/
    );

    if (!match) {
        return null;
    }

    let a = match[1];

    if (a === "" || a === "+") {
        a = 1;
    } else if (a === "-") {
        a = -1;
    } else {
        a = Number(a);
    }

    let b = match[2] ? Number(match[2]) : 0;
    let c = Number(match[3]);

    const x = (c - b) / a;

    return "x = " + x;
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();

    const equationAnswer = solveEquation(message);

    if (equationAnswer !== null) {
        return "I've solved the equation. " + equationAnswer;
    }

    if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey")
    ) {
        return "Hello. I am JARVIS 1.1. How can I assist you?";
    }

    if (lowerMessage.includes("who are you")) {
        return "I am JARVIS 1.1, your personal assistant.";
    }

    if (lowerMessage.includes("how are you")) {
        return "All systems are operational. Thank you for asking.";
    }

    if (lowerMessage.includes("your name")) {
        return "My designation is JARVIS 1.1.";
    }

    if (lowerMessage.includes("thank")) {
        return "You're welcome.";
    }

    if (lowerMessage.includes("bye")) {
        return "Goodbye. I'll be here when you need me.";
    }

    return "I understand what you're saying. My full AI reasoning system isn't connected yet, but the conversation system is working.";
}

function sendMessage() {
    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");

    chatInput.value = "";

    setTimeout(function() {
        const response = generateResponse(message);

        addMessage(response, "jarvis");
    }, 500);
}

sendButton.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

console.log("JARVIS 1.1 online.");
app.get("/api/search", async (req, res) => {
  const response = await fetch(`YOUR_SEARCH_API_URL?q=${encodeURIComponent(req.query.q)}`, {
    headers: { Authorization: `Bearer ${process.env.SEARCH_API_KEY}` }
  });
  res.json(await response.json());
});
