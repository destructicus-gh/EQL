const moo = require('moo')

let lexer = moo.compile({
      WS:      /[ \t]+/,
      comment: /\/\/.*?$/,
      number:  /0|[1-9][0-9]*\.?[0-9]*/,
      identifier:
      {
        match: /[a-zA-Z]+/,
        keywords: {
          'and': 'AND',
          'or': 'OR'
        }
      },
      operator:{
        match: /[~=!]/,
        keywords: {
          contains: '~',
          equal: '=',
          not: '!'
        }
      },
      string: /".*?"/,
      lparen:  '(',
      rparen:  ')',

      NL:      { match: /\n/, lineBreaks: true },
    })

module.exports = lexer;
