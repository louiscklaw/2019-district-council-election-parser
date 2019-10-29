#!/usr/bin/env node

var script_under_test = require(`${__dirname}/../main.js`)


script_under_test.parse_whole_hongkong_list(`https://www.elections.gov.hk/dc2019/chi/nominat2.html`)
  .then(res => {
    console.log(res)
  })
