const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
    renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
    const html = data.map((item) => `<p>Timestamp:${item.timestamp}, Message:${item.message}, Author:${item.author}</p>`).join(" ");
    document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
    evt.preventDefault();
    const message = document.getElementById("message").value;
    const author = document.getElementById("author").value;
    const timestamp = new Date().getTime();
    ws.send(JSON.stringify({message, author, timestamp}));
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);