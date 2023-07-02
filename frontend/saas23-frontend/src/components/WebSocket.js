const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => {
    console.log("WebSocket connection established");
};

socket.onclose = () => {
    console.log("WebSocket connection closed");
};

export default socket;
