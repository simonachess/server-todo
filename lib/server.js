const http = require('http');
const { StringDecoder } = require('string_decoder');

const config = require('../config.js');

const utils = require('./utils.js');
const data = require('./data.js');
const PageHome = require('../pages/PageHome.js');
const Page404 = require('../pages/Page404.js');
const PageNewTodo = require('../pages/PageNewTodo.js');
const PageUpdateTodo = require('../pages/PageUpdateTodo.js');
const PageDeleteTodo = require('../pages/PageDeleteTodo.js');

const apiTask = require('../api/task');
const apiUser = require('../api/user');

const server = {};

server.db = null;

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encrypted ? 's' : ''}://${req.headers.host}`;
    const parsedURL = new URL(req.url, baseURL);
    const parsedPathName = parsedURL.pathname;
    const httpMethod = req.method.toLowerCase();
    const headers = req.headers;
    const queryStringObject = parsedURL.searchParams;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');

    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    })

    req.on('end', async () => {
        buffer += decoder.end();

        const textFileExtensions = ['css', 'js', 'svg', 'webmanifest'];
        const binaryFileExtensions = ['woff2', 'woff', 'ttf', 'eot', 'otf', 'png', 'jpg', 'ico'];
        const urlParts = trimmedPath.split('.');
        const fileExtension = urlParts[urlParts.length - 1];
        const isTextFile = textFileExtensions.includes(fileExtension);
        const isBinaryFile = binaryFileExtensions.includes(fileExtension);

        const MIMES = {
            css: 'text/css',
            js: 'text/javascript',
            svg: 'image/svg+xml',
            woff2: 'font/woff2',
            woff: 'font/woff',
            ttf: 'font/ttf',
            eot: 'application/vnd.ms-fontobject',
            otf: 'font/otf',
            png: 'image/png',
            jpg: 'image/jpeg',
            ico: 'image/x-icon',
            webmanifest: 'application/manifest+json',
            json: 'application/json',
        }

        const payload = utils.parseJSONtoObject(buffer);
        let responseContent = '';

        console.log(trimmedPath);
        //api
        //api/user
        //api/user/4
        //apinasris
        //apinasris/raudonas


        //grazins true arba FALSE
        const isAPI = trimmedPath.split('/')[0] === 'api';

        const globalData = {
            db: server.db,
            baseURL,
            trimmedPath,
            httpMethod,
            headers,
            queryStringObject,
            payload: utils.parseJSONtoObject(buffer),
        }

        if (isTextFile || isBinaryFile) {

            let fileContent = '';
            if (isTextFile) {
                fileContent = await data.readStaticTextFile(trimmedPath);
            } else {
                fileContent = await data.readStaticBinaryFile(trimmedPath);
            }

            if (fileContent === '') {
                // nepavyko rasti norimo failo
                res.writeHead(404, {
                    'Content-Type': MIMES[fileExtension],
                })
            } else {
                // pavyko rasti norima faila
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension],
                })
            }
            return res.end(fileContent);
        } else if (isAPI) {
            //api
            if (trimmedPath === "api") {
                console.log('no endpoint');
                res.writeHead(404, {
                    'Content-Type': MIMES["json"],
                })
                return res.end(JSON.stringify("no endpoint"));
            }
            const apiEndpoint = trimmedPath.split('/')[1];

            if (apiEndpoint in server.api) {
                const apiHandler = server.api[apiEndpoint];
                apiHandler[apiEndpoint](globalData, (statusCode, payload = '', headers = {}) => {
                    statusCode = typeof statusCode === 'number' ? statusCode : 200;
                    payload = typeof payload === 'string' ? payload : JSON.stringify(payload);

                    res.writeHead(statusCode, {
                        'Content-Type': 'application/json',
                        ...headers,
                    })
                    return res.end(payload);
                });
            } else {
                console.log('no such endpoint');
                res.writeHead(404, {
                    'Content-Type': MIMES["json"],
                })
                return res.end(JSON.stringify("no such endpoint"));
            }

            // return res.end(JSON.stringify('"message: Atsakas i API uzklausa"'))
        } else {

            // if (trimmedPath in server.routes) {
            //     responseContent = server.routes[trimmedPath]();
            // } else {
            //     responseContent = await data.readHTMLFile(trimmedPath);
            //     if (responseContent === '') {
            //         responseContent = server.routes['404']();
            //     }
            // }

            let pageHandler = server.routes['404'];
            if (trimmedPath in server.routes) {
                pageHandler = server.routes[trimmedPath];
            }
            const page = new pageHandler(server.db);
            responseContent = await page.render();
            res.end(responseContent);
        }


    })
});

server.routes = {
    '': PageHome,
    '404': Page404,
    'new': PageNewTodo,
    'update': PageUpdateTodo,
    'delete': PageDeleteTodo,
};

server.api = {
    task: apiTask,
    user: apiUser,
};

server.init = (db) => {
    server.db = db;

    server.httpServer.listen(config.httpPort, () => {
        console.log(`Tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    })
}

module.exports = server;