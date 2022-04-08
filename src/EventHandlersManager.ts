import {BaseEvent} from "./BaseEvent";
import {EventDispatcher, EventHandlerCallback} from "./EventDispatcher";
import {Constructor} from "./Constructor";

export class EventHandlersManager {

    private _handlers: EventHandlerEntry[] = [];

    addEventHandler<TEvent extends BaseEvent>(dispatcher: EventDispatcher,
                                         eventClass: Constructor<TEvent>,
                                         handler: (event: TEvent) => void,
                                         context?: any): void {
        this._handlers.push(new EventHandlerEntry(dispatcher, eventClass, handler as EventHandlerCallback, context));
    }

    removeEventHandler<TEvent extends BaseEvent>(dispatcher: EventDispatcher,
                                            eventClass: Constructor<TEvent>,
                                            handler: (event: TEvent) => void,
                                            context?: any): void {
        const index: number = this._handlers.findIndex(h => h.equal(dispatcher, eventClass, handler as EventHandlerCallback, context));
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

    constructor(readonly dispatcher: EventDispatcher,
                readonly eventClass: Constructor<BaseEvent>,
                readonly handler: EventHandlerCallback,
                readonly context:any) {

        this.dispatcher.addEventHandler(this.eventClass, handler, this.context);
    }

    remove(): void {
        this.dispatcher.removeEventHandler(this.eventClass, this.handler, this.context);
    }

    equal(dispatcher: EventDispatcher, eventClass: Constructor<BaseEvent>, handler: EventHandlerCallback, context: any): boolean {
        return this.dispatcher === dispatcher
            && this.eventClass === eventClass
            && this.handler === handler
            && this.context === context
    }
}