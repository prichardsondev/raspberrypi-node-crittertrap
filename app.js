
const Gpio = require('onoff').Gpio;
const reed = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 });
const tf = require('@tensorflow/tfjs');
const { takePic } = require('./takePic');
const { readImage } = require('./readImage');
const { classifyImage } = require('./classifyImage');
const { uploadToCloudinary } = require('./uploadToCloudinary');
const { sendTextMessage } = require('./sendTextMessage');

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
        let config = await takePic();
        let cloudinaryResult = await uploadToCloudinary(config.output);
        await sendTextMessage(cloudinaryResult.url);
        let image = await readImage(config.output);
        let prediction = await classifyImage(image);
        console.log(prediction);
        return prediction;
    } catch (error) {
        console.log(error);
    } finally {
        pause = false;
    }
};



