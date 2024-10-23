import {
  createOperatorSubscriber,
  operate
} from "./chunk-4AFP3NYP.js";

// node_modules/rxjs/dist/esm5/internal/operators/map.js
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}

export {
  map
};
//# sourceMappingURL=chunk-WZYPOMXT.js.map
