# advanced-event-dispatcher
Object based/oriented event dispatcher/emitter for use with TypeScript or JS. It Uses class type on an event as an event target to add event listeners. 

The module uses modern browser API and if you want to launch you code in the old browsers, probably you need to add polyfills for Map class.

###Install
```text
npm i advanced-event-dispatcher
```

###Import
```TypeScript
//es5
const {BaseEvent, EventDispatcher} = require("advanced-event-dispatcher");
//es6+ and ts
import {BaseEvent, EventDispatcher} from "advanced-event-dispatcher";
```

###Define an event
```TypeScript
//Declare an event
class Event extends BaseEvent {
    constructor(readonly message: string = "none") {
        super();
    }
}
```

###Create instance of event dispatcher
```TypeScript
const dispatcher = new EventDispatcher();
```

###Add event handler
```TypeScript
const handler = (e:Event) => console.log(e.message);

dispatcher.addEventHandler(Event, handler);
```

###Dispatching events
```TypeScript
dispatcher.dispatchEvent(new Event("Hello from advanced-event-dispatcher!"));
```

###Remove event handler
```TypeScript
dispatcher.removeEventHandler(Event, handler);
dispatcher.dispatchEvent(new Event("This event will not be handled"));
```

###EventBus example
```TypeScript
class EventBus extends EventDispatcher {
    static instance = new EventBus();
}

class Observer {
    constructor() {
        EventBus.instance.addEventHandler(Event, this.onEvent, this);
    }

    onEvent(e:Event) {
        console.log(this.constructor.name, ":", e.message);
    }
}

const c = new Observer();
EventBus.instance.dispatchEvent(new Event("Hello from EventBus!"));
```

###Additional examples
See full examples code, including JavaScript, [here](https://github.com/Gaikov/advanced-event-dispatcher-exmples)

