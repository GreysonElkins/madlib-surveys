import Question from '../Question'
import { Formik, Form } from 'formik'

const UserSurvey = ({ survey }) => {
  
  const determineInitialFormState = () => {
    const state = {}
    survey.questions.forEach((question, i) => {
      state[`${question}-${i}`] = ''
    })
    return state
  }
  
  const renderQuestions = () => {
    return survey.questions.map((question, i) => (
      <Question 
        question={question} 
        questionNumber={i}
        submitFn={() => {}}
        key={`Question-${i}`}
      />
    ))
  }

  return (
    <Formik 
      initialState={() => determineInitialFormState()}
    >
      <Form>
        {renderQuestions()}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default UserSurvey