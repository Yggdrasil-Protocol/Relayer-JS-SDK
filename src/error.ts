export namespace ErrorTypes {
    export class SubscribeFailed extends Error {
        constructor(message?: string) {
            super(message);
            this.name = "SubscribeFailed";

            Object.setPrototypeOf(this, SubscribeFailed.prototype);
        }
    }

    export class InvalidEvent extends Error {
        constructor(message?: string) {
            super(message);
            this.name = "InvalidEvent";

            Object.setPrototypeOf(this, InvalidEvent.prototype);
        }
    }
}
