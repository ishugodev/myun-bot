module.exports = {
  apps: [{
    name: "myun-bot",
    script: "./index.js",
    instances: "max",
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}