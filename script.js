const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

const jarvis = document.querySelector(".jarvis");

const chatMessages = document.createElement("div");
chatMessages.className = "chat-messages";

jarvis.insertBefore(chatMessages, document.querySelector(".search-container"));

function sendMessage() {
    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user");

    chatInput.value = "";

    setTimeout(function() {
        addMessage("Hello. I am JARVIS 1.1. How can I assist you?", "jarvis");
    }, 600);
}

function addMessage(message, sender) {
    const messageBubble = document.createElement("div");

    messageBubble.className = "message " + sender;

    messageBubble.textContent = message;

    chatMessages.appendChild(messageBubble);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendButton.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

console.log("JARVIS 1.1 online.");
