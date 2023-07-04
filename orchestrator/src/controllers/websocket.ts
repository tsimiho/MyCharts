import WebSocket from "ws";

function establishWebSocketConnection(tokens: string) {
    const ws = new WebSocket.Server({ port: 8080 });

    ws.on("connection", (socket) => {
        console.log("WebSocket connection established");

        socket.send(tokens);
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed");
    });
}

export default establishWebSocketConnection;
