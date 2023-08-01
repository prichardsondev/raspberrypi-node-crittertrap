const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');

const readImage = async (path) => {
    try {
        const imageBuffer = fs.readFileSync(path);
        const tfimage = tfnode.node.decodeImage(imageBuffer);
        return tfimage;
    } catch (error) {
        return error;
    }
};
exports.readImage = readImage;
