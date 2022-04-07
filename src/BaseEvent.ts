import {Constructor} from "./Constructor";

export class BaseEvent {

    readonly cloneable: boolean;

    constructor(cloneable: boolean = false) {
        this.cloneable = cloneable;
    }

    public clone(): BaseEvent {
        const ctr: Constructor<BaseEvent> = this.constructor as Constructor<BaseEvent>;
        return new ctr();
    }
}

