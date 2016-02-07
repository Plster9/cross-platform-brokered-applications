///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

"use strict";

import BusinessBase = require("./BusinessBase");
import Constants from "../config/constants/constants";
import Light = require("../domain/light");
import LightPayload = require("../topicPayloads/lightPayload");

/**
 * This class methods are Promisfied because in an app with a data base, this layer would use either callbacks
 * or promises when communicating with the repository layer.
 *
 * I chose Promises so the consumer's code would be simplified.
 */
class RoomMonitorBusiness extends  BusinessBase {

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
}

export = RoomMonitorBusiness;
