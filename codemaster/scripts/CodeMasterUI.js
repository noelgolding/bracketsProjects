/* Deliberatly exposing all of them in global name space */
// var app = new Vue({
//   el: '#codemaster-ui',
//   data: {
//     message: 'Hello Vue!'
//   }
// })


// var h = React.createElement;
// var AvailableTokens =  React.createClass({
//   render: function(){
//     var lis = this.props.tokens.map(function(token, idx){
//       return h('li',
//       {
//         key: idx,
//         className: token.className,
//         "blah": "blar",
//
//       },
//       h('a', {href:"#", click: (e) => {
//           console.log("dblclick", this);
//         }}, token.command.key.replace(/;/g,'') ) )
//     })
//     return (
//       h('ul', null, lis)
//     )
//   }
// })
//
// var CodeMasterUI =  React.createClass({
//   render: function(){
//     return (
//       h('div', null,
//         h( AvailableTokens, { tokens:[ {className:"foo", command: {key:"fooKey"} } ] } )
//        )
//     )
//   }
// })
//
//
// ReactDOM.render(React.createElement(CodeMasterUI), document.getElementById('codemaster-ui'))
