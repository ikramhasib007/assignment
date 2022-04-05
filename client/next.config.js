module.exports = {
  serverRuntimeConfig: {
    secret: 'my-client-secret'
  },
  publicRuntimeConfig: {
    DOMAIN: process.env.DOMAIN,
    PROTOCOL: process.env.PROTOCOL,
    PORT: process.env.PORT,
    API_PORT: process.env.API_PORT,

    BASE_PATH: process.env.BASE_URL,
    API_PATH: process.env.API_URL,
    STATIC_PATH: process.env.STATIC_URL,
    SUBSCRIPTION_PATH: process.env.SUBSCRIPTION_URL,
  },
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'localhost',
    ],
  }
}