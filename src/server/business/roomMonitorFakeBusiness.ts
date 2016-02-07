///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

"use strict";

import BusinessBase = require("./BusinessBase");
import Constants from "../config/constants/constants";
import RoomMonitor = require("../domain/roomMonitor");
import TemperaturePayload = require("../topicPayloads/temperaturePayload");
import RegisterDevicePayload = require("../topicPayloads/registgerDevicePayload");
import StringExtension = require("../infrastructure/stringExtension");
import Smoke = require("../domain/smoke");
import SmokePayload = require("../topicPayloads/smokePayload");
import Light = require("../domain/light");
import LightPayload = require("../topicPayloads/lightPayload");
import Motion = require("../domain/motion");
import MotionPayload = require("../topicPayloads/motionPayload");
import DeviceShutdownPayload = require("../topicPayloads/deviceShutdownPayload");
import DeviceShutdown = require("../domain/deviceShutdown");
import Temperature = require("../domain/temperature");

/**
 * This class methods are Promisfied because in an app with a data base, this layer would use either callbacks
 * or promises when communicating with the repository layer.
 *
 * I chose Promises so the consumer's code would be simplified.
 */
class RoomMonitorFakeBusiness extends BusinessBase {

    create(roomMonitor: RoomMonitor): Promise<string> {
        return new Promise((resolve: any, reject: any): void => {
            try {
                let payload: RegisterDevicePayload = new RegisterDevicePayload(roomMonitor.deviceId, roomMonitor.name);
                let topic: string = StringExtension.format(Constants.TopicRoomRegister, roomMonitor);
                super.publishTopic(topic, payload);
                resolve("registration requested");
            } catch (e) {
                reject(e);
            }
        });
    }

    shutdown(deviceShutdown: DeviceShutdown): Promise<string> {
        return new Promise((resolve: any, reject: any): void => {
            try {
                let payload: DeviceShutdownPayload = new DeviceShutdownPayload(deviceShutdown.deviceId);
                super.publishTopic(Constants.TopicRoomShutdown, payload);
                resolve("shutdown requested");
            } catch (e) {
                reject(e);
            }
        });
    }

    setTemperature(temperature: Temperature): Promise<string> {
        return new Promise((resolve: any, reject: any): void => {
            try {
                let payload: TemperaturePayload = new TemperaturePayload(temperature.deviceId, temperature.temperature);
                super.publishTopic(Constants.TopicRoomFakeSetTemperature, payload);
                resolve("set temperature requested");
            } catch (e) {
                reject(e);
            }
        });
    }

    setSmoke(smoke: Smoke): Promise<string> {
        return new Promise((resolve: any, reject: any): void => {
            try {
                let payload: SmokePayload = new SmokePayload(smoke.deviceId, smoke.state);
                super.publishTopic(Constants.TopicRoomFakeSetSmoke, payload);
                resolve("set smoke requested");
            } catch (e) {
                reject(e);
            }
        });
    }

    setLight(light: Light): Promise<string> {
        return new Promise((resolve: any, reject: any): void => {
            try {
                let payload: LightPayload = new LightPayload(light.deviceId, light.state);
                super.publishTopic(Constants.TopicRoomFakeSetLight, payload);
                resolve("set light requested");
            } catch (e) {
                reject(e);
            }
        });
    }

    setMotion(motion: Motion): Promise<string> {
        return new Promise((resolve: any, reject: any): void => {
            try {
                let payload: MotionPayload = new MotionPayload(motion.deviceId, motion.state);
                super.publishTopic(Constants.TopicRoomFakeSetMotion, payload);
                resolve("set motion requested");
            } catch (e) {
                reject(e);
            }
        });
    }
}

export = RoomMonitorFakeBusiness;
