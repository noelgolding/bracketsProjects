let container = document.getElementById('mynetwork');

var network
function loadLevel(i) {
  // generate the vis network graph from the game's mapGraph
  let level = initLevel(i)
  let parsedData = vis.network.convertDot(level.emitDot());
  let data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
  }
  let options = parsedData.options;
  options.physics = {"barnesHut": {"avoidOverlap": 1}}
  // initialize your network!
  network = new vis.Network(container, data, options);
  selectNode(level.startNode || level.nodes[0])
}

function selectNode(node) {
  // select node and only the outgoing edges
  let outgoing_edges = network.body.nodes[node.id].edges
     .filter(e => e.from.id == node.id || true !== e.edgeType.options.arrows.to.enabled )
    .map(e => e.id)
  network.setSelection({nodes:[node.id], edges:outgoing_edges},{unselectAll:true, highlightEdges:false})
}

function afterExecCommand(node) {
  selectNode(node)
}

loadLevel(1)
