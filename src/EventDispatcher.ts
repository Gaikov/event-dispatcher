import {BaseEvent} from "./BaseEvent";
import {Constructor} from "./Constructor";

export type EventHandlerCallback = (event: BaseEvent) => void

export class EventHandlerInfo {

    constructor(
        readonly handler: EventHandlerCallback,
        readonly context: any) {
    }

    apply(event: BaseEvent): void {
        if (this.context) {
            this.handler.call(this.context, event);
        } else {
            this.handler(event);
        }
    }

    equal(hander: EventHandlerCallback, context?: any): boolean {
        return this.handler === hander && this.context === context;
    }
}

export class EventDispatcher {

    protected _handlers = new Map<Constructor<BaseEvent>, EventHandlerInfo[]>();

    dispatchEvent<TEvent extends BaseEvent>(event: TEvent): void {
        const ctr: Constructor<TEvent> = event.constructor as Constructor<TEvent>;
        const handlersList = this.getEventHandlers(ctr).concat();
        for (const info of handlersList) {
            if (event.cloneable) {
                info.apply(event.clone() as TEvent);
            } else {
                info.apply(event);
            }
        }
    }

    addEventHandler<TEvent extends BaseEvent>(event: Constructor<TEvent>, handler: (event: TEvent) => void, context?: any): void {
        if (!handler) {
            throw new Error("handler must be specified!");
        }
        this.getEventHandlers(event).push(new EventHandlerInfo(handler as EventHandlerCallback, context));
    }

    removeEventHandler<TEvent extends BaseEvent>(event: Constructor<TEvent>, handler: (event: TEvent) => void, context?: any): void {
        const handlers = this.getEventHandlers(event);
        let index = handlers.findIndex(info => info.equal(handler as EventHandlerCallback, context));
        while (index >= 0) {
            handlers.splice(index, 1);
            index = handlers.findIndex(info => info.equal(handler as EventHandlerCallback, context));
        }
    }

    removeAllHandlers(): void {
        this._handlers.clear();
    }

    getEventHandlers<TEvent extends BaseEvent>(event: Constructor<TEvent>): EventHandlerInfo[] {
        if (!this._handlers.has(event)) {
            this._handlers.set(event, []);
        }
        return this._handlers.get(event);
    }
}























