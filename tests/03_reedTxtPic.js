const Gpio = require('onoff').Gpio;
const reed = new Gpio(17, 'in', 'rising', { debounceTimeout: 10 });
const libcamera = require('node-libcamera');
const cloudinary = require('cloudinary');

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
        let {url} = await uploadToCloudinary(config.output);
        await sendTextMessage("Go get it...", url);
    } catch (error) {
        console.log(error);
    } finally {
        pause = false;
    }
};

const takePic = (async (_) => {
    try {
        const timestamp = new Date().toISOString();
        let output = `../public/images/${timestamp}.jpg`;
        const config = {
            output,
            timeout: 1000,
            width: 640,
            height: 480,
            nopreview: true,
        };

        await libcamera.still(config);
        return config;
    } catch (error) { return error }

});

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});

const uploadToCloudinary = async (image) => {
    let result = await cloudinary.v2.uploader.upload(image,
        { public_id: "test" });

    return result;
};

const sendTextMessage = async (message, url) => {

    const accountSid = '';
    const authToken = '';
    const client = require('twilio')(accountSid, authToken);

    await client.messages 
        .create({
            body: message,
            from: '',
            mediaUrl: [url],
            to: ''
        });
};