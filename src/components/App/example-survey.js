const useCase = {
  questions: [
    {
      question: "What role best describes your clients?", 
      answerType: "select", 
      options: ["Paralegals", "Lawyers"]
    },
    {
      question: "Where do your clients typically work?", 
      answerType: "select", 
      options: ["law firms", "inhouse legal departments"]
    },
    {
      question: "What is your product called?", 
      answerType: "textarea"
    },
    {
      question: "When is your product used?", 
      answerType: "textarea"
    },
    {
      question: "What does your product accomplish?", 
      answerType: "textarea"
    }
  ]
  // answers: [],
  // madlib: `${this.answers[0]} at ${this.answers[1]} use ${this.answers[2]} when ${this.answers[3]} in order to ${this.answers[4]}`
}

export default useCase