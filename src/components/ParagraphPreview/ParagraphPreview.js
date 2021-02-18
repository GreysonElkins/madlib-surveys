import { useState, useEffect } from 'react'

import './ParagraphPreview.css'

const ParagraphPreview = ({ madlib, answers }) => {
  const [inputs, setInputs] = useState({})

  const findPhraseInput = (fieldNumber) => {
    const matchedInput = inputs[`question-${fieldNumber}`]
    return <span> {matchedInput !== '' ? matchedInput : '_______'} </span>
  }

  const printParagraph = () => {
    return madlib.map(phrase => {
      if (typeof(phrase) === 'number') {
        return findPhraseInput(phrase)
      } else {
        return phrase
      }
    })
  } 

  useEffect(() => {
    setInputs(answers)
  }, [answers, setInputs])

  return <div className="ParagraphPreview">{printParagraph()}</div>
}

export default ParagraphPreview