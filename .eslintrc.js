module.exports = {
    "extends": "airbnb",
    "rules": {
      "react/forbid-prop-types": 0,
      "jsx-a11y/href-no-hash": 0,
      "import/no-named-as-default": 0,
      "no-param-reassign": ["error", { "props": false }],
    },
    "env": {
      "browser": true,
       "jest": true,
    },
};
