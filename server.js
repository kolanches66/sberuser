const http = require('http');
const app = require('./src/app');

const server = http.createServer(app).listen(process.env.APP_PORT, () => {
   console.log(`Server started at port ${process.env.APP_PORT}`);
});