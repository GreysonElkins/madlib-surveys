import { Formik, Form } from 'formik'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    if (currentQuestion === survey.questions.length) {
      document.getElementById('survey-submit').classList.remove('hidden')
    } else {
      document.getElementById('survey-submit').classList.add('hidden')
    }
  }, [currentQuestion])

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

  const onSubmit = (values, { resetForm }) => {
    // setting answers here seemed to happen before values updated onSubmit
    updateStoredResponses()
    setCurrentQuestion(1)
    alert('Thanks for taking the survey! Your response has been stored')
    // ^ not a fan of this `alert`, but it'll do for now
    resetForm()
  }

  return (
    <>
    <h1>{survey.name}</h1>
    <h3>{survey.description}</h3>
    <div className="UserSurvey">
      <Formik 
        initialValues={determineInitialFormState()}
        validationSchema={survey.validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, validateForm, setFieldError, setTouched, setErrors, handleSubmit }) => (
          <Form
          className="questions"
          onSubmit={handleSubmit}
          >
            {renderQuestions(errors, touched)}
            {/* I would love to move the question buttons into it's own function, 
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
                <button 
                  type="submit"
                  id="survey-submit"
                  className={"cta-1 hidden"} 
                  // I wouldn't have done it this way with class names, but conditionally rendering the submit button triggered on submit when it rendered.
                  onClick={() => {setAnswers(values)}}
                  // ^ earlier I didn't need this... I feel like this sort of logic misses the point of Formik
                  // then when I started doing more in onSubmit, 
                >
                  Submit
                </button> 
              {currentQuestion !== survey.questions.length && 
                <button 
                  className="cta-2"
                  type="button" 
                  onClick={() => {
                    setTouched({[`question-${currentQuestion}`]: true})
                    //I would have preferred validateField here, but it doesn't have a return and didn't seem to be affecting `errors` 
                    validateForm().then(result => {
                      if (!result[`question-${currentQuestion}`]) {
                        goToNextQuestion()
                        setAnswers(values)
                        setErrors({})
                      } else {
                        setFieldError({
                          field: `question-${currentQuestion}`, 
                          errorMsg: result[`question-${currentQuestion}`]
                        })
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