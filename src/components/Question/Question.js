import { Field } from 'formik'

import './Question.css'

const Question = ({ question, changeFn, errors, touched }) => {
  const questionName = `question-${question.num}`

  const printAnswerOptions = () => {
    const options = question.options.map((option, i) => {
      return <option value={option} key={`${questionName}-option-${i}`}>{option}</option>
    })
    const defaultOption = <option value='' key={'empty-value'}>--</option>
    return [defaultOption, ...options]
  }

  const determineField = () => {
    let field;
    if (question.answerType === 'select') {
    // ^ I've been getting curious about enums, 
    // I think this would be a great use case 
      field = <Field 
                name={questionName} 
                as="select"
                className="answer-value"
                > 
                {printAnswerOptions()}
              </Field> 
    } else if (question.answerType === 'textarea') {
      field = <Field 
        className="answer-value"
        name={questionName} 
        type="text"
        />
    }
    return (
      <>
        <label htmlFor={questionName}>{question.question}</label>
        {field}
        {errors[questionName] && touched[questionName] ? (
          <div className="validation-error">{errors[questionName]}</div>
        ) : null}
      </>
    )
  }

  return determineField()
}


export default Question