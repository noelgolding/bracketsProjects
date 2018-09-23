class Program {
  // the scroll, callbacks
  constructor(scroll, preStep, postStep){
    this.scroll = scroll
    this.instructions = new Array(this.scroll.ic||0)
    this.reset()
  }

  reset(){
    this.ip = -1
    this.stack = [] // TODO {instruction, variables_before, variables_after}
    this.variables = {gemsCollected: 0, dweller: ''}
  }

  insertInstruction(i, instruction) {
    // TODO confirm instruction is valid based on scroll else error maybe
    // TODO if i >= this.scroll.ic then error
    this.instructions.splice(i, 0, instruction)
  }

  removeInstruction(i) {
    this.instructions(i,1)
  }

  execute(){
    // TODO implement stack machine
  }

  step(){
    // TODO
    // increment ip
    // before step callback
    // push instruction on stack
    // execute instruction - update variables accordingly
    // pop instruction from stack if no errors
    //    otherwise return stack trace, with state at each step
    // after step callback
  }
}
