import * as tf from '@tensorflow/tfjs';

class Recognizer {

  constructor(link_model, classes) {
    this.link_model = link_model;
    this.classes = classes;
    this.loadModel();
  }

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel(this.link_model);
      console.log('Modelo carregado com sucesso!');
    } catch (error) {
      alert('Erro ao carregar modelo');
    }
  }

  async predict(imgElement) {

    const logits = tf.tidy(() => {
      // tf.browser.fromPixels() returns a Tensor from an image element.
      const img = tf.cast(tf.browser.fromPixels(imgElement), 'float32');

      const offset = tf.scalar(127.5);
      // Normalize the image from [0, 255] to [-1, 1].
      const normalized = img.sub(offset).div(offset);

      // Reshape to a single-element batch so we can pass it to predict.
      const batched = normalized.reshape([1, 299, 299, 3]);

      // Make a prediction through model.
      return this.model.predict(batched);
    });

    const classes = await this.getTopKClasses(logits, 1);

    return classes[0];
  }

  async getTopKClasses(logits, topK) {
    const values = await logits.data();

    const valuesAndIndices = [];
    for (let i = 0; i < values.length; i++) {
      valuesAndIndices.push({ value: values[i], index: i });
    }
    valuesAndIndices.sort((a, b) => {
      return b.value - a.value;
    });
    const topkValues = new Float32Array(topK);
    const topkIndices = new Int32Array(topK);
    for (let i = 0; i < topK; i++) {
      topkValues[i] = valuesAndIndices[i].value;
      topkIndices[i] = valuesAndIndices[i].index;
    }

    const topClassesAndProbs = [];
    for (let i = 0; i < topkIndices.length; i++) {
      topClassesAndProbs.push({
        label: this.classes[topkIndices[i]],
        score: topkValues[i]
      })
    }
    return topClassesAndProbs;
  }
}

export default Recognizer;