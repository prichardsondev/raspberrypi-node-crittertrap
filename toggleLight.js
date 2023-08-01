const Gpio = require('onoff').Gpio;
const light = new Gpio(27, 'out');

let toggleLight = async (state) => {
    light.writeSync(state);
};
exports.toggleLight = toggleLight;
