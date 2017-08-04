/*** ACTIONS ***/
const LOAD_LEVEL = 'LOAD_LEVEL';
const PLACE_TOKEN = 'PLACE_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

function createReduxAction(type, data){
  return({
    type: type,
    data: data
  })
}

/*** REDUCERS ***/
const initialState = {
  level: null,
  availableTokens: []
}

// TODO revisit reducers to split and combine reducers
function codeMasterReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEVEL:
       return Object.assign({}, state, {
         level: action.data.level,
         availableTokens: action.data.availableTokens
       })
   case PLACE_TOKEN:
      return Object.assign({}, state, {
        availableTokens: action.data.availableTokens
      })
  case REMOVE_TOKEN:
     return Object.assign({}, state, {
       availableTokens: action.data.availableTokens
     })
    default:
      return state;
  }
}

/*** STORE ***/
class CodeMasterReduxStore {
  /**
    The Store is the object that brings them together. The store has the following responsibilities:
      Holds application state;
      Allows access to state via getState();
      Allows state to be updated via dispatch(action);
      Registers listeners via subscribe(listener);
      Handles unregistering of listeners via the function returned by subscribe(listener).
  */
  constructor(reducer, initialState=initialState){
    this.reducer = reducer;
    this.state = [initialState];
    this.listeners = [];
  }

  getState(){
    return this.state[this.state.length-1];
  }

  dispatch(action){
    this.state.push(this.reducer(this.getState(), action));
    this.listeners.forEach(
      l => l( this.getState() )
    );
  }

  subscribe(listener){
    this.listeners.push(listener);
  }

  unsubscribe(listener){
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}

function createCodeMasterReduxStore(){
  return new CodeMasterReduxStore(codeMasterReducer, initialState);
}
