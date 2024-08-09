import EventEmitter from "eventemitter3";
import { ErrorTypes } from "./error";

export namespace Events {
    export type EventType = "price" | "subscribe-status" | "subscribe-failed";

    export interface Event {
        event: EventType;
    }

    export interface DataFeedEvent extends Event {
        event: "price";
        p: String;
        feedID: String;
        t: Number;
    }

    function isDataFeedEvent(event: any): event is DataFeedEvent {
        return (
            event &&
            event.event === "price" &&
            typeof event.p === "string" &&
            typeof event.feedID === "string" &&
            typeof event.t === "number"
        );
    }

    type FeedList = {
        feedID: String;
        type: String;
    };

    function isFeedList(feed: any): feed is FeedList {
        return (
            feed &&
            typeof feed.feedID === "string" &&
            typeof feed.type === "string"
        );
    }

    export interface InfoEvent extends Event {
        event: "subscribe-status" | "subscribe-failed";
        success: FeedList[] | null;
        error: FeedList[] | null;
    }

    function isInfoEvent(event: any): event is InfoEvent {
        return (
            event &&
            (event.event === "subscribe-status" ||
                event.event === "subscribe-failed") &&
            (event.success === null || Array.isArray(event.success)) &&
            (event.error === null || Array.isArray(event.error))
        );
    }

    export const sendEvent = (
        raw_data: String | ArrayBuffer | Blob,
        emitter: EventEmitter<WSEvents.WsEventMap>
    ) => {
        const data = JSON.parse(raw_data.toString());

        if (isDataFeedEvent(data)) {
            emitter.emit("data", data);
        } else if (isInfoEvent(data)) {
            if (data.event === "subscribe-status") {
                emitter.emit("info", data);
            } else {
                throw new ErrorTypes.SubscribeFailed(
                    "Subscribe failed either due to connection issues or incorrect Data FeedIDs"
                );
            }
        } else {
            throw new ErrorTypes.InvalidEvent(
                "Invalid event type received from Relayer"
            );
        }
    };
}

export namespace WSEvents {
    export type WsEventMap = {
        data: [Events.DataFeedEvent];
        info: [Events.InfoEvent];
        open: [];
        close: [];
    };
}
