import WebSocket from "isomorphic-ws";
import EventEmitter from "eventemitter3";
import { Config } from "./config";
import { Events, WSEvents } from "./events";

export namespace WS {
    export class RelayerWS extends EventEmitter<WSEvents.WsEventMap> {
        private ws?: WebSocket;
        private url: URL;

        private pingInterval: number;
        private pingTimeout: number;

        private pingIntervalID?: NodeJS.Timeout;
        private pingTimoutID?: NodeJS.Timeout;

        constructor(feedIDs: String[]) {
            super();
            this.url = new URL(
                Config.ENDPOINT + "?feedIDs=" + feedIDs.join(","),
                Config.BASE_WS_URL
            );
            this.pingInterval = Config.PING_INTERVAL;
            this.pingTimeout = Config.PING_TIMEOUT;
        }

        public connect = (): void => {
            this.ws = new WebSocket(this.url.toString());

            this.ws.addEventListener("open", (e) => {
                console.log("Connection established");

                this.ping();
                this.pingIntervalID = setInterval(this.ping, this.pingInterval);
                this.emit("open");
            });

            this.ws.addEventListener("message", (event) => {
                if (typeof event.data !== "string") {
                    throw new Error("Received non-string message from Relayer");
                }

                if (event.data === "PONG") {
                    console.log("Received PONG");
                    clearTimeout(this.pingTimoutID as NodeJS.Timeout);
                    return;
                } else {
                    Events.sendEvent(event.data, this);
                }
            });

            this.ws.addEventListener("close", (e) => {
                clearInterval(this.pingIntervalID as NodeJS.Timeout);
                this.emit("close");
            });
        };

        private ping = (): void => {
            if (!this.ws) {
                throw new Error("Connection not established");
            }

            this.ws.send("PING");
            console.log("Sent PING");

            this.pingTimoutID = setTimeout(() => {
                this.ws?.close();
            }, this.pingTimeout);
        };

        public close = (): void => {
            this.ws?.close();
            clearInterval(this.pingIntervalID as NodeJS.Timeout);

            console.log("Connection closed");
        };
    }
}
