import { useState, useEffect } from 'react'

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

  return <div>{printParagraph()}</div>
}

export default ParagraphPreview