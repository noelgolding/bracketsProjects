/* ========= */
/* CONSTANTS */
/* ========= */
const PLAYER = {name: "PLAYER"};
const PORTAL = {name: "PORTAL"};
const PURPLE = {name: "PURPLE_TROLL"};
const ORANGE = {name: "ORANGE_TROLL"};

const ACTION = {name: "ACTION_TOKEN"};
const CONDITIONAL = {name: "CONDITIONAL_TOKEN"};

const RUN = { command: "run()", tokenType: ACTION, tokenIcon: "images/token_run_32.png", className: "run"};
const SLIDE = { command: "slide()", tokenType: ACTION, tokenIcon: "images/token_slide_32.png", className: "slide"};
const JUMP = { command: "jump()", tokenType: ACTION, tokenIcon: "images/token_jump_32.png", className: "jump"};

// const COMMAND_TOKENS = [RUN, SLIDE, JUMP];

function getConditional(conditional, successScrollNodeIndex, failScrollNodeIndex) {
  var test = (isNaN(conditional)) ? `(${conditional}Troll)`: `(gemsCollected == ${conditional})`;

  var command = `if ${test} goto(${successScrollNodeIndex}); else goto(${failScrollNodeIndex})`;
  var tokenIcon = `images/if_${conditional}.png`;
  var className = `if_${conditional}`;
  return {command: command, tokenType: CONDITIONAL, tokenIcon: tokenIcon, className: className};
}

/* =============== */
/* MAP DEFINITIONS */
/* =============== */
var mapDef = [null,
{
  name: 1,
  image: "images/map1.jpg",
  trolls: [PURPLE, 0, 0, 0, 0, ORANGE],
  nodeCoords: [
    [47, 73],  // 0
    [228, 73],  // 1
    [423, 73], // 2
    [32 , 201], // 3
    [236, 201], // 4
    [423, 201], // 5
  ],
  nodeGraph: [
    [ 0,     RUN,   SLIDE, 0,     JUMP,  0     ], // 0
    [ RUN,   0,     JUMP,  SLIDE, 0,     0     ], // 1
    [ SLIDE, JUMP,  0,     0,     0,     RUN   ], // 2
    [ 0,     SLIDE, 0,     0,     RUN,   JUMP  ], // 3
    [ JUMP,  0,     0,     RUN,   0,     SLIDE ], // 4
    [ 0,     0,     RUN,   JUMP,  SLIDE, 0     ]  // 5
  ]
},
{
  name: 2,
  image: "images/map2.jpg",
  trolls: [0, ORANGE, PURPLE, 0, 0, 0],
  nodeCoords: [
    [181, 41],  // 0
    [53, 172],  // 1
    [181, 172], // 2
    [292 , 172], // 3
    [439, 172], // 4
    [292, 308], // 5
  ],
  nodeGraph: [
    /*  0  |   1  |   2  |   3  |   4  |   5  */
    [ 0,     JUMP,  RUN,   0,     SLIDE, 0     ], // 0
    [ JUMP,  0,     SLIDE, 0,     0,     RUN   ], // 1
    [ RUN,   SLIDE, 0,     JUMP,  0,     0     ], // 2
    [ 0,     0,     JUMP,  0,     RUN,   SLIDE ], // 3
    [ SLIDE, 0,     0,     RUN,   0,     JUMP  ], // 4
    [ 0,     RUN,   0,     SLIDE, JUMP,  0     ]  // 5
  ]
},
{
  name: 3,
  image: "images/map3.jpg",
  trolls: [PURPLE, 0, PURPLE, 0, ORANGE, 0], // TODO
  nodeCoords: [
    [49, 107],  // 0
    [239, 107],  // 1
    [439, 107], // 2
    [49 , 295], // 3
    [239, 295], // 4
    [439, 295], // 5
  ],
  nodeGraph: [ // TODO
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  0,    [RUN, JUMP]], // 4
    [ 0,             0,             SLIDE, 0,     [RUN, JUMP], 0    ]  // 5
  ]
},
{
  name: 4,
  image: "images/map4.jpg",
  trolls: [PURPLE, 0, 0, 0, 0, PURPLE],
  nodeCoords: [
    [48, 95],  // 0
    [48, 217],  // 1
    [194, 270], // 2
    [306 , 270], // 3
    [437, 270], // 4
    [306, 95], // 5
  ],
  nodeGraph: [ // TODO
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  0,    [RUN, JUMP]], // 4
    [ 0,             0,             SLIDE, 0,     [RUN, JUMP], 0    ]  // 5
  ]
},
{
  name: 5,
  image: "images/map5.jpg",
  trolls: [PURPLE, 0, 0, 0, 0, PURPLE], // TODO
  nodeCoords: [
    [47, 164],  // 0
    [152, 104],  // 1
    [152, 226], // 2
    [257, 147], // 3
    [352, 104], // 4
    [447, 226], // 5
  ],
  nodeGraph: [ // TODO
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  0,    [RUN, JUMP]], // 4
    [ 0,             0,             SLIDE, 0,     [RUN, JUMP], 0    ]  // 5
  ]
},
{
  name: 6,
  image: "images/map6.jpg",
  trolls: [0, ORANGE, PURPLE, 0, ORANGE, 0],
  nodeCoords: [
    [33, 221],  // 0
    [166, 81],  // 1
    [166, 366], // 2
    [319 , 81], // 3
    [319, 366], // 4
    [442, 221], // 5
  ],
  nodeGraph: [
    [ 0,   RUN,   0,     0,     0,     0   ], // 0
    [ 0,   0,     RUN,   JUMP,  SLIDE, 0   ], // 1
    [ RUN, SLIDE, 0,     0,     JUMP,  0   ], // 2
    [ 0,   JUMP,  SLIDE, 0,     RUN,   0   ], // 3
    [ 0,   0,     JUMP,  SLIDE, 0,     RUN ], // 4
    [ 0,   0,     0,     RUN,   0,     0   ]  // 5
  ]
},
{
  name: 7,
  image: "images/map7.jpg",
  trolls: [PURPLE, 0, 0, 0, 0, PURPLE], // TODO
  nodeCoords: [
    [39, 113],  // 0
    [39, 249],  // 1
    [154, 33], // 2
    [154, 179], // 3
    [154, 329], // 4
    [277, 113], // 5
    [277, 249], // 6
    [443, 113], // 7
    [443, 249], // 8
  ],
  nodeGraph: [ // TODO
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  0,    [RUN, JUMP]], // 4
    [ 0,             0,             SLIDE, 0,     [RUN, JUMP], 0    ]  // 5
  ]
},
{
  name: 8,
  image: "images/map8.jpg",
  trolls: [PURPLE, 0, 0, 0, 0, PURPLE], // TODO
  nodeCoords: [
    [237, 61],  // 0
    [166, 128],  // 1
    [317, 128], // 2
    [240, 205], // 3
    [66, 259], // 4
    [166, 281], // 5
    [317, 281], // 6
    [418, 259], // 7
    [66, 395], // 8
    [166, 395], // 9
    [317, 395], // 10
    [418, 395], // 11
  ],
  nodeGraph: [ // TODO
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  0,    [RUN, JUMP]], // 4
    [ 0,             0,             SLIDE, 0,     [RUN, JUMP], 0    ]  // 5
  ]
},
{
  name: 9,
  image: "images/map9.jpg",
  trolls: [PURPLE, 0, 0, 0, 0, PURPLE], // TODO
  nodeCoords: [
    [237, 35],  // 0
    [168, 143],  // 1
    [301, 143], // 2
    [107, 256], // 3
    [239, 256], // 4
    [370, 254], // 5
    [38, 370], // 6
    [168, 370], // 7
    [301, 370], // 8
    [444, 370], // 9
  ],
  nodeGraph: [ // TODO
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  0,    [RUN, JUMP]], // 4
    [ 0,             0,             SLIDE, 0,     [RUN, JUMP], 0    ]  // 5
  ]
},
{
  name: 10,
  image: "images/map10.jpg",
  trolls: [PURPLE, 0, 0, 0, 0, PURPLE], // TODO
  nodeCoords: [
    [52, 148],  // 0
    [149, 101],  // 1
    [244, 64], // 2
    [343, 101], // 3
    [429, 144], // 4
    [192, 215], // 5
    [303, 215], // 6
    [52, 271], // 7
    [149, 330], // 8
    [253, 373], // 9
    [355, 327], // 10
    [434, 268], // 11
  ],
  nodeGraph: [ // TODO
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  0,    [RUN, JUMP]], // 4
    [ 0,             0,             SLIDE, 0,     [RUN, JUMP], 0    ]  // 5
  ]
}
];

/* ================== */
/* SCROLL DEFINITIONS */
/* ================== */
var scrollDef = [null,
  {
    name: 1,
    image: "images/scroll1.jpg",
    nodeTypes: [PLAYER, ACTION, ACTION, ACTION, ACTION, PORTAL],
    nodeCoords: [
      [36, 128],  // TODO : player node
      [119, 128], // TODO : action node
      [199, 128], // TODO : action node
      [282, 128], // TODO : action node
      [282, 128], // TODO : action node
      [481, 128], // TODO : portal node
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 1, 0], // action node
      [0, 0, 0, 0, 0, 1], // action node
      [0, 0, 0, 0, 0, 0], // portal node
    ]
  },
2, 3,
{
  name: 4,
  image: "images/scroll4.jpg",
  nodeTypes: [PLAYER, ACTION, ACTION, ACTION, CONDITIONAL, PORTAL],
  nodeCoords: [
    [36, 128],  // player node
    [119, 128], // action node
    [199, 128], // action node
    [282, 128], // action node
    [366, 128], //conditional node
    [481, 128], // portal node
  ],
  nodeGraph: [
    [0, 1, 0, 0, 0, 0], // player node
    [0, 0, 1, 0, 0, 0], // action node
    [0, 0, 0, 1, 0, 0], // action node
    [0, 0, 0, 0, 1, 0], // action node
    [0, 1, 0, 0, 0, 1], // conditional node
    [0, 0, 0, 0, 0, 0], // portal node
  ]
}
];

/* ====== */
/* LEVELS */
/* ====== */
var level = [ null,
{
  level: 1,
  map: mapDef[1],
  scroll: scrollDef[1],
  setup: {
    startNode: 5,
    portalNode: 3,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: SLIDE , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 2,
  map: mapDef[2],
  scroll: scrollDef[1],
  setup: {
    startNode: 3,
    portalNode: 5,
    gemNodes: [0],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 3,
  map: mapDef[3],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 4,
  map: mapDef[4],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 5,
  map: mapDef[5],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 6,
  map: mapDef[6],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 7,
  map: mapDef[7],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 8,
  map: mapDef[8],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 9,
  map: mapDef[9],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
},
{
  level: 10,
  map: mapDef[10],
  scroll: scrollDef[1], // TODO
  setup: { // TODO
    startNode: 3,
    portalNode: 5,
    gemNodes: [],
    tokens: [
      {token: RUN   , count: 2},
      {token: JUMP , count: 2}
    ],
    conditionals: []
  }
}, 11, 12, 13, 14, 15,
{
  level: 16,
  map: mapDef[6],
  scroll: scrollDef[4],
  setup: {
    startNode: 1,
    portalNode: 3,
    gemNodes: [2, 2, 2, 4, 4, 4],
    tokens: [
      {token: RUN   , count: 1},
      {token: SLIDE , count: 1},
      {token: JUMP  , count: 1}
    ],
    conditionals: [getConditional(6, 5, 1)]
  }
}
];
