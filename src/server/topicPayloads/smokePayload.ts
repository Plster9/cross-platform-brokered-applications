"use strict";

import PayloadBase = require("./payloadBase");
import SmokeState = require("../domain/smokeState");

class SmokePayload extends PayloadBase {

    constructor(deviceId: string, public smokeState: SmokeState) {
        super(deviceId);
    }
}

export = SmokePayload;
