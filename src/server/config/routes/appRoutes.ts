"use strict";

import express = require("express");
import RoomMonitorFakeRoutes = require("./roomMonitorFakeRoutes");
import RoomMonitorRoutes = require("./roomMonitorRoutes");

let app: any = express();

class AppRoutes {

    get routes(): any {
        app.use("/", new RoomMonitorFakeRoutes().routes);
        app.use("/", new RoomMonitorRoutes().routes);
        return app;
    }
}

export = AppRoutes;
