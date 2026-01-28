const strapi = require('@strapi/strapi');

// Instance Strapi singleton
let strapiInstance;

module.exports = async (req, res) => {
    // Initialize Strapi if not already running (Cold Start)
    if (!strapiInstance) {
        strapiInstance = await strapi.createStrapi({
            appDir: __dirname,
            distDir: __dirname + '/dist',
        }).load();

        await strapiInstance.server.mount();
    }

    // Forward request to Strapi's Koa server
    strapiInstance.server.httpServer.emit('request', req, res);
};
