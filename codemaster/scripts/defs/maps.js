export var mapDef = [null,
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
  trolls: [PURPLE, 0, PURPLE, 0, ORANGE, 0],
  nodeCoords: [
    [181, 41],  // 0
    [53, 172],  // 1
    [181, 172], // 2
    [292 , 172], // 3
    [439, 172], // 4
    [292, 308], // 5
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
4, 5,
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
}
];
