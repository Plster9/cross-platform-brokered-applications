"use strict";

import PayloadBase = require("./payloadBase");
import MotionState = require("../domain/motionState");
import SmokeState = require("../domain/smokeState");
import LightState = require("../domain/lightState");

class RoomMonitorStatusPayload extends PayloadBase {

    constructor(deviceId: string, public name: string, public temperature: number, public lightState: LightState,
                public motionState: MotionState, public smokeState: SmokeState) {
        super(deviceId);
    }

}

export = RoomMonitorStatusPayload;
