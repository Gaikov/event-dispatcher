import {BaseEvent} from "../src/BaseEvent";
import {EventDispatcher} from "../src/EventDispatcher";

export class TestEvent1 extends BaseEvent {
    constructor(public a: number) {
        super();
    }
}

export class TestEvent2 extends BaseEvent {
    constructor(public b: number) {
        super(true);
    }

    clone(): BaseEvent {
        return new TestEvent2(this.b);
    }
}

describe("EventDispatcher", () => {
    it("handlers", () => {
        const ed = new EventDispatcher();

        const handler = () => {
        };

        ed.addEventHandler(TestEvent1, handler);
        ed.addEventHandler(TestEvent1, handler);

        expect(ed.getEventHandlers(TestEvent1).length).toEqual(2);
        expect(ed.getEventHandlers(TestEvent2).length).toEqual(0);
        expect(ed.getEventHandlers(TestEvent1)[0]).toEqual(handler);

        ed.removeEventHandler(TestEvent1, handler);
        expect(ed.getEventHandlers(TestEvent1).length).toEqual(0);
    });

    it("dispatch", () => {
        const ed = new EventDispatcher();
        let value: number = 0;

        ed.addEventHandler(TestEvent1, event => {
            value += event.a
        });
        ed.addEventHandler(TestEvent2, event => {
            value += event.b
        });

        ed.dispatch(new TestEvent1(1));
        expect(value).toEqual(1);

        ed.dispatch(new TestEvent2(2));
        expect(value).toEqual(3);
    });

    it("remove handler", () => {
        const ed = new EventDispatcher();
        let value: number = 0;

        const handler = () => {
            value++;
        };

        const handler2 = () => {
            value++;
        };

        ed.addEventHandler(TestEvent1, handler2);
        ed.addEventHandler(TestEvent1, handler2);
        ed.addEventHandler(TestEvent1, () => {
            ed.removeEventHandler(TestEvent1, handler2);
        });
        ed.addEventHandler(TestEvent1, handler);
        ed.addEventHandler(TestEvent1, handler);

        ed.dispatch(new TestEvent1(0));

        expect(value).toEqual(4);
        expect(ed.getEventHandlers(TestEvent1).length).toEqual(3);

        ed.dispatch(new TestEvent1(0));
        expect(value).toEqual(6);
    });

    it("performance", () => {
        const ed = new EventDispatcher();
        let value: number = 0;

        const handler = () => {
            value++;
        };

        console.time("dispatcher");

        for (let i = 0; i < 10000; i++) {
            ed.addEventHandler(TestEvent1, handler);
        }

        ed.dispatch(new TestEvent1(0));

        ed.removeEventHandler(TestEvent1, handler);

        console.timeEnd("dispatcher");

        expect(ed.getEventHandlers(TestEvent1).length).toEqual(0);
        expect(value).toEqual(10000);
    })
});