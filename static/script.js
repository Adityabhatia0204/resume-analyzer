function sendPrompt() {
    const prompt = document.getElementById("promptInput").value.trim();
    const chatBox = document.getElementById("chatBox");
    console.log("Sending prompt...");


    if (!prompt) return;

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerText = prompt;
    chatBox.appendChild(userMsg);

    document.getElementById("promptInput").value = "";

    fetch("/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";
        botMsg.innerText = data.response;
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    // .catch(error => {
    //     const errorMsg = document.createElement("div");
    //     errorMsg.className = "chat-message bot error";
    //     errorMsg.innerText = "Error: " + error;
    //     chatBox.appendChild(errorMsg);
        .catch(error => {
    console.error("Fetch error:", error);  // <--- this
    const errorMsg = document.createElement("div");
    errorMsg.className = "chat-message bot error";
    errorMsg.innerText = "Error: " + error;
    chatBox.appendChild(errorMsg);
});
document.getElementById("uploadForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const formData = new FormData(this);

  const response = await fetch("/analyze", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  addMessage("bot", data.response); // addMessage is your function to display output
});
    chatBox.scrollTop = chatBox.scrollHeight;
    }
