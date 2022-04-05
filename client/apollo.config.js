module.exports = {
  client: {
    includes: ['./src/stores/schema.js'],
    service: {
      name: 'web client',
      service: 'web-client',
      url: 'http://localhost:6001/graphql'
    }
  }
};
