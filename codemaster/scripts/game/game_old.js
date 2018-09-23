var gameAPI;
var dragRemoveToken;
// var store = createCodeMasterReduxStore();
function main(){
  gameAPI = new GameMasterAPI();
  gameAPI.subscribe(LOAD_LEVEL, initLevel);
  gameAPI.subscribe(LOAD_LEVEL, renderScroll);
  gameAPI.subscribe(PLACE_TOKEN, renderAvailableTokens);
  gameAPI.subscribe(PLACE_TOKEN, renderProgramCode);
  gameAPI.subscribe(PLACE_TOKEN, renderScroll);
  gameAPI.subscribe(REMOVE_TOKEN, renderAvailableTokens);
  gameAPI.subscribe(REMOVE_TOKEN, renderProgramCode);
  gameAPI.subscribe(REMOVE_TOKEN, renderScroll);

  const prevLevel = el('prevLevel');
  prevLevel.disabled = true;
  prevLevel.onclick = () => gameAPI.loadLevel(gameAPI.level-1);
  const selectLevel = el('selectLevel');
  selectLevel.onchange = (e) => gameAPI.loadLevel(e.target.value);
  const nextLevel = el('nextLevel');
  nextLevel.disabled = true;
  nextLevel.onclick = () => gameAPI.loadLevel(gameAPI.level+1);

  const gameCanvas = el('game-canvas');

  const availTokensUI = el('availableTokens');
  availTokensUI.ondrop = (e) => onRemoveTokenDrop(e);

  const programCodeUI = el('game-console');
  const scrollUI = el('scrollUI');
  // scrollUI.style.backgroundColor = "red";
  scrollUI.ondragenter = (e) => onTokenEnter(e);
  scrollUI.ondragover = () => {return false};
  scrollUI.ondragleave = (e) => onTokenLeave(e);
  scrollUI.ondrop = (e) => onTokenDrop(e);

  programCodeUI.addEventListener('keyup', handleManualCodeInput);


  // load level1 by default
  gameAPI.loadLevel(1);
  function initLevel() {
    prevLevel.disabled = (!gameAPI.level || gameAPI.level <= 1);
    nextLevel.disabled = (!gameAPI.level || gameAPI.level == 60);
    selectLevel.selectedIndex = gameAPI.level-1;
    renderMap();
    renderAvailableTokens();
    renderProgramCode();
  }

  function renderMap(){
    gameCanvas.src = gameAPI.mapImage;
    gameCanvas.alt = 'some text';
  }

  function renderAvailableTokens(){
    availTokensUI.innerHTML = `<h3>map: ${gameAPI.CurrentLevel.map.name} scroll: ${gameAPI.CurrentLevel.scroll.name}</h3>`;
    let ul = createEl('ul');
    gameAPI.availableTokens.forEach((t) => {
      let li = createEl('li');
      li.setAttribute('id', `action_${window.performance.now()}`);
      li.setAttribute('token', JSON.stringify(t));
      li.className = t.className;
      li.ondblclick = () => {gameAPI.placeToken(t.command.key)};
      li.draggable = true;
      li.ondragstart = dragToken;
      // li.ondragend = droppedToken;
      li.innerText = t.command.key.replace(/;/g,"");
      ul.appendChild(li)
    });
    availTokensUI.appendChild(ul);
  }

  function renderProgramCode(){
    programCodeUI.innerHTML = "";
    let ol = createEl('ol');
    gameAPI.program.forEach((i, x) => {
      let li = createEl('li');
      let div = createEl('div');
      div.innerText = (i !== null) ? i.command.key.replace(/;/g, "") : "";
      li.appendChild(div);
      // li.innerHTML = `<div contenteditable="true" tabindex="x" onKeyUp="(e) => {console.log(e)}">${(i !== null) ? i.command.key.replace(/;/g, "") : ""}</div>`;
      ol.appendChild(li)
    });
    programCodeUI.appendChild(ol);
  }

  function renderScroll(){
    let draggableIds = [];

    function getTokenPlaceHolderRowData(i){
      let innerHTML = "";
      for (let j = 0; j < gameAPI.scroll[i].length; j++) {
        let ij = gameAPI.scroll[i][j];
        let className = "";
        let idx = NaN;
        let attrs = "";
        let text = "";

        if (ij) {
          if(ij instanceof Array) {
            className = ij[0].label;
            idx = ij[1];
          } else if (ij.label) {
            className = ij.label;
            text = (className.startsWith('P')) ? className : "";
          } else {
            className = ij;
          }
        }
        let id = (isNaN(idx)) ? "" : `id='${idx}_program_code'`;
        if (gameAPI.program[idx]) {

          attrs = `
            style='background: url("${gameAPI.program[idx].tokenIcon}") center no-repeat'
            token='${JSON.stringify(gameAPI.program[idx])}'
            draggable = 'true'
          `;
          draggableIds.push(`${idx}_program_code`);
        }
        innerHTML += `<td ${id} class="${className}" ${attrs}>${text}</td>`;
      }
      return innerHTML;
    }

    let rows = "";
    if (gameAPI.scroll) {
      let idx = 0;
      for (let i = 0; i < gameAPI.scroll.length; i++){
        rows += `
          <tr>
            ${getTokenPlaceHolderRowData(i)}
          </tr>
        `;
      }
    } else {
      rows = `
        <tr>
          <td><h1>No scroll available</h1></td>
        </tr>
      `;
    }

    scrollUI.innerHTML = `
      <table border=0 width="100%">
        ${rows}
      </table>
    `;

    // TODO add draghandlers
    draggableIds.forEach(id => {
      let e = el(id);
      e.ondragstart = dragRemoveToken;
      e.ondrop = droppedToken;
      e.ondblclick = () => {gameAPI.removeTokenAtPosition(parseInt(id));}
    });
  }


  var droppedIn;
  function dragToken(event){
    console.log('dragToken', event);
    console.log(`Dragging the ${event.target.getAttribute('id')}`);
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('token', event.target.getAttribute('token'));
  }

  dragRemoveToken = function(event){
    console.log('dragRemoveToken', event);
    console.log(`Dragging the ${event.target.getAttribute('id')}`);
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('token', event.target.getAttribute('token'));
    event.dataTransfer.setData('id', event.target.getAttribute('id'));
    // gameAPI.removeTokenAtPosition(parseInt(event.target.getAttribute('id')));
  }

  function onTokenEnter(e){
    // console.log('onTokenEnter', e);
    // var token = JSON.parse(e.dataTransfer.getData('text'));
    // console.log('data', e.dataTransfer.getData('text'));//, event.target.getAttribute('id'));
    // if (token && token.tokenType.label === e.target.className) {
    //   e.target.style.backgroundColor = "blue";
    // }
  }

  function onTokenLeave(e){
    // console.log('onTokenLeave', e);
    // var token = JSON.parse(e.dataTransfer.getData('text'));
    // if (token && token.tokenType.label === e.target.className) {
    //   e.target.style.backgroundColor = "";
    // }
  }

  function onTokenDrop(e){
    e.preventDefault();
    console.log('onTokenDrop', e);
    console.log(e.target);

    var token = JSON.parse(e.dataTransfer.getData('token'));
    console.log(token);

    // test is this is a valid drop zone for this token.
    if (token && !e.target.attributes.token && token.tokenType.label === e.target.className) {
      console.log('success');
      // e.target.className += ` token.className`;
      // let target = el(e.target.id);
      // target.setAttribute('token', token);
      // apply the appropriate slot to the placeToken call
      if (e.dataTransfer.getData('id')) {
        console.log('have ID to remove');
        gameAPI.removeTokenAtPosition(parseInt(e.dataTransfer.getData('id')));
      }
      gameAPI.placeToken(token.command.key, parseInt(e.target.id));
    } else {
      console.log('failure');
    }
  }

  function onRemoveTokenDrop(e){
    console.log('onRemoveTokenDrop', e);
    renderAvailableTokens();
    renderProgramCode();
    renderScroll();
  }

  function droppedToken(e){
    alert();
    console.log('droppedToken', e);
  }

  function handleManualCodeInput(e){
    if(e.code === "Enter") {
      // trigger placeTokens.
    }
  }







  function update(){
    // What to do here?
    // handle input.
  }

  function render(){
    // update ui components of state change?
    // renderAvailableTokens();
  }

  function gameLoop(){
    update();
    render();
    window.requestAnimationFrame(gameLoop);
  }
  // scaleCanvas(gameCanvas);
  // console.log("Let the games begin!");
  // loadLevel(3);
  // window.addEventListener('resize', () => scaleCanvas(gameCanvas), false);
  // window.addEventListener('keydown', onKeyDown);
};
window.addEventListener('load', main, false);
