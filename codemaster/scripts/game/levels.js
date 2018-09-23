/* ========= */
/* CONSTANTS */
/* ========= */
// Characters
const PLAYER = {label: "PLAYER"};
const PORTAL = {label: "PORTAL"};
const PURPLE = PURPLETROLL = PURPLE_TROLL = {label: "PURPLE_TROLL"};
const ORANGE = ORANGETROLL = ORANGE_TROLL = {label: "ORANGE_TROLL"};
// Program Token Types
const ACTION = {label: "ACTION_TOKEN"};
const CONDITIONAL = {label: "CONDITIONAL_TOKEN"};
// Program Action/Command Tokens
const RUN = { label: "RUN",
              command: {key: "execCommand( RUN )", exec: () => run()},
              tokenType: ACTION, tokenIcon: "images/run_token_32.png", className: "run"};
const SLIDE = { label: "SLIDE",
                command:  {key: "execCommand( SLIDE )", exec: () => slide()},
                tokenType: ACTION, tokenIcon: "images/slide_token_32.png", className: "slide"};
const JUMP = { label: "JUMP",
                command:  {key: "execCommand( JUMP )", exec: () => jump()},
                tokenType: ACTION, tokenIcon: "images/jump_token_32.png", className: "jump"};
// Conditional statement Tokens will be dynamically generated
function createConditionalToken(conditional) {
  var test;
  if (isNaN(conditional)) {
    conditional = conditional.label;
    test = `( dweller == ${conditional} )`
  } else {
    test = `( gemsCollected == ${conditional} )`;
  }
  var tokenIcon = `images/if_${conditional}_32.png`;
  var className = `if_${conditional}`;
  return {label: `if ${test} ?`,
          command: {key: `if ${test} ?`, exec: () => conditional(test) },
          tokenType: CONDITIONAL, tokenIcon: tokenIcon, className: className};
}

/* ========================================================================================== */
/* ========================================================================================== */

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
  g: "{0 -- 1; 0 -- 2; 0 -- 4; 1 -- 2; 1 -- 3; 2 -- 5; 3 -- 4; 3 -- 5; 4 -- 5;}",
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
  trolls: [PURPLE, 0, PURPLE, 0, ORANGE, 0],
  nodeCoords: [
    [49, 107],  // 0
    [239, 107],  // 1
    [439, 107], // 2
    [49 , 295], // 3
    [239, 295], // 4
    [439, 295], // 5
  ],
  nodeGraph: [
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
  nodeGraph: [
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,            [RUN, SLIDE],   0,     JUMP,   0,     0         ], // 0
    [[RUN, SLIDE],   0,             JUMP,  0,      0,     0         ], // 1
    [ 0,             JUMP,          0,     RUN,    0,     SLIDE     ], // 2
    [ JUMP,          0,             RUN,   0,      SLIDE, 0         ], // 3
    [ 0,             0,             0,     SLIDE,  JUMP,  RUN       ], // 4
    [ 0,             0,             SLIDE, JUMP,   RUN,   0         ]  // 5
  ]
},
{
  name: 5,
  image: "images/map5.jpg",
  trolls: [ORANGE, 0, 0, PURPLE, 0, PURPLE],
  nodeCoords: [
    [47, 164],  // 0
    [152, 104],  // 1
    [152, 226], // 2
    [257, 147], // 3
    [352, 104], // 4
    [447, 226], // 5
  ],
  nodeGraph: [
    /*  0          |   1          |   2  |   3  |   4   |   5  */
    [ 0,             SLIDE,         0,     0,      JUMP,  RUN       ], // 0
    [ SLIDE,         0,             RUN,   JUMP,   0,     0         ], // 1
    [ 0,             0,             0,     SLIDE,  0,     JUMP      ], // 2
    [ 0,             JUMP,          SLIDE, 0,      RUN,   0         ], // 3
    [ JUMP,          0,             0,     RUN,    0,     SLIDE     ], // 4
    [ RUN,           0,             JUMP,  0,      SLIDE, 0         ]  // 5
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
  trolls: [ORANGE, 0, 0, 0, 0, 0, 0, 0, 0],
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
  nodeGraph: [
    /*  0          |   1          |   2  |   3  |   4   |   5     | 6     | 7      | 8     */
    [ 0,             SLIDE,         JUMP,  RUN,    0,     0,        0,     0,       0    ], // 0
    [ SLIDE,         0,             0,     0,      RUN,   0,        0,     0,       0    ], // 1
    [ JUMP,          0,             0,     SLIDE,  0,     RUN,      0,     0,       0    ], // 2
    [ RUN,           0,             SLIDE, 0,      JUMP,  0,        0,     0,       0    ], // 3
    [ 0,             RUN,           0,     JUMP,   0,     0,        SLIDE, 0,       0    ], // 4
    [ 0,             0,             RUN,   0,      0,     0,        JUMP,  SLIDE,   0    ], // 5
    [ 0,             0,             0,     0,      SLIDE, JUMP,     0,     0,       RUN  ], // 6
    [ 0,             0,             0,     0,      0,     SLIDE,    0,     0,       JUMP ], // 7
    [ 0,             0,             0,     0,      0,     0,        RUN,   JUMP,    0    ], // 8
  ]
},
{
  name: 8,
  image: "images/map8.jpg",
  trolls: [0, 0, 0, ORANGE, 0, 0, 0, 0, 0, ORANGE, ORANGE, 0],
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
  nodeGraph: [
    /*  0          |   1          |   2          |   3          |   4          |   5          |   6          |   7          |   8          |   9          |   10          |   11            */
    [ RUN,          SLIDE,         JUMP,          0,             0,             0,             0,             0,             0,             0,             0,              0         ], // 0
    [ SLIDE,        0,             0,             JUMP,          RUN,           0,             0,             0,             0,             0,             0,              0         ], // 1
    [ JUMP,         SLIDE,         0,             RUN,           0,             0,             0,             0,             0,             0,             0,              0         ], // 2
    [ 0,            JUMP,          RUN,           0,             0,             0,             SLIDE,         0,             0,             0,             0,              0         ], // 3
    [ 0,            0,             0,             0,             0,             JUMP,          0,             0,             SLIDE,         RUN,           0,              0         ], // 4
    [ 0,            0,             0,             RUN,           JUMP,          0,             0,             0,             0,             SLIDE,         0,              0         ], // 5
    [ 0,            0,             0,             0,             0,             JUMP,          0,             RUN,           0,             0,             SLIDE,          0         ], // 6
    [ 0,            0,             SLIDE,         0,             0,             0,             RUN,           0,             0,             0,             0,              JUMP      ], // 7
    [ 0,            0,             0,             0,             SLIDE,         0,             0,             0,             JUMP,          RUN,           0,              0         ], // 8
    [ 0,            0,             0,             0,             0,             SLIDE,         0,             0,             RUN,           0,             JUMP,           0         ], // 9
    [ 0,            0,             0,             0,             0,             0,             SLIDE,         JUMP,          0,             0,             0,              RUN       ], // 10
    [ 0,            0,             0,             0,             0,             0,             0,             JUMP,          0,             0,             RUN,            SLIDE     ], // 11
  ]
},
{
  name: 9,
  image: "images/map9.jpg",
  trolls: [0, ORANGE, 0, 0, 0, 0, 0, 0, 0, 0],
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
  nodeGraph: [
    /*  0          |   1          |   2          |   3          |   4          |   5          |   6          |   7          |   8          |   9              */
    [ 0,            JUMP,          0,             0,             0,             0,             SLIDE,         0,             0,             RUN,       ], // 0
    [ 0,            0,             RUN,           [JUMP, SLIDE], 0,             0,             0,             0,             0,             0,         ], // 1
    [ SLIDE,        0,             0,             0,             JUMP,          RUN,           0,             0,             0,             0,         ], // 2
    [ 0,            SLIDE,         0,             0,             RUN,           0,             JUMP,          0,             0,             0,         ], // 3
    [ 0,            SLIDE,         0,             0,             0,             RUN ,          0,             JUMP,          0,             0,         ], // 4
    [ 0,            0,             [SLIDE, RUN],  0,             0,             0,             0,             0,             JUMP,          0,         ], // 5
    [ SLIDE,        0,             0,             0,             0,             0,             0,             RUN,           0,             JUMP,      ], // 6
    [ 0,            0,             0,             SLIDE,         0,             0,             0,             0,             [JUMP, RUN],   0,         ], // 7
    [ 0,            0,             0,             0,             SLIDE,         0,             0,             JUMP,          0,             RUN,       ], // 8
    [ RUN,          0,             0,             0,             0,             SLIDE,         JUMP,          0,             0,             0,         ], // 9
  ]
},
{
  name: 10,
  image: "images/map10.jpg",
  trolls: [0, 0, 0, 0, PURPLE, 0, 0, ORANGE, 0, 0, ORANGE, 0],
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
  nodeGraph: [
    /*  0          |   1          |   2          |   3          |   4          |   5          |   6          |   7          |   8          |   9          |   10          |   11            */
    [ 0,            RUN,           0,             0,             0,             0,             0,             SLIDE,          0,             0,             0,              0         ], // 0
    [ RUN,          0,             SLIDE,         0,             0,             JUMP,          0,             0,              0,             0,             0,              0         ], // 1
    [ 0,            SLIDE,         RUN,           JUMP,          0,             0,             0,             0,              0,             0,             0,              0         ], // 2
    [ 0,            0,             JUMP,          0,             RUN,           0,             SLIDE,         0,              0,             0,             0,              0         ], // 3
    [ 0,            0,             0,             RUN,           0,             0,             0,             0,              0,             0,             0,              SLIDE     ], // 4
    [ 0,            JUMP,          0,             0,             0,             0,             RUN,           0,              SLIDE,         0,             0,              0         ], // 5
    [ 0,            0,             0,             SLIDE,         0,             RUN,           0,             0,              0,             0,             JUMP,           0         ], // 6
    [ JUMP,         0,             0,             0,             0,             0,             0,             0,              RUN,           0,             0,              0         ], // 7
    [ 0,            0,             0,             0,             0,             SLIDE,         0,             RUN,            0,             JUMP,          0,              0         ], // 8
    [ 0,            0,             0,             0,             0,             0,             0,             0,              JUMP,          RUN,           SLIDE,          0         ], // 9
    [ 0,            0,             0,             0,             0,             0,             JUMP,          0,              0,             SLIDE,         0,              RUN       ], // 10
    [ 0,            0,             0,             0,             JUMP,          0,             0,             0,              0,             0,             RUN,            0         ], // 11
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
    nodeLayout: [
      [PLAYER, 'right_arrow', [ACTION, 0], 'right_arrow', [ACTION, 1], 'right_arrow', [ACTION, 2], 'right_arrow', [ACTION, 3], 'right_arrow', PORTAL]
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
{
    name: 2,
    image: "images/scroll2.jpg",
    nodeTypes: [PLAYER, ACTION, ACTION, ACTION, ACTION,  ACTION, PORTAL],
    nodeLayout: [
      [PLAYER, 'right_arrow', [ACTION, 0], 'right_arrow', [ACTION, 1], 'right_arrow', [ACTION, 2]],
      [null,    null,         null,        null,          null,        null,         'down_arrow'],
      [null,    null,         null,        null,          null,        null,         [ACTION, 3],   'right_arrow', [ACTION, 4], 'right_arrow', PORTAL]
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0], // action node
      [0, 0, 0, 0, 0, 0, 1], // action node
      [0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
    name: 3,
    image: "images/scroll3.jpg",
    nodeTypes: [PLAYER, ACTION, ACTION, ACTION, ACTION, ACTION, ACTION, PORTAL],
    nodeLayout: [
      [PLAYER, 'right_arrow', [ACTION, 0], 'right_arrow', [ACTION, 1]],
      [null,   null,          null,         null,         'down_arrow'],
      [null,   null,          null,         null,         [ACTION, 2],  'right_arrow', [ACTION, 3]],
      [null,   null,          null,         null,         null,         null,          'down_arrow'],
      [null,   null,          null,         null,         null,         null,          [ACTION, 4],  'right_arrow', [ACTION, 5], 'right_arrow', PORTAL],
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 1, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 1], // action node
      [0, 0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
  name: 4,
  image: "images/scroll4.jpg",
  nodeTypes: [PLAYER, ACTION, ACTION, ACTION, CONDITIONAL, PORTAL],
  nodeLayout: [
    [null,   null,          'down_arrow', 'left_arrow repeat-x',  'left_arrow repeat-x', 'left_arrow repeat-x',  'left_arrow repeat-x', 'left_arrow repeat-x',  'else_up_arrow'],
    [PLAYER, 'right_arrow', [ACTION, 0],  'right_arrow', [ACTION, 1],  'right_arrow', [ACTION, 2],  'right_arrow', [CONDITIONAL, 3], 'if_right_arrow', PORTAL]
  ],
  nodeGraph: [
    [0, 1, 0, 0, 0, 0], // player node
    [0, 0, 1, 0, 0, 0], // action node
    [0, 0, 0, 1, 0, 0], // action node
    [0, 0, 0, 0, 1, 0], // action node
    [0, 2, 0, 0, 0, 1], // conditional node
    [0, 0, 0, 0, 0, 0], // portal node
  ],
},
{
    name: 5,
    image: "images/scroll5.jpg",
    nodeTypes: [PLAYER, ACTION, ACTION, ACTION, ACTION, ACTION, ACTION, ACTION, PORTAL],
    nodeLayout: [
      [PLAYER, 'right_arrow', [ACTION, 0], 'right_arrow', [ACTION, 1]],
      [null,   null,          null,        null,          'down_arrow'],
      [null,   null,          null,        null,          [ACTION, 2],  null,          null,        null,          [ACTION,6],    'right_arrow', PORTAL],
      [null,   null,          null,        null,          'down_arrow', null,          null,        null,          'up_arrow'],
      [null,   null,          null,        null,           [ACTION, 3], 'right_arrow', [ACTION, 4], 'right_arrow', [ACTION,5]]
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 1, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 1], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
    name: 6,
    image: "images/scroll6.jpg",
    nodeTypes: [PLAYER, ACTION, ACTION, ACTION, ACTION, CONDITIONAL, PORTAL],
    nodeLayout: [
      [null,   null,          'down_arrow', 'left_arrow repeat-x',  'left_arrow repeat-x', 'left_arrow repeat-x',  'left_arrow repeat-x', 'left_arrow repeat-x',  'left_arrow repeat-x', 'left_arrow repeat-x',  'if_up_arrow'],
      [PLAYER, 'right_arrow', [ACTION, 0],  'right_arrow', [ACTION, 1],  'right_arrow', [ACTION, 2],  'right_arrow', [ACTION, 3],  'right_arrow', [CONDITIONAL, 4]],
      [null,   null,          null,         null,          null,         null,          null,         null,          null,         null,          'else_down_arrow'],
      [null,   null,          null,         null,          null,         null,          null,         null,          null,         null,          PORTAL],
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0], // action node
      [0, 1, 0, 0, 0, 0, 2], // conditional node
      [0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
    name: 7,
    image: "images/scroll7.jpg",
    nodeTypes: [PLAYER, ACTION, CONDITIONAL, ACTION, ACTION, ACTION, ACTION, ACTION, PORTAL],
    nodeCoords: [
      [36, 128],  // TODO : player node
      [119, 128], // TODO : action node
      [199, 128], // TODO : action node
      [282, 128], // TODO : action node
      [282, 128], // TODO : action node
      [481, 128], // TODO : portal node
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0, 2, 0, 0], // conditional node
      [0, 0, 0, 0, 1, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0, 0, 0], // action node
      [0, 0, 1, 0, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 1, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 1], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
    name: 8, // TODO : this is not working , need to fix first conditional path
    image: "images/scroll8.jpg",
    nodeTypes: [PLAYER, CONDITIONAL, ACTION, ACTION, ACTION, CONDITIONAL, PORTAL],
    nodeLayout: [
      [null,   'down_arrow',  'left_arrow repeat-x', 'left_arrow repeat-x',  'left_arrow repeat-x', 'left_arrow repeat-x',  'left_arrow repeat-x', 'left_arrow repeat-x',  'up_arrow', null,             null],
      [null,   'down_arrow',  'if_up_arrow',         'right_arrow',           [ACTION, 1],          'right_arrow',          'down_arrow',          null,                   'else_up_arrow',       null,             null],
      [PLAYER, 'right_arrow', [CONDITIONAL, 0],      null,                    null,                 null,                   [ACTION, 3],           'right_arrow',         [CONDITIONAL, 4],       'if_right_arrow', PORTAL],
      [null,   null,          'else_down_arrow',     'right_arrow',           [ACTION, 2],          'right_arrow',          'up_arrow',             null,                 null,                   null,             null],
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 2, 0, 0, 0], // conditional node
      [0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0], // action node
      [0, 2, 0, 0, 0, 0, 1], // conditional node
      [0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
    name: 9,
    image: "images/scroll9.jpg",
    nodeTypes: [PLAYER, CONDITIONAL, ACTION, ACTION, ACTION, ACTION, ACTION, ACTION, ACTION, PORTAL],
    nodeCoords: [
      [36, 128],  // TODO : player node
      [119, 128], // TODO : action node
      [199, 128], // TODO : action node
      [282, 128], // TODO : action node
      [282, 128], // TODO : action node
      [481, 128], // TODO : portal node
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // conditional node
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
    name: 10,
    image: "images/scroll10.jpg",
    nodeTypes: [PLAYER, ACTION, ACTION, ACTION, ACTION, CONDITIONAL, PORTAL],
    nodeCoords: [
      [36, 128],  // TODO : player node
      [119, 128], // TODO : action node
      [199, 128], // TODO : action node
      [282, 128], // TODO : action node
      [282, 128], // TODO : action node
      [481, 128], // TODO : portal node
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0], // action node
      [0, 1, 0, 0, 0, 0, 1], // conditional node
      [0, 0, 0, 0, 0, 0, 0], // portal node
    ]
},
{
    name: 11,
    image: "images/scroll11.jpg",
    nodeTypes: [PLAYER, ACTION, CONDITIONAL, ACTION, ACTION, ACTION, CONDITIONAL, PORTAL],
    nodeCoords: [
      [36, 128],  // TODO : player node
      [119, 128], // TODO : action node
      [199, 128], // TODO : action node
      [282, 128], // TODO : action node
      [282, 128], // TODO : action node
      [481, 128], // TODO : portal node
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 0, 0, 0], // conditional node
      [0, 0, 0, 1, 1, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 1, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 1, 0], // action node
      [0, 1, 0, 0, 0, 0, 0, 1], // conditional node
      [0, 0, 0, 0, 0, 0, 0, 0], // portal node
    ]
}
                 ,
{
    name: 12,
    image: "images/scroll12.jpg",
    nodeTypes: [PLAYER, CONDITIONAL, ACTION, ACTION, CONDITIONAL, CONDITIONAL, ACTION, ACTION, PORTAL],
    conditionals: [[2, 5], [8, 1], [6, 7]],
    nodeCoords: [
      [36, 128],  // TODO : player node
      [119, 128], // TODO : action node
      [199, 128], // TODO : action node
      [282, 128], // TODO : action node
      [282, 128], // TODO : action node
      [481, 128], // TODO : portal node
    ],
    nodeGraph: [
      [0, 1, 0, 0, 0, 0, 0, 0, 0], // player node
      [0, 0, 1, 0, 0, 1, 0, 0, 0], // conditional node
      [0, 0, 0, 1, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 1, 0, 0, 0, 0], // action node
      [0, 1, 0, 0, 0, 0, 0, 0, 1], // conditional node
      [0, 0, 0, 0, 0, 0, 1, 1, 0], // conditional node
      [0, 0, 0, 1, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 1, 0, 0, 0, 0, 0], // action node
      [0, 0, 0, 0, 0, 0, 0, 0, 0], // portal node
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
	scroll: scrollDef[1],
	setup: {
		startNode: 4,
		portalNode: 0,
		gemNodes: [1,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
	conditionals: []
	}
},
{
	level: 4,
	map: mapDef[4],
	scroll: scrollDef[2],
	setup: {
		startNode: 1,
		portalNode: 5,
		gemNodes: [3,4],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 5,
	map: mapDef[5],
	scroll: scrollDef[1],
	setup: {
		startNode: 2,
		portalNode: 5,
		gemNodes: [3],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 6,
	map: mapDef[6],
	scroll: scrollDef[2],
	setup: {
		startNode: 5,
		portalNode: 0,
		gemNodes: [1,4],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 7,
	map: mapDef[7],
	scroll: scrollDef[2],
	setup: {
		startNode: 0,
		portalNode: 8,
		gemNodes: [],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 8,
	map: mapDef[8],
	scroll: scrollDef[1],
	setup: {
		startNode: 7,
		portalNode: 4,
		gemNodes: [],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 9,
	map: mapDef[9],
	scroll: scrollDef[2],
	setup: {
		startNode: 9,
		portalNode: 4,
		gemNodes: [0,7],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 10,
	map: mapDef[10],
	scroll: scrollDef[3],
	setup: {
		startNode: 2,
		portalNode: 6,
		gemNodes: [],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 11,
	map: mapDef[1],
	scroll: scrollDef[1],
	setup: {
		startNode: 2,
		portalNode: 4,
		gemNodes: [1],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 12,
	map: mapDef[2],
	scroll: scrollDef[2],
	setup: {
		startNode: 5,
		portalNode: 0,
		gemNodes: [],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 13,
	map: mapDef[3],
	scroll: scrollDef[2],
	setup: {
		startNode: 5,
		portalNode: 0,
		gemNodes: [4,4],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 14,
	map: mapDef[4],
	scroll: scrollDef[2],
	setup: {
		startNode: 0,
		portalNode: 4,
		gemNodes: [4,4,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 15,
	map: mapDef[5],
	scroll: scrollDef[2],
	setup: {
		startNode: 4,
		portalNode: 0,
		gemNodes: [2,5],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
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
    conditionals: [6]
  }
},
{
	level: 17,
	map: mapDef[7],
	scroll: scrollDef[3],
	setup: {
		startNode: 3,
		portalNode: 5,
		gemNodes: [0,4],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 18,
	map: mapDef[8],
	scroll: scrollDef[3],
	setup: {
		startNode: 9,
		portalNode: 2,
		gemNodes: [11],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 3}
		],
		conditionals: []
	}
},
{
	level: 19,
	map: mapDef[9],
	scroll: scrollDef[3],
	setup: {
		startNode: 2,
		portalNode: 8,
		gemNodes: [0,4],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 3}
		],
		conditionals: []
	}
},
{
	level: 20,
	map: mapDef[10],
	scroll: scrollDef[5],
	setup: {
		startNode: 6,
		portalNode: 0,
		gemNodes: [2],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 3}
		],
		conditionals: []
	}
},
{
	level: 21,
	map: mapDef[1],
	scroll: scrollDef[2],
	setup: {
		startNode: 0,
		portalNode: 5,
		gemNodes: [1,1],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 22,
	map: mapDef[2],
	scroll: scrollDef[3],
	setup: {
		startNode: 5,
		portalNode: 0,
		gemNodes: [3,4],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 4},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 23,
	map: mapDef[3],
	scroll: scrollDef[4],
	setup: {
		startNode: 2,
		portalNode: 4,
		gemNodes: [1,3],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [2]
	}
},
{
	level: 24,
	map: mapDef[4],
	scroll: scrollDef[5],
	setup: {
		startNode: 0,
		portalNode: 5,
		gemNodes: [4,4,5,5],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 4},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 25,
	map: mapDef[5],
	scroll: scrollDef[4],
	setup: {
		startNode: 5,
		portalNode: 0,
		gemNodes: [],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [ORANGE]
	}
},
{
	level: 26,
	map: mapDef[6],
	scroll: scrollDef[5],
	setup: {
		startNode: 0,
		portalNode: 1,
		gemNodes: [2,3,3,4],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 3}
		],
		conditionals: []
	}
},
{
	level: 27,
	map: mapDef[7],
	scroll: scrollDef[4],
	setup: {
		startNode: 0,
		portalNode: 1,
		gemNodes: [2,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [2]
	}
},
{
	level: 28,
	map: mapDef[8],
	scroll: scrollDef[5],
	setup: {
		startNode: 9,
		portalNode: 4,
		gemNodes: [2],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 3}
		],
		conditionals: []
	}
},
{
	level: 29,
	map: mapDef[9],
	scroll: scrollDef[3],
	setup: {
		startNode: 5,
		portalNode: 8,
		gemNodes: [6,9],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 30,
	map: mapDef[10],
	scroll: scrollDef[6],
	setup: {
		startNode: 6,
		portalNode: 6,
		gemNodes: [3],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [ORANGE]
	}
},
{
	level: 31,
	map: mapDef[1],
	scroll: scrollDef[6],
	setup: {
		startNode: 2,
		portalNode: 4,
		gemNodes: [1,1,5],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [2]
	}
},
{
	level: 32,
	map: mapDef[2],
	scroll: scrollDef[3],
	setup: {
		startNode: 4,
		portalNode: 5,
		gemNodes: [0,1,5,5],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 33,
	map: mapDef[3],
	scroll: scrollDef[4],
	setup: {
		startNode: 1,
		portalNode: 4,
		gemNodes: [3,3,3],
		tokens: [
			{token: RUN , count: 1}, // TODO : double-check this value
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [ORANGE]
	}
},
{
	level: 34,
	map: mapDef[4],
	scroll: scrollDef[7],
	setup: {
		startNode: 3,
		portalNode: 4,
		gemNodes: [1,4,4],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 3}
		],
    		conditionals: [PURPLE]
	}
},
{
	level: 35,
	map: mapDef[5],
	scroll: scrollDef[8],
	setup: {
		startNode: 4,
		portalNode: 0,
		gemNodes: [2,5,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [2,3]
	}
},
{
	level: 36,
	map: mapDef[6],
	scroll: scrollDef[7],
	setup: {
		startNode: 2,
		portalNode: 1,
		gemNodes: [0,3,3],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 1}
		],
		conditionals: [ORANGE]
	}
},
{
	level: 37,
	map: mapDef[7],
	scroll: scrollDef[6],
	setup: {
		startNode: 1,
		portalNode: 5,
		gemNodes: [3,8],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [1]
	}
},
{
	level: 38,
	map: mapDef[8],
	scroll: scrollDef[6],
	setup: {
		startNode: 8,
		portalNode: 2,
		gemNodes: [1],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [ORANGE]
	}
},
{
	level: 39,
	map: mapDef[9],
	scroll: scrollDef[5],
	setup: {
		startNode: 3,
		portalNode: 0,
		gemNodes: [2,4,9],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: []
	}
},
{
	level: 40,
	map: mapDef[10],
	scroll: scrollDef[9],
	setup: {
		startNode: 8,
		portalNode: 6,
		gemNodes: [2,4,9,11],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 3}
		],
		conditionals: [PURPLE]
	}
},
{
	level: 41,
	map: mapDef[1],
	scroll: scrollDef[8],
	setup: {
		startNode: 1,
		portalNode: 0,
		gemNodes: [2,3,4],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [ORANGE,PURPLE]
	}
},
{
	level: 42,
	map: mapDef[2],
	scroll: scrollDef[10],
	setup: {
		startNode: 0,
		portalNode: 2,
		gemNodes: [3,3,3,4,4,4],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [PURPLE]
	}
},
{
	level: 43,
	map: mapDef[3],
	scroll: scrollDef[8],
	setup: {
		startNode: 5,
		portalNode: 3,
		gemNodes: [0,1,2,3,4],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [1,5]
	}
},
{
	level: 44,
	map: mapDef[4],
	scroll: scrollDef[6],
	setup: {
		startNode: 2,
		portalNode: 3,
		gemNodes: [0,4,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: [1]
	}
},
{
	level: 45,
	map: mapDef[5],
	scroll: scrollDef[11],
	setup: {
		startNode: 2,
		portalNode: 3,
		gemNodes: [1,1,1],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [3,PURPLE]
	}
},
{
	level: 46,
	map: mapDef[6],
	scroll: scrollDef[12],
	setup: {
		startNode: 3,
		portalNode: 4,
		gemNodes: [0,1,1,1,4],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [PURPLE,2,5]
	}
},
{
	level: 47,
	map: mapDef[7],
	scroll: scrollDef[7],
	setup: {
		startNode: 0,
		portalNode: 8,
		gemNodes: [1,6],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: [1]
	}
},
{
	level: 48,
	map: mapDef[8],
	scroll: scrollDef[10],
	setup: {
		startNode: 1,
		portalNode: 3,
		gemNodes: [10],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: [2]
	}
},
{
		level: 49,
	map: mapDef[9],
	scroll: scrollDef[5],
	setup: {
		startNode: 1,
		portalNode: 8,
		gemNodes: [2,3,6],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 4},
			{token: JUMP , count: 1}
		],
		conditonals: []
	}
},
{
	level: 50,
	map: mapDef[10],
	scroll: scrollDef[7],
	setup: {
		startNode: 8,
		portalNode: 11,
		gemNodes: [4,4,5,11,11],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 2}
		],
		conditionals: []
	}
},
{
	level: 51,
	map: mapDef[1],
	scroll: scrollDef[12],
	setup: {
		startNode: 4,
		portalNode: 0,
		gemNodes: [0,5,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count:1},
			{token: JUMP , count: 2}
		],
		conditionals: [2,3,ORANGE]
	}
},
{
	level: 52,
	map: mapDef[2],
	scroll: scrollDef[7],
	setup: {
		startNode: 5,
		portalNode: 3,
		gemNodes: [0,1,1,2,4],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 1}
		],
		conditionals: [ORANGE]
	}
},
{
	level: 53,
	map: mapDef[3],
	scroll: scrollDef[12],
	setup: {
		startNode: 4,
		portalNode: 4,
		gemNodes: [0,0,2,2],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: [PURPLE,ORANGE,4]
	}
},
{
	level: 54,
	map: mapDef[4],
	scroll: scrollDef[11],
	setup: {
		startNode: 3,
		portalNode: 0,
		gemNodes: [1,4,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 1}
		],
		conditionals: [2,3]
	}
},
{
	level: 55,
	map: mapDef[5],
	scroll: scrollDef[11],
	setup: {
		startNode: 0,
		portalNode: 5,
		gemNodes: [1,1,4,5],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: [1,4]
	}
},
{
	level: 56,
	map: mapDef[6],
	scroll: scrollDef[9],
	setup: {
		startNode: 4,
		portalNode: 1,
		gemNodes: [1,1,2,2,3,3],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 1}
		],
		conditionals: [5]
	}
},
{
	level: 57,
	map: mapDef[7],
	scroll: scrollDef[11],
	setup: {
		startNode: 0,
		portalNode: 0,
		gemNodes: [2,3,3,4,5,7],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: [ORANGE,4]
	}
},
{
	level: 58,
	map: mapDef[8],
	scroll: scrollDef[9],
	setup: {
		startNode: 5,
		portalNode: 8,
		gemNodes: [0,9,10],
		tokens: [
			{token: RUN , count: 2},
			{token: SLIDE , count: 3},
			{token: JUMP , count: 2}
		],
		conditionals: [ORANGE]
	}
},
{
	level: 59,
	map: mapDef[9],
	scroll: scrollDef[11],
	setup: {
		startNode: 0,
		portalNode: 1,
		gemNodes: [2,5,7,7,7],
		tokens: [
			{token: RUN , count: 1},
			{token: SLIDE , count: 1},
			{token: JUMP , count: 2}
		],
		conditionals: [2,ORANGE]
	}
},
{
	level: 60,
	map: mapDef[10],
	scroll: scrollDef[9],
	setup: {
		startNode: 8,
		portalNode: 9,
		gemNodes: [2,9],
		tokens: [
			{token: RUN , count: 3},
			{token: SLIDE , count: 2},
			{token: JUMP , count: 2}
		],
		conditionals: [2]
	}
}
];
