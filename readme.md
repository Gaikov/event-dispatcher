![github CI](https://github.com/Gaikov/event-dispatcher/actions/workflows/node.js.yml/badge.svg)

# advanced-event-dispatcher
Object based/oriented event dispatcher/emitter for use with TypeScript or JS. 

It uses class type of event as an event target to add event handlers and an instance of the event will be passed to an event handler when it will be dispatched. 
So an event and its data contained in the same object instance.  

The module uses modern browser API and if you want to launch you code in the old browsers, probably you need to add polyfills for Map class.

### Install
```text
npm i advanced-event-dispatcher
```

### Import
```TypeScript
//es5
const {BaseEvent, EventDispatcher} = require("advanced-event-dispatcher");
//es6+ and ts
import {BaseEvent, EventDispatcher} from "advanced-event-dispatcher";
```

### Define an event
```TypeScript
//Declare an event
class Event extends BaseEvent {
    constructor(readonly message: string = "none") {
        super();
    }
}
```

### Create instance of event dispatcher
```TypeScript
const dispatcher = new EventDispatcher();
```

### Add event handler
```TypeScript
const handler = (e:Event) => console.log(e.message);

dispatcher.addEventHandler(Event, handler);
```

### Dispatching events
```TypeScript
dispatcher.dispatchEvent(new Event("Hello from advanced-event-dispatcher!"));
```

### Remove event handler
```TypeScript
dispatcher.removeEventHandler(Event, handler);
dispatcher.dispatchEvent(new Event("This event will not be handled"));
```

### EventBus example
```TypeScript
class EventBus extends EventDispatcher {
    static readonly instance = new EventBus();
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

### Additional examples
See full examples code, including JavaScript, [here](https://github.com/Gaikov/advanced-event-dispatcher-exmples)

