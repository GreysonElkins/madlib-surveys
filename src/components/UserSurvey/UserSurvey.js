import Question from '../Question'
import { Formik, Form } from 'formik'

const UserSurvey = ({ survey }) => {
  
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