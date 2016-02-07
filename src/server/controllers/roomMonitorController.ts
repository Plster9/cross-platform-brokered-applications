"use strict";

import express = require("express");
import Light = require("../domain/light");
import RoomMonitorBusiness = require("../business/roomMonitorBusiness");

class RoomMonitorController {

    setLight(req: express.Request, res: express.Response): void {
        try {
            let b: RoomMonitorBusiness = new RoomMonitorBusiness();

            // noinspection TypeScriptUnresolvedVariable
            let p: Light = req.body.light;
            b.setLight(p)
                .then((response: string) => {
                    res.send(response);
                })
                .catch((e: any) => {
                    res.status(400).send(e);
                });
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

export = RoomMonitorController;
