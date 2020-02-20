import { KeyboardController, Keys } from "./KeyboardController";

const keyboardController = new KeyboardController();

test('keydownHandler should work ', () => {
    var event = new KeyboardEvent('keydown',{'keyCode':Keys.RIGHT});
    document.dispatchEvent(event);
    expect(keyboardController.rightPressed).toBeTruthy();
})

test('keyupHandler should work', () => {
    var event = new KeyboardEvent('keyup',{'keyCode':Keys.RIGHT});
    document.dispatchEvent(event);
    expect(keyboardController.rightPressed).toBeFalsy();
})

