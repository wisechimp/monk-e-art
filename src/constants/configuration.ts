import { Configuration, OpenAIApi } from "openai"

const config = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})
console.log(config.apiKey)
const openai = new OpenAIApi(config)

export default openai
