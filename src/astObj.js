var _foreach = {
    "type": "foreach",
    "to": "item",
    "from": {
      "type": "array",
      "isRange": true,
      "value": [
        "0",
        "5"
      ]
    },
    "pos": {
      "first_line": 3,
      "last_line": 3,
      "first_column": 8,
      "last_column": 34
    }
  }

  var _foreach1 = {
    "type": "foreach",
    "to": "item",
    "from": {
      "type": "array",
      "value": [
        {
          "type": "integer",
          "value": "0"
        },
        {
          "type": "integer",
          "value": "1"
        },
        {
          "type": "integer",
          "value": "3"
        },
        {
          "type": "integer",
          "value": "4"
        }
      ]
    },
    "pos": {
      "first_line": 3,
      "last_line": 3,
      "first_column": 8,
      "last_column": 37
    }
  }
var _if = {
"type": "if",
"condition": {
    "type": "math",
    "expression": [
    {
        "type": "references",
        "id": "item",
        "leader": "$"
    },
    {
        "type": "integer",
        "value": "1"
    }
    ],
    "operator": "=="
},
"pos": {
    "first_line": 4,
    "last_line": 4,
    "first_column": 12,
    "last_column": 27
}
}

var _else = {
"type": "else",
"pos": {
    "first_line": 13,
    "last_line": 13,
    "first_column": 49,
    "last_column": 54
}
}

var _elseif = {
"type": "elseif",
"condition": {
    "type": "math",
    "expression": [
    {
        "type": "references",
        "id": "item",
        "leader": "$"
    },
    {
        "type": "integer",
        "value": "3"
    }
    ],
    "operator": "=="
},
"pos": {
    "first_line": 13,
    "last_line": 13,
    "first_column": 49,
    "last_column": 66
}
}

var _var = {
"type": "references",
"id": "tab2",
"path": [
    {
    "type": "index",
    "id": {
        "type": "references",
        "id": "item",
        "leader": "$"
    }
    },
    {
    "type": "property",
    "id": "pic"
    }
],
"leader": "$",
"prue": true,
"pos": {
    "first_line": 8,
    "last_line": 8,
    "first_column": 45,
    "last_column": 61
}
}

var _set = {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "arr1",
        "leader": "$"
      },
      {
        "type": "integer",
        "value": "1"
      }
    ],
    "pos": {
      "first_line": 3,
      "last_line": 3,
      "first_column": 4,
      "last_column": 19
    }
  }