import { Formik, Form } from 'formik'
import { useState, useEffect } from 'react'

import Question from '../Question'
import ParagraphPreview from '../ParagraphPreview'

const UserSurvey = ({ survey, answerPreview }) => {
  const [answers, setAnswers] = useState(determineInitialFormState())

  function determineInitialFormState () {
    const state = {}
    survey.questions.forEach(question => {
      state[`question-${question.num}`] = ''
    })
    return state
  }

  const renderQuestions = () => {
    return survey.questions.map((question) => (
      <Question 
        question={question} 
        key={`Question-${question.num}`}
      />
    ))
  }

  return (
    <>
      <Formik 
        initialValues={determineInitialFormState()}
        onSubmit={(values) => console.log(values)}
        >
        {({ values }) => (
          <Form
            onChange={
              setAnswers(values)
            }
          >
            {renderQuestions()}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      {answerPreview &&
        <ParagraphPreview 
          madlib={survey.madlib} 
          answers={answers} 
        />
      }
    </>
  )
}

export default UserSurvey