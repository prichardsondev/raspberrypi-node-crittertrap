const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

const readImage = async (path) => {
    console.log(path);
    const imageBuffer = fs.readFileSync(path);
    const tfimage = tfnode.node.decodeImage(imageBuffer);
    return tfimage;
};
exports.readImage = readImage;
