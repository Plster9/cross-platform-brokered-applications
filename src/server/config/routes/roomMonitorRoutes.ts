"use strict";

import express = require("express");
import RoomMonitorController = require("../../controllers/roomMonitorController");

let router: any = express.Router();

class RoomMonitorRoutes {

    private _controller: RoomMonitorController;

    constructor() {
        this._controller = new RoomMonitorController();
    }

    get routes(): any {
        router.post("/roomMonitor/setLight", this._controller.setLight);
        return router;
    }
}

Object.seal(RoomMonitorRoutes);
export = RoomMonitorRoutes;
