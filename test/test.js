#!/usr/bin/env node

var path = require('path')
var fs = require('fs')

var script_under_test = require(`${__dirname}/../main.js`)


function test_parse_whole_hongkong_list(){
  script_under_test.parse_whole_hongkong_list(`https://www.elections.gov.hk/dc2019/chi/nominat2.html`)
  .then(res => {
    console.log(res)
  })
}


function test_parse_canidate_list(){
  script_under_test.get_chinese_canidate_list(`https://www.elections.gov.hk/dc2019/pdf/nomination/CentralandWestern_20191018_c.html`)
  .then(res => {
    console.log(res)
  })
}

function test_all(){
  test_parse_whole_hongkong_list()
  test_parse_canidate_list()
}

test_all()