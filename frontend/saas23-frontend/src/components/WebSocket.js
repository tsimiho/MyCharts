const socket = new WebSocket(`ws://192.168.1.227:8090`);

socket.onopen = () => {
    console.log("WebSocket connection established");
};

socket.onclose = () => {
    console.log("WebSocket connection closed");
};

export default socket;
