import openai from "../constants/configuration"

const generateImage = async (prompt: string) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  })
  console.log(response.data.data[0].url)
  return response
}

export default generateImage
