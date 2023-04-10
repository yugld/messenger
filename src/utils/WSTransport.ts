import { EventBus } from "./EventBus";

export enum WSTransportEvents {
    Connected = "connected",
    Error = "error",
    Message = "message",
    Close = "close",
    UserConnected = "user connected",
}

export default class WSTransport extends EventBus {
    private socket: WebSocket | null = null;
    private pingInterval: number = 0;

    constructor(private url: string) {
        super();
    }

    public send(data: unknown) {
        if (!this.socket) {
            throw new Error("Socket is not connected");
        }

        this.socket.send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        this.socket = new WebSocket(this.url);

        this.subscribe(this.socket);

        this.setupPing();

        return new Promise((resolve) => {
            this.on(WSTransportEvents.Connected, () => {
                resolve();
            });
        });
    }

    public close() {
        this.socket?.close();
    }

    private setupPing() {
        this.pingInterval = window.setInterval(() => {
            this.send({ type: "ping" });
        }, 5000);

        this.on(WSTransportEvents.Close, () => {
            clearInterval(this.pingInterval);

            this.pingInterval = 0;
        });
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener("open", () => {
            this.emit(WSTransportEvents.Connected);
        });
        socket.addEventListener("close", () => {
            this.emit(WSTransportEvents.Close);
        });

        socket.addEventListener("error", (e) => {
            this.emit(WSTransportEvents.Error, e);
        });

        socket.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);
                switch (data.type) {
                    case 'connected': {
                        this.emit(WSTransportEvents.Connected, data);
                        break;
                    }
                    case 'user connected': {
                        this.emit(WSTransportEvents.UserConnected, data);
                        break;
                    }
                    case 'pong': {
                        break;
                    }
                    case 'error': {
                        this.emit(WSTransportEvents.Error, data);
                        break;
                    }
                    default: {
                        this.emit(WSTransportEvents.Message, data);
                    }
                }
            } catch {}
        });
    }
}
