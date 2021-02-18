import { Formik, Form } from 'formik'
import { useState } from 'react'

import Question from '../Question'
import ParagraphPreview from '../ParagraphPreview'
import SurveyResponses from '../SurveyResponses'

import './UserSurvey.css'

const UserSurvey = ({ survey, answerPreview }) => {
  const [answers, setAnswers] = useState(determineInitialFormState())
  const [currentQuestion, setCurrentQuestion] = useState(1)

  function determineInitialFormState () {
    const state = {}
    survey.questions.forEach(question => {
      state[`question-${question.num}`] = ''
    })
    return state
  }

  const renderQuestions = (errors, touched) => {
    const question = survey.questions[currentQuestion - 1]
    // {
    //   return survey.questions.map((question) => (
      return (
        <Question 
          question={question} 
          key={`Question-${question.num}`}
          errors={errors}
          touched={touched}
        />
      )
  //   ))
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

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    setCurrentQuestion(nextQuestion)
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
        {({ values, errors, touched, validateForm, setFieldError, setTouched, setErrors }) => (
          <Form
          className="questions"
          >
            {renderQuestions(errors, touched)}
            {/* I would love to move these into their own function, 
              but I'm suspicious of passing them Formik bag methods without their corresponding "state" values,
              so I'm leaving it for now to work on some other things.
            */}
            <div className="question-buttons">
              {currentQuestion > 1 && 
                <button 
                  className="cta-3"
                  type="button"
                  onClick={() => {
                    const previousQuestion = currentQuestion - 1
                    setCurrentQuestion(previousQuestion)
                  }}
                >
                  Previous
                </button>
              }
              {currentQuestion === survey.questions.length ? 
                <button 
                  type="submit"
                  className="cta-1"
                >
                  Submit
                </button> :
                <button 
                  className="cta-2"
                  type="button" 
                  onClick={() => {
                    setTouched({[`question-${currentQuestion}`]: true})
                    validateForm().then(result => {
                      if (!result[`question-${currentQuestion}`]) {
                        goToNextQuestion()
                        setAnswers(values)
                        setErrors({})
                      } else {
                        setFieldError({field: `question-${currentQuestion}`, errorMsg: result[`question-${currentQuestion}`]})
                      }
                    })
                  }}
                >
                  Next
                </button>
              }
            </div>
          </Form>
        )}
      </Formik>
      <ParagraphPreview 
        madlib={survey.madlib} 
        answers={answers} 
      />
    </div>
      {checkForResponses() &&
        <SurveyResponses currentAnswers={answers}/>
      }
      </>
  )
}

export default UserSurvey