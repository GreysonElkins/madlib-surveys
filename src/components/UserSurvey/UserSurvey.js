import { Formik, Form } from 'formik'
import { useState } from 'react'

import Question from '../Question'
import ParagraphPreview from '../ParagraphPreview'

const UserSurvey = ({ survey, answerPreview }) => {
  const [answers, setAnswers] = useState({})

  const determineInitialFormState = () => {
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
        changeFn={(value) => {
          setAnswers(
            (prevAnswer) => {
              prevAnswer[`question-${question.num}`] = value
            })
          }
        }
      />
    ))
  }

  return (
    <>
      <Formik 
        initialValues={determineInitialFormState()}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          {renderQuestions()}
          <button type="submit">Submit</button>
        </Form>
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