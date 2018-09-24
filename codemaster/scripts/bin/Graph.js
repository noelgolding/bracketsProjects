class Edge {
  constructor(n1, n2, action) {
    this.from = n1
    this.to = n2
    this.action = action
    this.connector = '->'
  }
}

class Node {
  constructor(id){
    this.id = id
    this.edges = []
  }
  addEdge(e) {
    this.edges.push(e)
  }
}

class Graph {
  constructor(size){
    this.nodes = []
    this.edges = []
    for (let i = 0; i < size; i++) {
      this.addNode(new Node(i))
    }
  }
  addNode(n) {
    this.nodes.push(n)
  }
  addEdge(n1, n2, action) {
    let edge = new Edge(n1, n2, action)
    n1.addEdge(edge)
    let undirected_edge = this.edges.filter(e => e.from == n2 && e.to == n1 && e.action == action)[0]

    if (undirected_edge) {
      undirected_edge.connector = '--'
    } else {
      this.edges.push(edge)
    }
  }
  emitDot() {
    // TODO externalize the styling
    let gdot = '{'
    this.edges.forEach( edge => {
      let c = 'blue'
      switch(edge.action){
        case RUN:
          c = 'red'
          break
        case SLIDE:
          c = 'green'
      }
      let p1 = (edge.from.pos) ? `,x=${edge.from.pos.x},y=${edge.from.pos.y}` : ''
      let p2 = (edge.to.pos) ? `,x=${edge.to.pos.x},y=${edge.to.pos.y}` : ''
      let linestyle = (edge.connector == '->') ? ',style=dotted' : ''
      let label = (edge.action.label) ? `,label=${edge.action.label.toLowerCase()}` : ''
      let fixed = (edge.action.label) ? true : false
      gdot += `${edge.from.id} [fixed=${fixed}${p1}];`
      gdot += `${edge.to.id} [fixed=${fixed}${p2}];`
      gdot += `${edge.from.id} ${edge.connector} ${edge.to.id} [width=4,color=${c}${linestyle}${label}];`
    })
    gdot += '}'
    return gdot
  }
}
