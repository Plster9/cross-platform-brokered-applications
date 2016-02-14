///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

"use strict";

import BusinessBase = require("./BusinessBase");
import Constants from "../config/constants/constants";
import Light = require("../domain/light");
import LightPayload = require("../topicPayloads/lightPayload");

class RoomMonitorBusiness extends BusinessBase {

    switchLight(light: Light): Promise<string> {
        return new Promise((resolve: any, reject: any): void => {
                try {
                    let payload: LightPayload = new LightPayload(light.deviceId, light.state);
                    super.publishTopic(Constants.TopicRoomSwitchLight, payload);
                    resolve("Switch light requested");
                } catch (e) {
                    reject(e);
                }
            }
        );
    }
}

export = RoomMonitorBusiness;
