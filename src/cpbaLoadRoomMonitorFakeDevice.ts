/* tslint:disable no-unused-variable */

///<reference path="../typings/tsd.d.ts" />
///<reference path="../typings/appReferences.d.ts" />

"use strict";

import RoomMonitor = require("./server/domain/roomMonitor");
import RoomMonitorFakeDevice = require("./server/fakeDevices/roomMonitorFakeDevice");

let roomMonitor: RoomMonitor =  JSON.parse(process.argv[2]);

process.title = `cpba-Room Monitor: ${roomMonitor.name}`;

let driver: any = new RoomMonitorFakeDevice(roomMonitor);
