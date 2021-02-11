require('dotenv').config();
// const withImages = require('next-images')

module.exports = {
  env: {
    FOOD_DB_KEY: process.env.FOOD_DB_KEY,
    PORT: process.env.PORT || 3000,
    GA_ID: process.env.GA_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: 'openid profile email',
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    REDIRECT_URI: `https://${process.env.DEPLOYED_URI}/api/callback`,
    POST_LOGOUT_REDIRECT_URI: `https://${process.env.DEPLOYED_URI}`,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: 7200, // 2 hours
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    DEPLOYED_URI: process.env.DEPLOYED_URI,
    WEBSOCKET_ENDPOINT: process.env.WEBSOCKET_ENDPOINT,
  },
};
