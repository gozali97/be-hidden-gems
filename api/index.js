const strapi = require('@strapi/strapi');

let strapiInstance;

module.exports = async (req, res) => {
    console.log('🚀 [Vercel] Function started');
    console.log('📂 [Vercel] CWD:', process.cwd());

    try {
        // Cold start protection
        if (!strapiInstance) {
            console.log('⏳ [Vercel] Initializing Strapi (Cold Start)...');

            const appDir = process.cwd();
            const distDir = appDir + '/dist';

            console.log(`📂 [Vercel] App Dir: ${appDir}`);
            console.log(`📂 [Vercel] Dist Dir: ${distDir}`);

            strapiInstance = await strapi.createStrapi({
                appDir: appDir,
                distDir: distDir,
            }).load();

            console.log('✅ [Vercel] Strapi loaded, mounting server...');
            await strapiInstance.server.mount();
            console.log('✅ [Vercel] Server mounted!');
        }

        // Forward request to Strapi
        console.log(`📨 [Vercel] Handling request: ${req.method} ${req.url}`);
        strapiInstance.server.httpServer.emit('request', req, res);

    } catch (error) {
        console.error('🔥 [Vercel] CRITICAL ERROR:', error);

        // Return error message to browser for easier debugging
        res.status(500).json({
            error: 'Strapi Failed to Start',
            message: error.message,
            stack: error.stack,
            logs: 'Check Vercel Runtime Logs for more details'
        });
    }
};
