///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

// http://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html
// http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn

"use strict";

import mqtt = require("mqtt");
import serveStatic = require("serve-static");
import express = require("express");
import {ChildProcess} from "child_process";
import io = require("socket.io");
import _ = require("underscore");
import Middleware = require("../config/middleware/middleware");
import Constants from "../config/constants/constants";
import DeviceShutdownPayload = require("../topicPayloads/deviceShutdownPayload");
import ProcessItem = require("../domain/processItem");
import RoomMonitorStatusPayload = require("../topicPayloads/roomMonitorStatusPayload");
import RegisterDevicePayload = require("../topicPayloads/registgerDevicePayload");
import LightPayload = require("../topicPayloads/lightPayload");

class WebServer {

    private socket: any;
    private mqttClient: any;
    private child_process: any = require("child_process");
    private devices: Array<ProcessItem> = [];

    run(): void {

        let app: any = express();
        let currentDirectory: string = __dirname;
        currentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf("/lib") + 4);
        let serverRootDirectory: string = currentDirectory + Constants.ServerStaticDirectory;

        app.set(Constants.Port, Constants.ServerPort);
        app.use(serveStatic(serverRootDirectory));
        app.use(Middleware.configuration);

        let server: any = app.listen(Constants.ServerPort, Constants.ServerIP, () => {
                this.outputText(
                    `Web server root directory: ${serverRootDirectory}, listening at http://${server.address().address}:${server.address().port}`
                );

                this.socket = io.listen(server);
                this.mqttClient = mqtt.connect(Constants.MqttConnectionString);

                this.mqttClient.on(Constants.EventConnect, () => {
                        this.outputText("Web server connected to MQTT");

                        // noinspection TypeScriptUnresolvedFunction
                        this.mqttClient.subscribe(Constants.TopicRoomStatus, {qos: 2});

                        // noinspection TypeScriptUnresolvedFunction
                        this.mqttClient.subscribe(Constants.TopicRoomRegister, {qos: 2});

                        // noinspection TypeScriptUnresolvedFunction
                        this.mqttClient.subscribe(Constants.TopicRoomShutdown, {qos: 2});

                        // noinspection TypeScriptUnresolvedFunction
                        this.mqttClient.subscribe(Constants.TopicRoomSwitchLight, {qos: 2});

                        this.mqttClient.on(Constants.EventMessage, (topic: string, payload: string): void => {
                                switch (topic) {
                                    case Constants.TopicRoomStatus:
                                        this.onRoomStatus(payload);
                                        break;
                                    case Constants.TopicRoomRegister:
                                        this.onRoomRegister(payload);
                                        break;
                                    case Constants.TopicRoomShutdown:
                                        this.onRoomShutdown(payload);
                                        break;
                                    case Constants.TopicRoomSwitchLight:
                                        this.onRoomSwitchLight(payload);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        );
                    }
                );

            }
        );
    }

    private onRoomSwitchLight(payload: string): void {
        let lightPayload: LightPayload = JSON.parse(payload);
        this.postSocketMessage(Constants.SocketDeviceSwitchLight, lightPayload);
    }

    private onRoomStatus(payload: string): void {
        let statusPayload: RoomMonitorStatusPayload = JSON.parse(payload);
        this.postSocketMessage(Constants.SocketDeviceStatus, statusPayload);
    }

    private onRoomRegister(payload: string): void {
        let devicePayload: RegisterDevicePayload = JSON.parse(payload);
        let child: ChildProcess = this.child_process.spawn("node",
            ["lib/server/fakeDevices/roomMonitorFakeDevice.js", payload],
            {
                stdio: ["inherit"], encoding: "utf8"
            }
        );
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
        this.devices.push(new ProcessItem(devicePayload.deviceId, child));
    }

    private onRoomShutdown(payload: string): void {
        let shutdownPayload: DeviceShutdownPayload = new DeviceShutdownPayload(JSON.parse(payload).deviceId);
        let item: ProcessItem = _.findWhere(this.devices, {deviceId: shutdownPayload.deviceId});
        if (item) {
            this.postSocketMessage(Constants.SocketDeviceShutdown, shutdownPayload);
            item.process.kill();
        } else {
            this.outputText("Unable to shutdown device: " + shutdownPayload.deviceId);
        }
    }

    private postSocketMessage(event: string, args: any): void {
        this.socket.emit(event, args);
    }

    private outputText(text: string): void {
        process.stdout.write(text + "\n");
    }
}

process.title = "cpba-Web Server";

let webServer: WebServer = new WebServer();
webServer.run();
