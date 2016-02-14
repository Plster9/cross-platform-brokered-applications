"use strict";

import express = require("express");
import RoomMonitorFakeController = require("../../controllers/roomMonitorFakeController");

let router: any = express.Router();

class RoomMonitorFakeRoutes {

    private _controller: RoomMonitorFakeController;

    constructor() {
        this._controller = new RoomMonitorFakeController();
    }

    get routes(): any {
        router.post("/api/roomMonitorFake", this._controller.create);
        router.post("/api/roomMonitorFake/shutdown", this._controller.shutdown);
        router.post("/api/roomMonitorFake/setLight", this._controller.setLight);
        router.post("/api/roomMonitorFake/setMotion", this._controller.setMotion);
        router.post("/api/roomMonitorFake/setSmoke", this._controller.setSmoke);
        router.post("/api/roomMonitorFake/setTemperature", this._controller.setTemperature);

        return router;
    }
}

Object.seal(RoomMonitorFakeRoutes);
export = RoomMonitorFakeRoutes;
