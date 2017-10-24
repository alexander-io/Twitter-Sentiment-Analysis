let analyze = require('Sentimental').analyze,
  positivity = require('Sentimental').positivity,
  negativity = require('Sentimental').negativity


var btc_json = require("./10kbtc.json")

let lst_of_text_nodes = []


// volume
// date
// sentiment

// solvent

let create_solvent = function(date, sentiment, volume) {
  return {
    date : date,
    sentiment : sentiment,
    volume : volume
  }
}

class Solvent {
  constructor (date, sentiment, volume) {
    this.date = date
    this.sentiment = sentiment
    this.volume = volume
  }
}

class TweetNode {
  constructor(date, sentiment) {
    this.date = date
    this.sentiment = sentiment
  }
}

for (x in btc_json) {
  console.log(btc_json[x]);
}

// for all values in the list
// for (let x = 0; x < btc_json.length; ++x) {
//   lst_of_text_nodes.push(btc_json[x].text)
// }


let main = function() {
  let max = 0
  let running_total = 0
  // for all elems in lst_of_text_nodes
  for (let x = 0; x < lst_of_text_nodes.length; x++) {
    // call analyze function, pass in the text node
    let result_obj = analyze(lst_of_text_nodes[x])
    // extract the score
    //I like you so much
    running_total += result_obj.score
    result_obj.score < max ? max = result_obj.score : null
    // console.log(result_obj);
    console.log(lst_of_text_nodes[x] + ' ::: ' +result_obj.score);

  }

  console.log('largest value :', max);
  console.log('average :', running_total/lst_of_text_nodes.length);
}


/*
{
  score: -3,
  comparative: -1,

  positive: {
    score: 0,
    comparative: 0,
    words: []
  },
  negative: {
    score: 3,
    comparative: 1,
    words: [ 'terrible' ]
  }
}
*/


// let tweet_scores = {
//   '10/7/2017' : 2.5,
//   '10/6/2017' : 2.5,
//   '10/5/2017' : 2.5,
//   '10/4/2017' : 2.5,
//   '10/3/2017' : 2.5,
//   '10/2/2017' : 2.5
// }
//
// console.log(tweet_scores)
