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
      let linestyle = (edge.connector == '->') ? ',style=dotted' : ''
      gdot += `${edge.from.id} [fixed=true,x=${edge.from.pos.x},y=${edge.from.pos.y}];`
      gdot += `${edge.to.id} [fixed=true,x=${edge.to.pos.x},y=${edge.to.pos.y}];`
      gdot += `${edge.from.id} ${edge.connector} ${edge.to.id} [label=${edge.action.label.toLowerCase()},color=${c}${linestyle}];`
    })
    gdot += '}'
    return gdot
  }
}
