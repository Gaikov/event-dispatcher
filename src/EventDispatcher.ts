import {BaseEvent} from "./BaseEvent";
import {Constructor} from "./Constructor";

export type EventHandlerCallback = (event: BaseEvent) => void

export class EventDispatcher {

    protected _handlers = new Map<Constructor<BaseEvent>, EventHandlerCallback[]>();

    dispatch<TEvent extends BaseEvent>(event: TEvent): void {
        const ctr: Constructor<TEvent> = event.constructor as Constructor<TEvent>;
        const handlersList = this.getEventHandlers(ctr).concat();
        for (const handler of handlersList) {
            if (event.cloneable) {
                handler(event.clone() as TEvent);
            } else {
                handler(event);
            }
        }
    }

    addEventHandler<TEvent extends BaseEvent>(event: Constructor<TEvent>, handler: (event: TEvent) => void): void {
        if (!handler) {
            throw new Error("handler must be specified!");
        }
        this.getEventHandlers(event).push(handler);
    }

    removeEventHandler<TEvent extends BaseEvent>(event: Constructor<TEvent>, handler: (event: TEvent) => void): void {
        const handlers = this.getEventHandlers(event);
        let index = handlers.indexOf(handler);
        while (index >= 0) {
            handlers.splice(index, 1);
            index = handlers.indexOf(handler);
        }
    }

    removeAllHandlers(): void {
        this._handlers.clear();
    }

    getEventHandlers<TEvent extends BaseEvent>(event: Constructor<TEvent>): Array<(event: TEvent) => void> {
        if (!this._handlers.has(event)) {
            this._handlers.set(event, []);
        }
        return this._handlers.get(event);
    }
}























