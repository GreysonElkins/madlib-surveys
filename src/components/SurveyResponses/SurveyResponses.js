import { useEffect, useState } from 'react'

import ParagraphPreview from '../ParagraphPreview'

import './SurveyResponses.css'

const SurveyResponses = () => {
  const [responses, setResponses] = useState([])

  useEffect(() => {
    const storedResponses = localStorage.getItem('responses')
    setResponses(JSON.parse(storedResponses))
  }, [setResponses])

  const showResponses = () => {
    return responses.map(response => {
      return <ParagraphPreview madlib={response.madlib} answers={response.survey}/>
    })
  }

  return (
    <>
      <h1>Responses:</h1>
      <div className="SurveyResponses">{showResponses()}</div>
    </>
  )
}

export default SurveyResponses