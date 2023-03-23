import React from "react"
import "./App.css"
import generateImage from "./helpers/generateImage"

const App = () => {
  const imageGenerationButtonHandler = (event: React.MouseEvent) => {
    generateImage("Happy monkey bananas")
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <button onClick={imageGenerationButtonHandler}>Generate Image</button>
      </header>
    </div>
  )
}

export default App
