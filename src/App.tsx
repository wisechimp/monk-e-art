import React, { useEffect, useState } from "react"

import generateImage from "./helpers/generateImage"
import "./App.css"

const App = () => {
  const [textInput, setTextInput] = useState("")
  const [textEntered, setTextEntered] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const imageGenerationButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    setTextEntered(true)
  }

  useEffect(() => {
    if (textEntered) {
      generateImage(textInput).then((data) => {
        setImageUrl(data!)
      })
      setTextEntered(false)
    } else {
      return
    }
  }, [textInput, textEntered])

  return (
    <div className='App'>
      <h1 className='customTitle'>Ask Monk-E to create some artwork</h1>
      <div className='userInputContainer'>
        <input
          className='userInput'
          placeholder='Enter text to prompt the Monkey'
          onChange={(event) => setTextInput(event.target.value)}
        />
        <button className='userButton' onClick={imageGenerationButtonHandler}>
          Generate Image
        </button>
      </div>
      {imageUrl.length > 0 ? (
        <img
          className='monkeyImage'
          src={imageUrl}
          loading='lazy'
          alt={`AI generated art based on the prompt ${textInput}`}
        />
      ) : (
        ""
      )}
    </div>
  )
}

export default App
