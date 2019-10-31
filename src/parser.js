#!/usr/bin/env node

const request = require("request");


var Xray = require("x-ray");
var x = Xray({
  filters: {
    filter_html_only: function(link_in) {
      return link_in.search("html") > 0 ? link_in : null;
    },
    trim: text_in => {
      return text_in.trim();
    },
    check_empty: function(text_in) {
      text_in = text_in.trim()
      return text_in != "" ? text_in : null;
    }
  }
});

var column_list = [
  "constituency_code",
  "constituency",
  "name_of_nominees",
  "alias",
  "gender",
  "occupation",
  "political_affiliation",
  "date_of_nomination",
  "remarks"
];

var table_filter = column_list.reduce((map, curr, idx) => {
  map[curr] = `td:nth-child(${idx + 1})`;
  return map;
}, {});

function parse_cand_list_district(url_in) {
  return x(url_in, "body", {
    temp1: ".main:nth-child(1)",
    candiates: x("table", x("tr", [table_filter]))
  });
}

function get_canidate_list(url_in) {
  return x(url_in, ".main tr", [
    {
      constituency_code: "td:nth-of-type(1) | check_empty",
      constituency: "td:nth-of-type(2) | check_empty",
      name_of_nominees: "td:nth-of-type(3) | check_empty",
      alias: "td:nth-of-type(4) | check_empty",
      gender: "td:nth-of-type(5) | check_empty",
      occupation: "td:nth-of-type(6) | check_empty",
      political_affiliation: "td:nth-of-type(7) | check_empty",
      date_of_nomination: "td:nth-of-type(8) | check_empty",
      remarks: "td:nth-of-type(9) | check_empty"
    }
  ]).then(res => {
    return res.filter(canidate => canidate["constituency_code"] != null);
  });
}

// constituency_code
// constituency
// name_of_nominees
// alias
// gender
// occupation
// political_affiliation
// date_of_nomination
// remarks
function get_chinese_canidate_list(url_in) {
  var eng_url = url_in.replace("_c.", "_e.");
  return get_canidate_list(url_in).then(res_chi => {
    return get_canidate_list(eng_url).then(res_eng => {
      for (var i = 0; i < res_eng.length; i++) {
        if (res_eng[i]["constituency_code"] != null) {
          column_list.forEach(column_name => {
            res_eng[i][column_name] = [
              res_eng[i][column_name],
              res_chi[i][column_name]
            ];
          });
        }
      }
      return res_eng;
    });
  });
}

function get_name_list(url_in, table_idx) {
  return x(url_in, `.contents table:nth-of-type(${table_idx})`, {
    name: ["td"],
    links: ["a[href$=html]@href"]
  }).then(async res => {
    var output = {};
    for (var idx = 0; idx < res["name"].length; idx++) {
      var id = res["name"][idx].trim().split(" ")[0];
      var link_href = res["links"][idx];
      output[id] = await get_chinese_canidate_list(link_href);
    }
    return output;
  });
}

function parse_district(url_in) {
  return x(url_in, ".contents", { district: ["p"] }).then(async result => {
    var output = {};
    for (const idx in [0, 1, 2]) {
      var table_idx = parseInt(idx) + 2;
      var district_name = result["district"][idx].trim();
      output[district_name] = await get_name_list(url_in, table_idx);
    }
    return output;
  });
}

function parse_whole_hongkong_list(url_in) {
  console.log('getting list... ')
  return parse_district(url_in).then(res => {
    return res;
  });
}

function helloworld() {
  console.log("helloworld");
}

module.exports.helloworld = helloworld;

module.exports.parse_cand_list_district = parse_cand_list_district;
module.exports.parse_whole_hongkong_list = parse_whole_hongkong_list;
module.exports.get_chinese_canidate_list = get_chinese_canidate_list;
module.exports.get_canidate_list = get_canidate_list;