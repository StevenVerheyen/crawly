const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api/**', { target: 'http://localhost:5000' })
  );
  app.use(
    createProxyMiddleware('/pdfs/**', { target: 'http://localhost:5000' })
  );
};
