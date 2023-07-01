import WebSocket from "ws";

function establishWebSocketConnection(tokens: number) {
    const ws = new WebSocket("localhost:3000");

    console.log("hey");

    ws.on("open", () => {
        console.log("WebSocket connection established");

        ws.send(JSON.stringify(tokens));
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed");
    });
}

export default establishWebSocketConnection;
