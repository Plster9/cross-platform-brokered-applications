///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

"use strict";

import mqtt = require("mqtt");
import Constants from "../config/constants/constants";
import LightState = require("../domain/lightState");
import StringExtension = require("../infrastructure/stringExtension");
import RoomMonitor = require("../domain/roomMonitor");
import MotionPayload = require("../topicPayloads/motionPayload");
import SmokePayload = require("../topicPayloads/smokePayload");
import LightPayload = require("../topicPayloads/lightPayload");
import RegisterDevicePayload = require("../topicPayloads/registgerDevicePayload");
import TemperaturePayload = require("../topicPayloads/temperaturePayload");
import MotionState = require("../domain/motionState");
import SmokeState = require("../domain/smokeState");
import RoomMonitorStatusPayload = require("../topicPayloads/roomMonitorStatusPayload");

/**
 * RoomMonitorFakeDevice is a fake or substitute for a real device like a Raspberry PI or Arduino,
 * that has sensors, motion detector, and relay to control a light.
 *
 * This fake is provided so that developers without a configured and programmed real device
 * can run this application.
 *
 * This fake is instantiated in response to a remote user configuring and starting this fake.  The
 * loadFakeDevice.ts file acts as the loader for this fake device.
 *
 * The remote user can then issue commands to this fake, to simulate a real device sensing changes in
 * temperature, motion, or smoke detected.  Additionally, the user can issues a command to turn on
 * and off a light.
 *
 * This fake will post its status every 5 seconds.
 */
class RoomMonitorFakeDevice {

    // members
    private client: any;

    // room monitor state
    private temperature: number = 65;
    private lightState: LightState = LightState.Off;
    private smokeState: SmokeState = SmokeState.None;
    private motionState: MotionState = MotionState.None;

    // inbound topics
    private topicSetTemperature: string = StringExtension.format(Constants.TopicRoomFakeSetTemperature,
                                                                 this.roomMonitor.deviceId);
    private topicSetMotion: string = StringExtension.format(Constants.TopicRoomFakeSetMotion,
                                                            this.roomMonitor.deviceId);
    private topicSetSmoke: string = StringExtension.format(Constants.TopicRoomFakeSetSmoke, this.roomMonitor.deviceId);
    private topicSetLight: string = StringExtension.format(Constants.TopicRoomFakeSetLight, this.roomMonitor.deviceId);

    // outbound topics
    private topicStatus: string = StringExtension.format(Constants.TopicRoomStatus, this.roomMonitor.deviceId);
    private topicRegister: string = Constants.TopicRoomRegister;

    constructor(private roomMonitor: RoomMonitor) {
        this.setupMqttSubscriptions();
        this.registerWithMqttBroker();
        this.setupStatusReporting();
    }

    private setupStatusReporting(): void {
        setInterval(() => {
            this.sendStatus();
        }, 5000);
    }

    private setupMqttSubscriptions(): void {
        this.client = mqtt.connect(Constants.MqttConnectionString);
        this.client.on(Constants.EventConnect, () => {
            // noinspection TypeScriptUnresolvedFunction
            this.client.subscribe(this.topicSetTemperature, {qos: 2});

            // noinspection TypeScriptUnresolvedFunction
            this.client.subscribe(this.topicSetMotion, {qos: 2});

            // noinspection TypeScriptUnresolvedFunction
            this.client.subscribe(this.topicSetSmoke, {qos: 2});

            // noinspection TypeScriptUnresolvedFunction
            this.client.subscribe(this.topicSetLight, {qos: 2});
        });

        this.client.on(Constants.EventMessage, (topic: string, payloadJson: string): void => {
            switch (topic) {
                case this.topicSetTemperature:
                    this.setTemperature(payloadJson);
                    break;
                case this.topicSetMotion:
                    this.setMotion(payloadJson);
                    break;
                case this.topicSetSmoke:
                    this.setSmoke(payloadJson);
                    break;
                case this.topicSetLight:
                    this.setLight(payloadJson);
                    break;
                default:
            }

        });
    }

    private setTemperature(payloadJson: string): void {
        try {
            let payload: TemperaturePayload = JSON.parse(payloadJson);
            this.temperature = payload.temperature;
            this.sendStatus();
        } catch (e) {
            this.logException(e);
        }
    }

    private setMotion(payloadJson: string): void {
        try {
            let payload: MotionPayload = JSON.parse(payloadJson);
            this.motionState = payload.motionState;
            this.sendStatus();
        } catch (e) {
            this.logException(e);
        }
    }

    private setSmoke(payloadJson: string): void {
        try {
            let payload: SmokePayload = JSON.parse(payloadJson);
            this.smokeState = payload.smokeState;
            this.sendStatus();
        } catch (e) {
            this.logException(e);
        }
    }

    private setLight(payloadJson: string): void {
        try {
            let payload: LightPayload = JSON.parse(payloadJson);
            this.lightState = payload.lightState;
            this.sendStatus();
        } catch (e) {
            this.logException(e);
        }
    }

    private sendStatus(): void {
        try {
            let payload: RoomMonitorStatusPayload =
                new RoomMonitorStatusPayload(this.roomMonitor.deviceId, this.temperature, this.lightState,
                    this.motionState, this.smokeState);

            // noinspection TypeScriptUnresolvedFunction
            this.client.publish(this.topicStatus, JSON.stringify(payload), {qos: 2});
        } catch (e) {
            this.logException(e);
        }
    }

    private registerWithMqttBroker(): void {
        try {
            let payload: RegisterDevicePayload = new RegisterDevicePayload(this.roomMonitor.deviceId, this.roomMonitor.name);

            // noinspection TypeScriptUnresolvedFunction
            this.client.publish(this.topicRegister, JSON.stringify(payload), {qos: 2});
        } catch (e) {
            this.logException(e);
        }
    }

    private logException(e: any): void {
        process.stderr.write(e.stack);
        process.stderr.write(e.toString());
    }
}

export = RoomMonitorFakeDevice;