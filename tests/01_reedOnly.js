
const Gpio = require('onoff').Gpio;
const reed = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 });


let lastState;
let pause = false;

setInterval(async () => {
    let state = reed.readSync();

    if (!pause && lastState != state) {

        lastState = state;
        
        if(state===0)
            console.log('0');
        else
            console.log('1');
    }

}, 100)


