import LightState = require("../domain/lightState");
"use strict";

import PayloadBase = require("./payloadBase");
import MotionDetectedState = require("../domain/motionState");
import SmokeDetectedState = require("../domain/smokeState");

class RoomMonitorStatusPayload extends PayloadBase {

    constructor(deviceId: string, public temperature: number, public lightState: LightState,
                public motionState: MotionDetectedState, public smokeState: SmokeDetectedState) {
        super(deviceId);
    }

}

export = RoomMonitorStatusPayload;
