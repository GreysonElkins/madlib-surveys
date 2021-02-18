import { useEffect, useState } from 'react'

import ParagraphPreview from '../ParagraphPreview'

import './SurveyResponses.css'


const SurveyResponses = ({ currentAnswers }) => {
  const [responses, setResponses] = useState([])

  useEffect(() => {
    const storedResponses = localStorage.getItem('responses')
    setResponses(JSON.parse(storedResponses))
  }, [setResponses, currentAnswers])

  const showResponses = () => {
    return responses.map((response, i) => {
      return <ParagraphPreview key={`response-${i}`} madlib={response.madlib} answers={response.survey}/>
    })
  }

  return (
    <>
      <h1>Previous Responses:</h1>
      <div className="SurveyResponses">{showResponses()}</div>
    </>
  )
}

export default SurveyResponses