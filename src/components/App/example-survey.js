const useCase = {
  questions: [
    {question: "What role best describes your clients?", answerType: "option", options: ["Paralegals", "Lawyers"]},
    {question: "Where do your clients typically work?", answerType: "option", options: ["law firms", "inhouse legal departments"]},
    {question: "What is your product called?", answerType: "text"},
    {question: "When is your product used?", answerType: "text"},
    {question: "What does your product accomplish?", answerType: "text"}
  ]
  // answers: [],
  // madlib: `${this.answers[0]} at ${this.answers[1]} use ${this.answers[2]} when ${this.answers[3]} in order to ${this.answers[4]}`
}

export default useCase