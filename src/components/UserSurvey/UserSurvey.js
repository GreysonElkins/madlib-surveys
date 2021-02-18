import { Formik, Form } from 'formik'
import { useState } from 'react'

import Question from '../Question'
import ParagraphPreview from '../ParagraphPreview'
import SurveyResponses from '../SurveyResponses'

import './UserSurvey.css'

const UserSurvey = ({ survey, answerPreview }) => {
  const [answers, setAnswers] = useState(determineInitialFormState())

  function determineInitialFormState () {
    const state = {}
    survey.questions.forEach(question => {
      state[`question-${question.num}`] = ''
    })
    return state
  }

  const renderQuestions = (errors, touched) => {
    return survey.questions.map((question) => (
      <Question 
        question={question} 
        key={`Question-${question.num}`}
        errors={errors}
        touched={touched}
      />
    ))
  }

  const updateStoredResponses = () => {
    const responses = findStoredResponses()
    responses.unshift({survey: answers, madlib: survey.madlib})
    localStorage.setItem('responses', JSON.stringify(responses));
  }
  
  const findStoredResponses = () => {
    let responses = JSON.parse(localStorage.getItem('responses'))
    return responses ? responses : [];
  }

  const checkForResponses = () => {
    return localStorage.getItem('responses') ? true : false
  }

  return (
    <>
    <h1>{survey.name}</h1>
    <h3>{survey.description}</h3>
    <div className="UserSurvey">
      <Formik 
        initialValues={determineInitialFormState()}
        validationSchema={survey.validationSchema}
        onSubmit={(values, { resetForm }) => {
          updateStoredResponses()
          resetForm()
        }}
        >
        {({ values, errors, touched }) => (
          <Form
          className="questions"
          onChange={
            setAnswers(values)
          }
          >
            {renderQuestions(errors, touched)}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <ParagraphPreview 
        madlib={survey.madlib} 
        answers={answers} 
      />
    </div>
      {checkForResponses() &&
        // gotta rerender this on submit
        <SurveyResponses currentAnswers={answers}/>
      }
      </>
  )
}

export default UserSurvey