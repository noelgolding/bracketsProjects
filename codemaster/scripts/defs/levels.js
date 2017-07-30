var levels = [ null,
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
3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
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
