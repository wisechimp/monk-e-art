import { Handler, HandlerEvent } from "@netlify/functions"
import { Configuration, OpenAIApi } from "openai"

const handler: Handler = async (event: HandlerEvent) => {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    })
  )

  const { prompt } = event.queryStringParameters!

  let imageUrl = ""
  try {
    console.log("This is trying. The prompt is: " + prompt)
    if (typeof prompt === "string") {
      const response = await openai.createImage({
        prompt: prompt!,
        n: 1,
        size: "1024x1024",
      })
      imageUrl = await JSON.stringify({ imageUrl: response.data.data[0].url })
      console.log(imageUrl)
    } else {
      return {
        statusCode: 404,
        body: `Error: There's been some issue with the prompt. We've ended up with: ${prompt}`,
      }
    }
    return {
      statusCode: 200,
      body: imageUrl,
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    }
  }
}

export { handler }
