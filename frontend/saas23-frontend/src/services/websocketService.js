class WebSocketService {
    constructor() {
        this.socket = null;
        this.messageHandlers = {};
    }

    connect() {
        this.socket = new WebSocket("ws://localhost:8090");
        this.socket.onopen = () => {
            console.log("WebSocket connection established");
        };
        this.socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
        this.socket.onmessage = ({ data }) => {
            this.handleMessage(data);
        };
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    handleMessage(message) {
        const parsedMessage = JSON.parse(message);
        const { type, payload } = parsedMessage;

        if (this.messageHandlers[type]) {
            this.messageHandlers[type](payload);
        }
    }

    registerMessageHandler(type, handler) {
        this.messageHandlers[type] = handler;
    }

    unregisterMessageHandler(type) {
        delete this.messageHandlers[type];
    }

    getSocket() {
        return this.socket;
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
