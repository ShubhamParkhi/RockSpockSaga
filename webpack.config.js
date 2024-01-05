const path = require('path');

module.exports = {
  // ... other Webpack configuration

  output: {
    // ... other output configuration

    // Set publicPath to ensure correct asset paths in production
    publicPath: '/public/',
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from the 'public' folder
    },
  },
};
