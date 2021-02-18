import * as Yup from 'yup';

const useCase = {
  id: 1,
  name: "Use Cases",
  description: "Let's figure out how to best tell potential clients about your product!",
  validationSchema: Yup.object().shape({
    "question-1": Yup.string().required('Required'),
    "question-2": Yup.string().required('Required'),
    "question-3": Yup.string().required('Required'),
    "question-4": Yup.string().required('Required'),
    "question-5": Yup.string().required('Required'),
  }),
  questions: [
    {
      num: 1,
      question: "What role best describes your clients?", 
      answerType: "select", 
      options: ["Paralegals", "Lawyers"]
    },
    {
      num: 2,
      question: "Where do your clients typically work?", 
      answerType: "select", 
      options: ["law firms", "inhouse legal departments"]
    },
    {
      num: 3,
      question: "What is your product called?", 
      answerType: "textarea"
    },
    {
      num: 4,
      question: "When is your product used?", 
      answerType: "textarea"
    },
    {
      num: 5,
      question: "What does your product accomplish?", 
      answerType: "textarea"
    }
  ],
  madlib: [1, `at`, 2, `use`, 3, `when`, 4, `in order to`, 5]
}

export default useCase