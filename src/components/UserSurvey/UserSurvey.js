import Question from '../Question'
import { Formik, Form } from 'formik'

const UserSurvey = ({ survey }) => {
  
  const determineInitialFormState = () => {
    const state = {}
    for (let i=0; i < survey.questions.length; i++) {
      state[`question-${i}`] = ''
    }
    return state
  }
  
  const renderQuestions = () => {
    return survey.questions.map((question, i) => (
      <Question 
        question={question} 
        questionNumber={i}
        key={`Question-${i}`}
      />
    ))
  }

  return (
    <Formik 
      initialValues={determineInitialFormState()}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        {renderQuestions()}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default UserSurvey