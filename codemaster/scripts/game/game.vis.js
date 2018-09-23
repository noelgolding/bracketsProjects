let networkContainer = document.getElementById('mynetwork');

var network
function loadLevel(i) {
  // generate the vis network graph from the game's mapGraph
  let loadedLevel = initLevel(i)
  let parsedData = vis.network.convertDot(loadedLevel.map.emitDot());
  let data = {
    nodes: parsedData.nodes,
    edges: parsedData.edges
  }
  let options = parsedData.options;
  options.physics = {"barnesHut": {"avoidOverlap": 1}}
  // initialize your network!
  network = new vis.Network(networkContainer, data, options);
  console.log(loadedLevel.setup.startNode)
  // selectNode(level.setup.startNode)
  selectNode(loadedLevel.map.nodes[loadedLevel.setup.startNode])
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
