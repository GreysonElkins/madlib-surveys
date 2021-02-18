import * as Yup from 'yup'

class Survey {
  constructor({ name, description, questions, madlib }) {
    this.id = `survey-${Date.now()}`
    this.name = name
    this.description = description
    this.questions = this.addQuestionType(questions)
    this.madlib = madlib
    this.validationSchema = Yup.object().shape(this.setValidationObject(questions))
  }

  setValidationObject(questions) {
    const yupObj = {}
    for (let i = 1; i < questions.length; i++) {
      yupObj[`question-${i}`] = Yup.string().required('Required')
    }
    return yupObj
  }

  addQuestionType(questions) {
    return questions.map((question, i) => ({
      num: i + 1,
      question: question, 
      answerType: "textarea"
    }))
  }
}

export default Survey