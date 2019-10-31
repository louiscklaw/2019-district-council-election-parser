#!/usr/bin/env node

var path = require('path')
var fs = require('fs')

var assert = require('assert')

var script_under_test = require(`${__dirname}/../src/parser.js`)


var readTextFile = (file_path) => {
  return fs.readFileSync(file_path)
}
var hk_list = readTextFile(`${__dirname}/frozen/hk_list.html`)
var candiate_list = readTextFile(`${__dirname}/frozen/candiate_list.html`)

function test_parse_whole_hongkong_list(){
  script_under_test.parse_whole_hongkong_list(hk_list)
  .then(res => {
    var three_main_district = Object.keys(res).length
    var hong_kong_island = res['香港島']
    var hong_kong_island_division = Object.keys(hong_kong_island).length

    // sanity check
    assert.equal(3, three_main_district)
    assert.equal(4, hong_kong_island_division)

  })
}


function test_parse_canidate_list(){
  script_under_test.get_canidate_list(candiate_list)
  .then(res => {
    var list_nominatees = res
    var sample_the_first_nominate = res[0]
    // sanity check
    assert.equal(35, list_nominatees.length)

    // the context should be text/string contain fields
    assert.ok([typeof(''), typeof(null)].includes(typeof(sample_the_first_nominate['constituency_code'])))
    assert.ok([typeof(''), typeof(null)].includes(typeof(sample_the_first_nominate['constituency'])))
    assert.ok([typeof(''), typeof(null)].includes(typeof(sample_the_first_nominate['name_of_nominees'])))
    assert.ok([typeof(''), typeof(null)].includes(typeof(sample_the_first_nominate['alias'])))
    assert.ok([typeof(''), typeof(null)].includes(typeof(sample_the_first_nominate['gender'])))
    assert.ok([typeof(''), typeof(null)].includes(typeof(sample_the_first_nominate['occupation'])))

  })
}

function test_all(){
  // test_parse_whole_hongkong_list()
  test_parse_canidate_list()
}

test_all()