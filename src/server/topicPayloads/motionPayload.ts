"use strict";

import PayloadBase = require("./payloadBase");
import MotionState = require("../domain/motionState");

class MotionPayload extends PayloadBase {

    constructor(deviceId: string, public motionState: MotionState) {
        super(deviceId);
    }
}

export = MotionPayload;
