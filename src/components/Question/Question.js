import { Field } from 'formik'

const Question = ({ question, changeFn }) => {
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
                > 
                {printAnswerOptions()}
              </Field> 

    } else if (question.answerType === 'textarea') {
      field = <Field 
        name={questionName} 
        type="text"
        />
    }
    return (
      <>
        <label htmlFor={questionName}>{question.question}</label>
        {field}
      </>
    )
  }

  return determineField()
}


export default Question