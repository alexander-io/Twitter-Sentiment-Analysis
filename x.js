let analyze = require('Sentimental').analyze,
  positivity = require('Sentimental').positivity,
  negativity = require('Sentimental').negativity

// json file to analyze for  sentiment
const btc_json = require("./10kbtc.json")

// table for storing and sorting word:frequency tuples
class HackTable {
  constructor() {
    this.backbone = {}
  }
  add(elem) {
    this.backbone[elem] ? ++this.backbone[elem] : this.backbone[elem] = 1
  }
  sort() {
    let sorting_arr = []
    for (let x in this.backbone) {
      sorting_arr.push([this.backbone[x], x])
    }
    for (let i =  0; i < sorting_arr.length-1;i++) {
      for (let j =  0; j < sorting_arr.length-i-1;j++) {
        if (sorting_arr[j][0] < sorting_arr[j+1][0]) {
          let tmp = sorting_arr[j]
          sorting_arr[j] = sorting_arr[j+1]
          sorting_arr[j+1] = tmp
        }
      }
    }
    return sorting_arr
  }
}

// move words from object  structure  to list of word frequency tuples
let get_word_freq = (text_analysis) => {
  let hack_table = new HackTable()
  let word_struct = text_analysis.map((x) => {
    let short_list =  x.positive.words.concat(x.negative.words)
    for (let xx in short_list) {
      hack_table.add(short_list[xx])
    }
  })
  console.log('word frequency :', hack_table.sort().slice(0,9))
}

let main = function() {
  let running_total = 0
  let lst_of_text_nodes = btc_json.map((elem) => elem.text)

  let text_analysis = lst_of_text_nodes.map((elem) => analyze(elem))

  get_word_freq(text_analysis)

  let text_analysis_score = text_analysis.map((elem) => elem.score)
  let reduce_sum = (accumulator, current) => accumulator + current;
  running_total = text_analysis_score.reduce(reduce_sum)

  console.log(
    "\naverage sentiment :", running_total/lst_of_text_nodes.length
    , "\nmax sentiment :", Math.max(...text_analysis_score)
    , "\nmin sentiment :", Math.min(...text_analysis_score)
  )
}

main()
