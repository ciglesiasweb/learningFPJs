// helper function
//
// For production use, consider what to do about
// deep copies and own keys
const shallowCopy = (source) => {
    const dest = {};
    for (let key in source) {
        dest[key] = source[key]
    }
    return dest
};
const Stack = () => {
    const array = [];
    let index = -1;
    return {
        push(value) {
            array[index += 1] = value
        },
        pop() {
            let value = array[index];
            if (index >= 0) {
                index -= 1
            }
            return value
        },
        isEmpty() {
            return index < 0
        }
    }
}
const Model = function (initialAttributes) {
    const redoStack = Stack();
    let attributes = shallowCopy(initialAttributes || {});
    const undoStack = Stack(),
        obj = {
            set: (attrsToSet) => {
                undoStack.push(shallowCopy(attributes));
                if (!redoStack.isEmpty()) {
                    redoStack.length = 0;
                }
                for (let key in (attrsToSet || {})) {
                    attributes[key] = attrsToSet[key]
                }
                return obj
            },
            undo: () => {
                if (!undoStack.isEmpty()) {
                    redoStack.push(shallowCopy(attributes));
                    attributes = undoStack.pop()
                }
                return obj
            },
            redo: () => {
                if (!redoStack.isEmpty()) {
                    undoStack.push(shallowCopy(attributes));
                    attributes = redoStack.pop()
                }
                return obj
            },
            get: (key) => attributes[key],
            has: (key) => attributes.hasOwnProperty(key),
            attributes: () => shallowCopy(attributes)
        };

    return obj
};
const model = Model();
model.set({
    "Doctor": "de Grasse"
});
model.set({
    "Doctor": "Who"
});
model.undo()
var a = model.get("Doctor")

console.log(a) //"de Grasse"