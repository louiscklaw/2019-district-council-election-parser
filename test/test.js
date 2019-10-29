#!/usr/bin/env node

var path = require('path')
var fs = require('fs')

var script_under_test = require(`${__dirname}/../main.js`)

script_under_test.get_chinese_canidate_list(`https://www.elections.gov.hk/dc2019/pdf/nomination/CentralandWestern_20191018_c.html`)
  .then(res => {
    console.log(res)
  })
