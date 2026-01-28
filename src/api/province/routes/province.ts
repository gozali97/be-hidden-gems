/**
 * province router
 */
export default {
    routes: [
        {
            method: 'GET',
            path: '/provinces',
            handler: 'province.find',
        },
        {
            method: 'GET',
            path: '/provinces/:id',
            handler: 'province.findOne',
        },
        {
            method: 'POST',
            path: '/provinces',
            handler: 'province.create',
        },
        {
            method: 'PUT',
            path: '/provinces/:id',
            handler: 'province.update',
        },
        {
            method: 'DELETE',
            path: '/provinces/:id',
            handler: 'province.delete',
        },
    ],
};
