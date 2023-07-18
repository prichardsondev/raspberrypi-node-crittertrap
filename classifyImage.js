const cocossd = require("@tensorflow-models/coco-ssd");

const classifyImage = async (image) => {
    let model = await cocossd.load();
    //const image = await readImage(path);
    const predictions = await model.detect(image);
    image.dispose();
    return predictions;
    //console.log('Classification Results:', predictions);
};
exports.classifyImage = classifyImage;
