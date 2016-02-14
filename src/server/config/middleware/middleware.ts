// http://expressjs.com/en/guide/migrating-4.html

"use strict";

import express = require("express");
import bodyParser = require("body-parser");
import AppRoutes = require("../routes/appRoutes");

class Middleware {

    static get configuration(): any {
        let app: any = express();
        app.use((req: any, res: any, next: any) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            }
        );
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true, limit: 1000}));
        app.use(new AppRoutes().routes);

        return app;
    }
}

Object.seal(Middleware);
export = Middleware;
