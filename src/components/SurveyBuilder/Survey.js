// not gonna use this, but keeping it as reference

class Survey {
  constructor() {
    this.id = `survey-${Date.now()}`
    this.name = ''
    this.description = ''
    this.questions = []
    this.madlib = []
  }
}

export default Survey