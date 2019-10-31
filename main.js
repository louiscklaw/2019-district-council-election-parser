#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const parse = require(`${__dirname}/src/parser.js`)

var nominate_url = `https://www.elections.gov.hk/dc2019/chi/nominat2.html`

parse.parse_whole_hongkong_list(nominate_url)
  .then(res => {
    fs.writeFileSync('./list.json', JSON.stringify(res))
  })