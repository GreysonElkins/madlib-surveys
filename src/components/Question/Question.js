import { Formik, Field, Form } from 'formik'

const Question = ({ question, questionNumber}) => {
  const questionTitle = `question-${questionNumber}`

  const printAnswerOptions = () => {
    const options = question.options.map((option, i) => {
      return <option value={option} key={`${questionTitle}-option-${i}`}>{option}</option>
    })
    const defaultOption = <option value='' key={'empty-value'}>--</option>
    return [defaultOption, ...options]
  }

  return (
    <>
    <label htmlFor={questionTitle}>{question.question}</label>
      <Field 
        name={questionTitle} 
        as={question.answerType}
      > 
        {question.answerType === 'select' ? printAnswerOptions() : ''}
      </Field> 
    </>
  )
}

export default Question