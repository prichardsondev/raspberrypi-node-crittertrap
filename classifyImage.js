const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

async function loadModel(modelPath) {
  const model = await tf.loadLayersModel(`file://${modelPath}/model.json`);
  const metadata = await JSON.parse(fs.readFileSync(`${modelPath}/metadata.json`, 'utf8'));
  return { model, metadata };
}

async function loadImageAndResize(imagePath) {

  const buffer = fs.readFileSync(imagePath);
  const image = tf.node.decodeImage(buffer);

  const resized = tf.image.resizeBilinear(image, [224, 224]);

  return resized.expandDims();
}

async function classifyImage(imagePath) {
  let inputTensor;
  let normalizedInput;
  let predictions;
  try {
    const { model, metadata } = await loadModel('public/model');

    inputTensor = await loadImageAndResize(imagePath);

    normalizedInput = inputTensor.div(255);

    predictions = await model.predict(normalizedInput).dataSync();

    const { labels } = metadata;

    const predictionObject = {};

    for (let i = 0; i < labels.length; i++)
      predictionObject[labels[i]] = predictions[i];



    return predictionObject;

  } catch (error) {
    return error;
  }
  finally {
    tf.dispose(inputTensor);
    tf.dispose(predictions);
    tf.dispose(normalizedInput);
  }
}

exports.classifyImage = classifyImage;