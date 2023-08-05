const Gpio = require('onoff').Gpio;
const reed = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 });

let lastState;
let pause = false;

setInterval(async () => {
    let state = reed.readSync();

    if (!pause && lastState != state) {

        lastState = state;

        switch (state) {
            case 0:
                console.log('0');
                //do state 0 stuff
                break;
            case 1:
                console.log('1');
                //do state 1 stuff
                pause = true;
                process();
                break;
            default:
                break;
        }
    }

}, 100)

const process = async () => {
    try {
        await sendTextMessage('Caught something - good luck!');
    } catch (error) {
        console.log(error);
    } finally {
        pause = false;
    }
};

const sendTextMessage = async (message) => {
    const accountSid = '';
    const authToken = '';
    const client = require('twilio')(accountSid, authToken);

    await client.messages 
        .create({
            body: message,
            from: '',
            to: ''
        });
};


