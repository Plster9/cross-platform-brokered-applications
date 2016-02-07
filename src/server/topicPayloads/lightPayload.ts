"use strict";

import PayloadBase = require("./payloadBase");
import LightState = require("../domain/lightState");

class LightPayload extends PayloadBase {

    constructor(deviceId: string, public lightState: LightState) {
        super(deviceId);
    }
}

export = LightPayload;
