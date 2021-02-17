const useCase = {
  name: "Use Cases",
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