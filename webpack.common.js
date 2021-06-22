const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [      
      { 
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  }
};
