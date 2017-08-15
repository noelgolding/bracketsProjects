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
    conditionals: ["gems == 6"]
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
		conditionals: ["gems == 2"]
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
		conditionals: ["troll == ORANGE"]
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
		conditionals: ["gems == 2"]
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
		conditionals: ["troll == ORANGE"]
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
		conditionals: ["gems == 2"]
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
			{token: RUN , count: },
			{token: SLIDE , count: 1},
			{token: JUMP , count: 1}
		],
		conditionals: ["troll == ORANGE"]
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
		conditionals: ["troll == PURPLE"]
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
		conditionals: ["gems == 2","gems == 3"]
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
		conditionals: ["troll == ORANGE"]
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
		conditionals: ["gems == 1"]
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
		conditionals: ["troll == ORANGE"]
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
		conditionals: ["troll == PURPLE"]
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
		conditionals: ["troll == ORANGE","troll == PURPLE"]
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
		conditionals: ["troll == PURPLE"]
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
		conditionals: ["gems == 1","gems == 5"]
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
		conditionals: ["gems == 1"]
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
		conditionals: ["gems == 3","troll == PURPLE"]
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
		conditionals: ["troll == PURPLE","gems == 2","gems == 5"]
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
		conditionals: ["gems == one"]
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
		conditionals: ["gems == 2"]
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
	map: mapDef:[10],
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
	map: mapDef:[1],
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
		conditionals: ["gems == 2","gems == 3","troll == ORANGE"]
	}
},
{
	level: 52,
	map: mapDef:[2],
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
		conditionals: ["troll == ORANGE"]
	}
},
{
	level: 53,
	map: mapDef:[3],
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
		conditionals: ["troll == PURPLE","troll == ORANGE","gems == 4"]
	}
},
{
	level: 54,
	map: mapDef:[4],
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
		conditionals: ["gems == 2","gems == 3"]
	}
},
{
	level: 55,
	map: mapDef:[5],
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
		conditionals: ["gems == 1","gems == 4"]
	}
},
{
	level: 56,
	map: mapDef:[6],
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
		conditionals: ["gems == 5"]
	}
},
{
	level: 57,
	map: mapDef:[7],
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
		conditionals: ["troll == ORANGE","gem == 4"]
	}
},
{
	level: 58,
	map: mapDef:[8],
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
		conditionals: ["troll == ORANGE"]
	}
},
{
	level: 59,
	map: mapDef:[9],
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
		conditionals: ["gems == 2","troll == ORANGE"]
	}
},
{
	level: 60,
	map: mapDef:[10],
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
		conditionals: ["gems == 2"]
	}
},
];
