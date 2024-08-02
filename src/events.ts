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

    type SubscribeList = {
        feedID: String;
        type: String;
    };

    interface SubscribtionEvent extends Event {
        event: "subscribe-status" | "subscribe-failed";
        feedID: String;
        success: SubscribeList[];
        error: SubscribeList[];
    }

    export const sendEvent = (
        raw_data: String | ArrayBuffer | Blob
    ): DataFeedEvent | SubscribtionEvent | Event => {
        const data = JSON.parse(raw_data.toString());

        switch (data.event) {
            case "price":
                return data as DataFeedEvent;
            case "subscribe-status":
                return data as SubscribtionEvent;
            case "subscribe-failed":
                throw new ErrorTypes.SubscribeFailed(
                    "Subscribe failed either due to connection issues or incorrect Data FeedIDs"
                );
            default:
                throw new ErrorTypes.InvalidEvent(
                    "Invalid event type received from Relayer"
                );
        }
    };
}
