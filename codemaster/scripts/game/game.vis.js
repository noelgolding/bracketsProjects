let networkContainer = document.getElementById('mynetwork');
let scrollContainer = document.getElementById('myscroll');

var network
var flowchart
function loadLevel(i) {
  // generate the vis network graph from the game's mapGraph
  let loadedLevel = initLevel(i)
  network = visGraph(networkContainer, loadedLevel.map.emitDot())
  flowchart = visGraph(scrollContainer, loadedLevel.scroll.emitDot(), true)
  selectNode(loadedLevel.map.nodes[loadedLevel.setup.startNode], network)
  selectNode(loadedLevel.scroll.nodes[0], flowchart)
}

function visGraph(container, dot, hierarchical) {
  let parsedData = vis.network.convertDot(dot);
  let data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
  }
  let options = parsedData.options;
  options.physics = {"barnesHut": {"avoidOverlap": 1}}
  if (hierarchical) {
    options.layout = {hierarchical : true}
  }
  // initialize your network!
  return new vis.Network(container, data, options);
}

function selectNode(node, graph) {
  // select node and only the outgoing edges
  let outgoing_edges = graph.body.nodes[node.id].edges
    .filter(e => e.from.id == node.id || true !== e.edgeType.options.arrows.to.enabled )
    .map(e => e.id)
  graph.setSelection({nodes:[node.id], edges:outgoing_edges},{unselectAll:true, highlightEdges:false})
}

function afterExecCommand(node) {
  selectNode(node, network)
}

loadLevel(1)
