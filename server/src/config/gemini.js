const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('[GEMINI] GEMINI_API_KEY not set');
}

const genAI = new GoogleGenerativeAI(apiKey || 'missing');

const textModel = () =>
  genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  });

const embedModel = () =>
  genAI.getGenerativeModel({
    model: process.env.GEMINI_EMBED_MODEL || 'embedding-001',
  });

async function generate(prompt) {
  try {
    console.log('==============================');
    console.log('GEMINI GENERATE START');
    console.log(
      'Model:',
      process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    );

    const model = textModel();

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    console.log('GEMINI GENERATE SUCCESS');
    console.log('==============================');

    return text;
  } catch (error) {
    console.error('==============================');
    console.error('GEMINI GENERATE ERROR');
    console.error(error);
    console.error('Message:', error.message);
    console.error('==============================');

    throw error;
  }
}

async function generateJSON(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent(prompt);

    const txt = result.response.text();

    try {
      return JSON.parse(txt);
    } catch {
      return { raw: txt };
    }
  } catch (error) {
    console.error('GEMINI JSON ERROR');
    console.error(error);
    throw error;
  }
}

async function embed(text) {
  try {
    console.log('==============================');
    console.log('EMBED START');
    console.log(
      'Embedding Model:',
      process.env.GEMINI_EMBED_MODEL || 'embedding-001'
    );
    console.log('Text:', text);

    const model = embedModel();

    const response = await model.embedContent(text);

    console.log('EMBED RESPONSE RECEIVED');

    if (!response) {
      throw new Error('Embedding response is undefined');
    }

    console.log(
      'Response Keys:',
      Object.keys(response)
    );

    console.log(
      'Embedding Exists:',
      !!response.embedding
    );

    if (!response.embedding) {
      console.log('Full Response:', response);
      throw new Error('response.embedding is undefined');
    }

    console.log(
      'Values Exists:',
      !!response.embedding.values
    );

    if (!response.embedding.values) {
      console.log('Full Embedding:', response.embedding);
      throw new Error(
        'response.embedding.values is undefined'
      );
    }

    console.log(
      'Embedding Length:',
      response.embedding.values.length
    );

    console.log('EMBED SUCCESS');
    console.log('==============================');

    return response.embedding.values;
  } catch (error) {
    console.error('==============================');
    console.error('EMBED ERROR');
    console.error(error);
    console.error('Message:', error.message);
    console.error('Stack:', error.stack);
    console.error('==============================');

    throw error;
  }
}

module.exports = {
  genAI,
  generate,
  generateJSON,
  embed,
};