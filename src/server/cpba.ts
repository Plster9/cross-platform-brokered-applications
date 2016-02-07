///<reference path="../../typings/tsd.d.ts" />
///<reference path="../../typings/appReferences.d.ts" />

// http://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html
// http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn

"use strict";

process.title = "cpba";

import mqtt = require("mqtt");
import serveStatic = require("serve-static");
import express = require("express");
import io = require("socket.io");
import Middleware = require("./config/middleware/middleware");
import Constants from "./config/constants/constants";
import DeviceShutdownPayload = require("./topicPayloads/deviceShutdownPayload");
import ProcessItem = require("./domain/processItem");
import RoomMonitorStatusPayload = require("./topicPayloads/roomMonitorStatusPayload");
import _ = require("underscore");
import RegisterDevicePayload = require("./topicPayloads/registgerDevicePayload");

let child_process: any = require("child_process");

// start logger
try {

} catch (e) {
    console.log(e);
    process.exit(-1);
}


// start http server

try {
    let app: any = express();

    app.set(Constants.Port, Constants.ServerPort);
    app.use(serveStatic(__dirname + Constants.ServerStaticDirectory));
    app.use(Middleware.configuration);

    let server: any = app.listen(Constants.ServerPort, Constants.ServerIP, () => {
        console.log("Express server directory: %s, listening at http://%s:%s ",
                    __dirname, server.address().address, server.address().port);

        let socket: any = io.listen(server);
        let mqttClient: any = mqtt.connect(Constants.MqttConnectionString);

        let devices: Array<ProcessItem>;

        mqttClient.on(Constants.EventConnect, () => {
            console.log("MQTT connected.");

            // noinspection TypeScriptUnresolvedFunction
            mqttClient.subscribe(Constants.TopicRoomStatus, {qos: 2});

            // noinspection TypeScriptUnresolvedFunction
            mqttClient.subscribe(Constants.TopicRoomRegister, {qos: 2});

            // noinspection TypeScriptUnresolvedFunction
            mqttClient.subscribe(Constants.TopicRoomShutdown, {qos: 2});

            mqttClient.on(Constants.EventMessage, (topic: string, payload: string): void => {
                switch (topic) {
                    case Constants.TopicRoomStatus:
                        let statusPayload: RoomMonitorStatusPayload = JSON.parse(payload);
                        socket.emit(Constants.SocketStatus, statusPayload);
                        break;
                    case Constants.TopicRoomRegister:
                        let devicePayload: RegisterDevicePayload = JSON.parse(payload);
                        let child: any =
                            child_process.spawn("node", ["lib/server/cpbaLoadRoomMonitorFakeDevice.js", payload], {
                                stdio: ["inherit"], encoding: "utf8"
                            });
                        child.stdout.pipe(process.stdout);
                        child.stderr.pipe(process.stderr);

                        devices.push(new ProcessItem(devicePayload.deviceId, child));
                        break;
                    case Constants.TopicRoomShutdown:
                        let shutdownPayload: DeviceShutdownPayload = JSON.parse(payload);
                        let item: ProcessItem = _.findWhere(devices, {deviceId: shutdownPayload.deviceId});
                        if (item) {
                            item.process.disconnect();
                            socket.emit(Constants.SocketDeviceShutdown, shutdownPayload);
                        } else {
                            console.log("Unable to shutdown device: " + shutdownPayload.deviceId);
                        }
                        break;
                    default:
                        break;
                }
            });
        });

    });

} catch (e) {
    console.log(e);
    process.exit(-1);
}
