import React, { ChangeEvent, useEffect, useState } from "react"

import constantValues from "./constants/constantValues"
import generateImage from "./helpers/generateImage"
import Avatar from "./images/salvator-monke-tm.png"
import "./App.css"

const App = () => {
  const [textInput, setTextInput] = useState("")
  const [textEntered, setTextEntered] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [imageUrl, setImageUrl] = useState("")

  const {
    generateImageButtonText,
    inputPromptText,
    minimumPromptLength,
    minimumPromptLengthHelp,
  } = constantValues

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.currentTarget.value)
  }

  const imageGenerationButtonHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    setTextEntered(true)
  }

  useEffect(() => {
    textInput.length >= minimumPromptLength
      ? setButtonDisabled(false)
      : setButtonDisabled(true)
  }, [textInput, buttonDisabled, minimumPromptLength])

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
      <div className='header'>
        <h1 className='customTitle'>Ask Monk-E to create some artwork</h1>
        <img
          className='avatar'
          src={Avatar}
          alt='The AI artist generated in AI!'
        />
      </div>
      <div className='userInputContainer'>
        <input
          className='userInput'
          placeholder={inputPromptText}
          onChange={handleTextChange}
        />
        <p className='userHelpText'>{minimumPromptLengthHelp}</p>
        <button
          className='userButton'
          disabled={buttonDisabled}
          onClick={imageGenerationButtonHandler}
        >
          {generateImageButtonText}
        </button>
      </div>
      <p className='userInfoText'>
        It may come as no surprise to learn that Monk-E is an AI artist
        (Aitist?) built on <a href='https://openai.com/'>OpenAI's</a>{" "}
        <a href='https://openai.com/product/dall-e-2'>DALL-E</a>.
      </p>
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
