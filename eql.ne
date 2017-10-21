@{%
const lexer = require('./lex.js')
const _ = require('lodash');
%}

@lexer lexer
query -> comparison | substatement {%
  ([comparison, statement])=>  comparison || statement
%}
comparison -> reference _ operator _ string {%
  ([reference, _, operator, __, string])=> {
    return {
      ref:reference, op:operator, st:string
    };
}%}
comparison -> reference _ operator _ substatement
substatement -> %lparen operation %rparen


operation -> reference _ operator _ reference {%function(data){
  return {
    type: 'operation',
    value: data[0] + data[2] + data[4]
  };
}%}


reference -> (%identifier _):* %identifier {%function(data){
  if (data[0].length>0){
    console.log('returning', data[0][0][0].text, data[1].text);
    return data[0][0][0].text + '.' + data[1].text
  }
  else {
    console.log('base', data[1].text)
    return data[1].text;
  }

}%}
string -> %string {%
  (data) =>  data[0].text
  %}

operator -> %not:? %equal {%
  (data) => {
    return (data[0] ? data[0].text:'') + data[1].text;
}%}
join -> (%and | %or)
_ -> %WS:?
__ -> %WS:+
