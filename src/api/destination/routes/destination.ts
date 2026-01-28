/**
 * destination router
 */
export default {
    routes: [
        {
            method: 'GET',
            path: '/destinations',
            handler: 'destination.find',
        },
        {
            method: 'GET',
            path: '/destinations/:id',
            handler: 'destination.findOne',
        },
        {
            method: 'POST',
            path: '/destinations',
            handler: 'destination.create',
        },
        {
            method: 'PUT',
            path: '/destinations/:id',
            handler: 'destination.update',
        },
        {
            method: 'DELETE',
            path: '/destinations/:id',
            handler: 'destination.delete',
        },
    ],
};
