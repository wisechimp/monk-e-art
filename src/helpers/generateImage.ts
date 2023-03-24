import openai from "../constants/configuration"

const generateImage = async (prompt: string) => {
  console.log("Monkey Prompt: " + prompt)
  try {
    const response = await openai(
      process.env.REACT_APP_OPENAI_API_KEY!
    ).createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    })
    console.log(response.data.data[0].url)
    return response.data.data[0].url
  } catch (error: any) {
    return console.log(JSON.stringify(error))
  }
}

export default generateImage
