
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
    
    try {
        await toggleLight(1);

        let config = await takePic();

        let {url} = await uploadToCloudinary(config.output);
        
        let res = await classifyImage(config.output);
        console.log(res);
        //find class with highest confidence
        let atticPet = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b);

        //check confidence < 85% set atticPet to Other
        if(res[atticPet] < .85) atticPet='Other';

        await sendTextMessage(url, atticPet);
        
        console.log(`${res[atticPet]} % chance you caught ${atticPet}`);

    } catch (error) {
        console.log(error);
    } finally {
        pause = false;
        toggleLight(0);
    }
};


