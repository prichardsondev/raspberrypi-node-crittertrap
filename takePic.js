const libcamera = require('node-libcamera');

const takePic = (async (_) => {
    try {
        const timestamp = new Date().toISOString();
        let output = `${__dirname}/public/images/${timestamp}.jpg`;

        const config = {
            output,
            timeout: 1000,
            width: 640,
            height: 480,
            nopreview: true,
        };

        await libcamera.still(config);
        return config;
    } catch (err) { console.log('takePic err', err); }

});
exports.takePic = takePic;
