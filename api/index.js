const strapi = require('@strapi/strapi');

let strapiInstance;

module.exports = async (req, res) => {
    // Cold start protection
    if (!strapiInstance) {
        // Vercel menjalankan file ini dari root, jadi kita perlu menunjuk ke direktori yang benar
        strapiInstance = await strapi.createStrapi({
            appDir: process.cwd(),
            distDir: process.cwd() + '/dist',
        }).load();

        await strapiInstance.server.mount();
    }

    // Forward request to Strapi
    strapiInstance.server.httpServer.emit('request', req, res);
};
