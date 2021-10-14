const path = require("path");
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    dotenv: resolveApp('../.env'),
    appSrc: resolveApp('src'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    dist: resolveApp('dist'),
    distStatic: resolveApp('dist/static'),
    nodeModules: resolveApp('node_modules')
};