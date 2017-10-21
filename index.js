const lex = require('./lex.js');
const args = require('args');
const _ = require('lodash');

const nearley = require("nearley");
const grammar = require("./eql.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));


args
  .option('test', 'The text to run the command on')

const flags = args.parse(process.argv)


function run(){

  var text = 'supplier facilities ="aa"';// ~ (name= "facility-name")';

  // console.log('output:', text);
  // lex.reset(text)
  // var token;
  // var tokens = [];
  // while(token=lex.next()){
  //   tokens.push(token);
  //
  // }

  parser.feed(text);

  // console.log("results", parser.results);

  _.forEach(parser.results, (result, i)=> console.log(i, result))

}




run();
