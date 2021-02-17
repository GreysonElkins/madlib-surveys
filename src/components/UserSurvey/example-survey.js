const useCase = {
  questions: [
    {question: "What role best describes your clients?", answerType: "option", options: ["Paralegals", "Lawyers"]},
    {question: "Where do your clients typically work?", answerType: "option", options: ["law firms", "inhouse legal departments"]},
    {question: "What is your product called?", answerType: "text"}
    {question: "When is your product used?", answerType: "text"},
    {question: "What does your product accomplish?", answerType: "text"}
  ],
  answers: [],
  madlib: `${answer[0]} at ${answer[1]} use ${answer[2]} when ${answer[3]} in order to ${answer[4]}`
  
}

export default useCase