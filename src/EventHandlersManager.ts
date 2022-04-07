import {BaseEvent} from "./BaseEvent";
import {EventDispatcher, EventHandlerCallback} from "./EventDispatcher";
import {Constructor} from "./Constructor";

export class EventHandlersManager {

    private _handlers: EventHandlerEntry[] = [];

    addHandler<TEvent extends BaseEvent>(dispatcher: EventDispatcher,
                                         eventClass: Constructor<TEvent>,
                                         handler: (event: TEvent) => void): void {
        this._handlers.push(new EventHandlerEntry(dispatcher, eventClass, handler as EventHandlerCallback));
    }

    removeHandler<TEvent extends BaseEvent>(dispatcher: EventDispatcher,
                                            eventClass: Constructor<TEvent>,
                                            handler: (event: TEvent) => void): void {
        const index: number = this._handlers.findIndex(h => h.equal(dispatcher, eventClass, handler as EventHandlerCallback));
        if (index !== -1) {
            const listener: EventHandlerEntry = this._handlers.splice(index, 1)[0];
            listener.remove();
        }
    }

    reset(): void {
        for (const l of this._handlers) {
            l.remove();
        }
        this._handlers.length = 0;
    }

}


class EventHandlerEntry {
    dispatcher: EventDispatcher;
    eventClass: Constructor<BaseEvent>;
    handler: EventHandlerCallback;

    constructor(dispatcher: EventDispatcher, eventClass: Constructor<BaseEvent>, handler: EventHandlerCallback) {
        this.dispatcher = dispatcher;
        this.eventClass = eventClass;
        this.handler = handler;

        this.dispatcher.addEventHandler(this.eventClass, handler);
    }

    remove(): void {
        this.dispatcher.removeEventHandler(this.eventClass, this.handler);
    }

    equal(dispatcher: EventDispatcher, eventClass: Constructor<BaseEvent>, handler: EventHandlerCallback): boolean {
        return this.dispatcher === dispatcher
            && this.eventClass === eventClass
            && this.handler === handler
    }
}