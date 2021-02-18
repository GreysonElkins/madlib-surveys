import { useState, useEffect } from 'react'

import './ParagraphPreview.css'

const ParagraphPreview = ({ madlib, answers }) => {
  const [inputs, setInputs] = useState({})

  const findPhraseInput = (fieldNumber, i) => {
    const matchedInput = inputs[`question-${fieldNumber}`]
    return <span key={`phrase-${i}-${Date.now()}`}> {matchedInput !== '' ? matchedInput : '_______'} </span>
  }

  const printParagraph = () => {
    return madlib.map((phrase, i) => {
      if (typeof(phrase) === 'number') {
        return findPhraseInput(phrase, i)
      } else {
        return <span key={`phrase-${i}-${Date.now()}`}>{phrase}</span>
      }
    })
  } 

  useEffect(() => {
    setInputs(answers)
  }, [answers, setInputs])

  return <div className="ParagraphPreview">{printParagraph()}</div>
}

export default ParagraphPreview