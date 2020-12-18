module.exports = {
  apps: [{
      name: 'msp-service',
      script: 'dist/src/server.js',
      env: {
          NODE_ENV: 'production',
      }
  }],
};