"use strict";

import express = require("express");
import RoomMonitor = require("../domain/roomMonitor");
import DeviceShutdown = require("../domain/deviceShutdown");
import Temperature = require("../domain/temperature");
import Smoke = require("../domain/smoke");
import Light = require("../domain/light");
import Motion = require("../domain/motion");
import RoomMonitorFakeBusiness = require("../business/roomMonitorFakeBusiness");

class RoomMonitorFakeController {

    create(req: express.Request, res: express.Response): void {
        try {
            let b: RoomMonitorFakeBusiness = new RoomMonitorFakeBusiness();

            // noinspection TypeScriptUnresolvedVariable
            let p: RoomMonitor = <RoomMonitor>req.body.roomMonitor;
            b.create(p)
                .then((response: string) => {
                        res.send(response);
                    }
                )
                .catch((e: any) => {
                        res.status(400).send(e);
                    }
                );
        } catch (e) {
            res.status(500).send(e);
        }
    }

    shutdown(req: express.Request, res: express.Response): void {
        try {
            let b: RoomMonitorFakeBusiness = new RoomMonitorFakeBusiness();

            // noinspection TypeScriptUnresolvedVariable
            let p: DeviceShutdown = <DeviceShutdown>req.body.deviceShutdown;
            b.shutdown(p)
                .then((response: string) => {
                        res.send(response);
                    }
                )
                .catch((e: any) => {
                        res.status(400).send(e);
                    }
                );
        } catch (e) {
            res.status(500).send(e);
        }
    }

    setTemperature(req: express.Request, res: express.Response): void {
        try {
            let b: RoomMonitorFakeBusiness = new RoomMonitorFakeBusiness();

            // noinspection TypeScriptUnresolvedVariable
            let p: Temperature = <Temperature>req.body.temperature;
            b.setTemperature(p)
                .then((response: string) => {
                        res.send(response);
                    }
                )
                .catch((e: any) => {
                        res.status(400).send(e);
                    }
                );
        } catch (e) {
            res.status(500).send(e);
        }
    }

    setSmoke(req: express.Request, res: express.Response): void {
        try {
            let b: RoomMonitorFakeBusiness = new RoomMonitorFakeBusiness();

            // noinspection TypeScriptUnresolvedVariable
            let p: Smoke = <Smoke>req.body.smoke;
            b.setSmoke(p)
                .then((response: string) => {
                        res.send(response);
                    }
                )
                .catch((e: any) => {
                        res.status(400).send(e);
                    }
                );
        } catch (e) {
            res.status(500).send(e);
        }
    }

    setLight(req: express.Request, res: express.Response): void {
        try {
            let b: RoomMonitorFakeBusiness = new RoomMonitorFakeBusiness();

            // noinspection TypeScriptUnresolvedVariable
            let p: Light = <Light>req.body.light;
            b.setLight(p)
                .then((response: string) => {
                        res.send(response);
                    }
                )
                .catch((e: any) => {
                        res.status(400).send(e);
                    }
                );
        } catch (e) {
            res.status(500).send(e);
        }
    }

    setMotion(req: express.Request, res: express.Response): void {
        try {
            let b: RoomMonitorFakeBusiness = new RoomMonitorFakeBusiness();

            // noinspection TypeScriptUnresolvedVariable
            let p: Motion = <Motion>req.body.motion;
            b.setMotion(p)
                .then((response: string) => {
                        res.send(response);
                    }
                )
                .catch((e: any) => {
                        res.status(400).send(e);
                    }
                );
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

Object.seal(RoomMonitorFakeController);
export = RoomMonitorFakeController;
