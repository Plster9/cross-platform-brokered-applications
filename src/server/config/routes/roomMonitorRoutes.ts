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
        router.post("/api/roomMonitor/switchLight", this._controller.switchLight);
        return router;
    }
}

Object.seal(RoomMonitorRoutes);
export = RoomMonitorRoutes;
