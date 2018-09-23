function jump(){execCommand(JUMP)}
function run(){execCommand(RUN)}
function slide(){execCommand(SLIDE)}

let __n
let __s
function execCommand(cmd) {
  beforeExecCommand(__n)
  if (!__n) {
    console.error(`YOU MUST INITIALIZE`)
    return
  }
  __s = __n.edges.filter(e => e.action == cmd)[0]
  if (__s) {
    __n = __s.to
    console.log(`INFO: ${cmd.label} to ${__n.id}`)
  } else {
    console.error(`ERROR: cannot ${cmd.label} from ${__n.id}`)
  }
  afterExecCommand(__n)
}

function beforeExecCommand(node) {}
function afterExecCommand(node) {}

function initLevel(l) {
  let currentLevel = level[l]
  let currentMap = currentLevel.map
  let nodeDefs = currentMap.nodeGraph

  // generate the game's map graph
  mapGraph = new Graph(nodeDefs.length)
  for (i = 0; i < nodeDefs.length; i++) {
    var n1 = mapGraph.nodes[i]
    var c = currentMap.nodeCoords[i]
    n1.pos = {x: c[0], y: c[1]}
    for (j = 0; j < nodeDefs[i].length; j++) {
      actions = nodeDefs[i][j]
      n2 = mapGraph.nodes[j]

      if (actions.constructor !== Array) {
        actions = [actions]
      }
      actions.filter( a => a.label ).forEach( action =>{
        mapGraph.addEdge(n1, n2, action)
      })
    }
  }

  // set the starting node
  __n = mapGraph.nodes[0]
  return mapGraph
}
