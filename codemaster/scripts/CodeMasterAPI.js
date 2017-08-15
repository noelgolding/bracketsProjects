/*** ACTIONS ***/
const LOAD_LEVEL = 'LOAD_LEVEL';
const PLACE_TOKEN = 'PLACE_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

function Scroll(settings){
    this.settings = settings;
    this.plan = Array(settings.nodeTypes.length-2).fill(null);

    this.addToken = function(token, position) {
        try {
          this.validateTokenAtPosition(token, position+1, (token) => this.plan[position] = token);
        } catch (e) {
          console.error(e);
          throw Error(`Failed to add ${token.label} token to the scroll.`);
        }
    }

    this.removeTokenAtPosition = function(position){
      this.plan[position] = null;
    }

    this.validatePlan = function() {
      this.plan.forEach((t,i) => {
        this.validateTokenAtPosition(t, i+1);
      });
      return true;
    }

    this.validateTokenAtPosition = function(token, position, callBack){
      console.log("token", token, "position", position, "callback", callBack);
      if (this.settings.nodeTypes[position] === PORTAL) {
          throw new Error(`You have reached the end of the scroll, no more tokens can be added.`);
      }

      if (token === null) {
        return;
      }

      if (!token.tokenType){
        throw new Error(`Unexpected instruction [${token}] at position ${position}.`);
      }

      if (token.tokenType === this.settings.nodeTypes[position]) {
        if (token.tokenType === CONDITIONAL) {
          let T = this.settings.nodeGraph[position].indexOf(1);
          let F = this.settings.nodeGraph[position].indexOf(2);
          token.command.exec = () => nextStep (token.command.test) ? T : F;

          T = (this.settings.nodeTypes[T] === PORTAL) ? 'usePortal()' : `gotoLine( ${T} )`;
          F = (this.settings.nodeTypes[F] === PORTAL) ? 'usePortal()' : `gotoLine( ${F} )`;

          //token.label += ` goto(${T}) : goto(${F})`;
          token.command.key = token.command.key.replace(/\?/g,` ${T}; else ${F}`);
        }
        if (callBack) {
          callBack(token, position);
        }
      } else {
          throw new Error(`Invalid token [${token.label}] for scroll position ${position}.  Expected ${this.settings.nodeTypes[position].label} but was ${token.tokenType.label}`);
      }
    }
}

function GameMasterAPI(){
  let nextStep;
  let currentScroll;
  let currentLevel;
  let playerPosition;
  let portalPosition;
  let gemPositions;
  let gems;

  Object.defineProperties( this,
    {
      "CurrentLevel": {
        "get": () => {return currentLevel;}
      },
      "level": {
        "get": () => { return currentLevel.level; }
      },
      "mapImage": {
        "get": () => { return currentLevel.map.image }
      },
      "playerPosition": {
        "get": () => { return playerPosition; }
      },
      "portalPosition": {
        "get": () => { return portalPosition; }
      },
      "gemPositions": {
        "get": () => { return gemPositions; }
      },
      "gemsCollected": {
        "get": () => { return gems; }
      },
      "troll": {
        "get": () => { return currentLevel.map.trolls[playerPosition] }
      },
      "scroll": {
        "get" : () => { return (currentScroll.settings.nodeLayout) ? [...currentScroll.settings.nodeLayout] : [[...currentScroll.settings.nodeTypes]] }
      },
      "program": {
        "get" : () => { return [...currentScroll.plan] }
      },
      "availableTokens": {
        "get": () => {
          // TODO FIXME : need a better way to track used vs. available tokens
          let availableTokens = [];
          for (let i = 0; i < currentLevel.setup.tokens.length; i++) {
            let token = currentLevel.setup.tokens[i].token
            let avail = currentLevel.setup.tokens[i].count - this.program.filter((t) => t === token).length
            for (let j = 0; j < avail; j++){
              availableTokens.push(token);
            }
          }

          let filteredProgram = this.program.filter(t => t && t.tokenType === CONDITIONAL);
          currentLevel.setup.conditionals.forEach(c => {
            let token = createConditionalToken(c);
            let available = true;
            for (let i = 0; i < filteredProgram.length; i++) {
              if (filteredProgram[i].label === token.label) {
                available = false;
                break;
              }
            }
            if (available) {
              availableTokens.push(token);
            }

          });
          return availableTokens;
        }
      }
    }
  );

  this.removeTokenAtPosition = function(position) {
    currentScroll.removeTokenAtPosition(position);
    this.dispatch(REMOVE_TOKEN);
  }

  this.subscribe = function(action, handler){
    console.log("subscribe", action, handler);
    if (this.subscribers === undefined) {
      this.subscribers = {};
    }
    if (this.subscribers[action] === undefined) {
      this.subscribers[action] = [];
    }
    this.subscribers[action].push(handler);
    console.log("subscribe", action, handler);

  }

  this.dispatch = function(action) {
    console.log("dispath", action);
    if (this.subscribers === undefined) {
      this.subscribers = {};
    }
    let registered = this.subscribers[action] || [];
    console.log("registered handlers", registered);
    registered.forEach((h) => h());
  }

  this.loadLevel = function(n){
      logInfo("Loading level " + n + " ... ");
      currentLevel = level[n];
      currentScroll = new Scroll(currentLevel.scroll);

      portalPosition = currentLevel.setup.portalNode;


      this.resetExecutionPlan();

      this.dispatch(LOAD_LEVEL);
  }

  this.resetExecutionPlan = function() {
      playerPosition = currentLevel.setup.startNode;
      gemPositions = currentLevel.setup.gemNodes.slice();
      gems = 0;
      nextStep = 0;
  }

  // TODO : implement undo - step, addToken
  // TODO : implement removeToken(index)
  // TODO : implement/expose reset
  // TODO : implement clear: return tokens to available pool, reset execution path.

  this.executeNextStep = function() {
    let gemsCollected = this.gemsCollected;
    let ORANGE_TROLL = this.troll === ORANGE;
    let PURPLE_TROLL = this.troll === PURPLE;
    function usePortal() {
      nextStep = currentScroll.plan.length;
    }
    function gotoLine(i) {
      nextStep = i - 1;
    }
    console.error("NextStep:", nextStep);
    if (nextStep < currentScroll.plan.length) {
      console.error("playerPosition", playerPosition, "execCommand", currentScroll.plan[nextStep].command.key);
      eval(currentScroll.plan[nextStep].command.key);
      // check if should collect gems
      let gemIndex = gemPositions.indexOf(playerPosition);
      if (gemIndex > -1) {
        console.log("Collecting a gem at", playerPosition, "gemIndex", gemIndex, gemPositions);
        gems+=1;
        gemPositions[gemIndex] = null;
        gemsCollected
      }
      console.log("gems collected", gems, "gems remaining", gemPositions);
    } else {
      console.error("check Did Win?");
      didWin();
    }
  }

  let maxSteps = 99;
  this.executePlan = function () {
    this.resetExecutionPlan();
    if (currentScroll.validatePlan()) {
      let stepsTaken = 0;
      while(nextStep < currentScroll.plan.length) {
          if (stepsTaken++ > maxSteps) {
            throw new Error("Too many steps.");
          }
          this.executeNextStep();
      }
      this.executeNextStep(); // last step should be to the portal
    }
  }

  var uiUpdated = true;
  function wait(cb){
    if (uiUpdated) {
      this.executeNextStep();
      uiUpdated = false;
    } else {
      console.log('waiting');
      window.requestAnimattionFrame(wait);
    }
  }

  var didWin = function(){
    console.log(currentScroll);
    if (nextStep >= currentScroll.plan.length) {
      if(availableTokens.length > 0){
        throw new Error("You have an incomplete program.");
      }
      if (playerPosition !== portalPosition) {
        throw new Error("You need to end at the portal.");
      }
      if (gems !== gemPositions.length) {
        throw new Error("You need to collect all the gems.");
      }
      // if you get here you have won!
      console.error("You did it!");
      return true;
    }
    return false;
  }

  function execCommand(action) {
      console.log(action);

      var nextPlayerPosition = -1;
      for (let i = 0; i < currentLevel.map.nodeGraph[playerPosition].length; i++) {
        let node = currentLevel.map.nodeGraph[playerPosition][i];
        if (node == action || (node instanceof Array && node.indexOf(action) > -1 )) {
          nextPlayerPosition = i;
          break;
        }
      }

      // var nextPlayerPosition = currentLevel.map.nodeGraph[playerPosition].indexOf(action);
      if (nextPlayerPosition === -1) {
          throw new Error(`You cannot ${action.label} from ${playerPosition}. :(`);
      }
      logSuccess(`You can ${action.label} from ${playerPosition} to ${nextPlayerPosition}!`);
      playerPosition = nextPlayerPosition;
      nextStep++;
  }

  this.placeToken = function (command, position=undefined) {
    // if position is not defined, find the next available slot in the program
    if (position === undefined) {
      position = this.program.indexOf(null);
    }
    if (position === -1) {
      throw new Error("You're program does not have space for any more commands.");
    }

    let c = command.replace(/ +/g, "").replace(/\)else/g, ");else").toLowerCase();
    //console.log("command to locate:", command);
    for (let token of this.availableTokens) {
      //console.log("available token: ", token.command);
      if (token.command === undefined) {
        continue;
      }
      let t = token.command.key.replace(/ +/g, "").toLowerCase();
      //console.log("token command: ", token.command.key, t, t === c);

      if (t === c) {
        currentScroll.addToken(token, position);
        this.dispatch(PLACE_TOKEN);
        return token;
      }
    }
    throw new Error(`No token available for the command: ${command}`);
  }

  function logInfo(msg){
    logStatus(msg, "info");
  }
  function logErr(msg){
    logStatus(msg, "err");
  }
  function logSuccess(msg){
    logStatus(msg, "success");
  }
  function logStatus(msg, c){
//      statusBar.className = c;
//      statusBar.innerText = msg;
    console.error(`${c}: ${msg}`);
  }
}
