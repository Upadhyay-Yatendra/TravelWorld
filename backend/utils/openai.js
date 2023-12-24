import dotenv from 'dotenv';
import OpenAI from 'openai';

// Configure dotenv to load environment variables from .env file
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
