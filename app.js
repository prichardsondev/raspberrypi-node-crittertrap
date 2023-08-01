
const Gpio = require('onoff').Gpio;
const reed = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 });

const { takePic } = require('./takePic');
const { classifyImage } = require('./classifyImage');
const { uploadToCloudinary } = require('./uploadToCloudinary');
const { sendTextMessage } = require('./sendTextMessage');
const { toggleLight } = require('./toggleLight');

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
    let config;
    try {
        await toggleLight(1);

        config = await takePic();

        let {url} = await uploadToCloudinary(config.output);
        
        let res = await classifyImage(config.output);
        
        //find class with highest confidence
        let atticPet = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b);

        await sendTextMessage(url, atticPet);
        
        console.log(atticPet);

    } catch (error) {
        console.log(error);
    } finally {
        pause = false;
        toggleLight(0);
    }
};


