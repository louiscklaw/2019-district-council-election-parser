# 2019-district-council-election-parser
A 2019 district council election constituency parser

## Installation
Install via NPM:

```bash
npm install 2019-district-council-election-parser

```

## Usage

#### javascript

```javascript

var try_parser = require("2019-district-council-election-parser");

// simple sanity helloworld
try_parser.helloworld()

// parse the list of 2019 election in gov page
try_parser.parse_whole_hongkong_list(`https://www.elections.gov.hk/dc2019/chi/nominat2.html`)

```

### output format
```
# In general, it provides format like this, corresponding to the pages structure
{ '香港島': {
    '中西區': [array],
    '灣仔區': [array],
    ...
  },
  '九龍': {
    '油尖旺區': [array],
    '深水埗區': [array],
    ...
    '九龍城區': [array],
  },
  '新界': {
    '離島區': [array]
    ...
  }
}

# In detail, the rows and columns were parsed into format:
{
  constituency_code: [ 'A15', 'A15' ],
  constituency: [ 'eng constituency', '中文選區' ],
  name_of_nominees: [ 'Name of Nominees', '獲提名人士' ],
  alias: [ ' ', ' ' ],
  gender: [ 'Gender', '性別' ],
  occupation: ... ,
  political_affiliation: ... ,
  date_of_nomination: ... ,
  remarks: ...
},

```

### test
Test should work as-long-as the web site alive, a frozen html can be found under directory test/frozen
```javascript

$ npm run test

```

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
