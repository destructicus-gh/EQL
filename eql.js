// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

const lexer = require('./lex.js')
const _ = require('lodash');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "query", "symbols": ["comparison"]},
    {"name": "query", "symbols": ["substatement"], "postprocess": 
        ([comparison, statement])=>  comparison || statement
        },
    {"name": "comparison", "symbols": ["reference", "_", "operator", "_", "string"], "postprocess": 
          ([reference, _, operator, __, string])=> {
            return {
              ref:reference, op:operator, st:string
            };
        }},
    {"name": "comparison", "symbols": ["reference", "_", "operator", "_", "substatement"]},
    {"name": "substatement", "symbols": [(lexer.has("lparen") ? {type: "lparen"} : lparen), "operation", (lexer.has("rparen") ? {type: "rparen"} : rparen)]},
    {"name": "operation", "symbols": ["reference", "_", "operator", "_", "reference"], "postprocess": function(data){
          return {
            type: 'operation',
            value: data[0] + data[2] + data[4]
          };
        }},
    {"name": "reference$ebnf$1", "symbols": []},
    {"name": "reference$ebnf$1$subexpression$1", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_"]},
    {"name": "reference$ebnf$1", "symbols": ["reference$ebnf$1", "reference$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "reference", "symbols": ["reference$ebnf$1", (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": function(data){
          if (data[0].length>0){
            console.log('returning', data[0][0][0].text, data[1].text);
            return data[0][0][0].text + '.' + data[1].text
          }
          else {
            console.log('base', data[1].text)
            return data[1].text;
          }
        
        }},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": 
        (data) =>  data[0].text
        },
    {"name": "operator$ebnf$1", "symbols": [(lexer.has("not") ? {type: "not"} : not)], "postprocess": id},
    {"name": "operator$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "operator", "symbols": ["operator$ebnf$1", (lexer.has("equal") ? {type: "equal"} : equal)], "postprocess": 
          (data) => {
            return (data[0] ? data[0].text:'') + data[1].text;
        }},
    {"name": "join$subexpression$1", "symbols": [(lexer.has("and") ? {type: "and"} : and)]},
    {"name": "join$subexpression$1", "symbols": [(lexer.has("or") ? {type: "or"} : or)]},
    {"name": "join", "symbols": ["join$subexpression$1"]},
    {"name": "_$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "query"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
