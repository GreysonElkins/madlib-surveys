import { Formik, Field } from 'formik'

const Question = ({ question, questionNumber, submitFn }) => {
  const questionTitle = `question-${questionNumber}`

  const printAnswerOptions = () => {
    return question.options.map((option, i) => {
      return <option value={option} key={`${questionTitle}-option-${i}`}>{option}</option>
    })
  }

  return (
    <Formik
      initialState={{questionTitle: ''}}
      // initialState could potentially require more logic for types other than select & text
      // for our purposes we aren't considering those at the moment
      onSubmit={values => submitFn(values)}
    >  
    <label htmlFor={questionTitle}>{question.question}</label>
    <Field name={questionTitle} as={question.answerType}> 
      {question.answerType === 'select' ? printAnswerOptions() : ''}
    </Field>
  </Formik>
  )
}

export default Question