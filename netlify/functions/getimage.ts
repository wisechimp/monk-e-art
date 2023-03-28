import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"
import { Configuration, OpenAIApi } from "openai"

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log("Event is: " + JSON.stringify(event))
  console.log("Giving some context: " + JSON.stringify(context))
  console.log("RawQuery: " + event.rawQuery)

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    })
  )

  const { prompt } = event.queryStringParameters!

  console.log("Prompt is: " + prompt)
  console.log("What's openai up to: " + JSON.stringify(openai))

  let imageUrl = ""
  try {
    console.log("This is trying")
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
