const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/login/*',
        { target: 'http://localhost:5000/' }
    ));

    app.use(proxy('/api/users/*',
        { target: 'http://localhost:5000/' }
    ));
    app.use(proxy('/api/*',
        { target: 'http://localhost:5000/' }
    ));

    app.use(proxy('/googleoauth/*',
        { target: 'http://localhost:5000/' }
    ));
    app.use(proxy('/login/google/oauth',
        { target: 'http://localhost:5000/' }
    ));
}