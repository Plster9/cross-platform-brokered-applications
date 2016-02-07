"use strict";

import PayloadBase = require("./payloadBase");

class RegisterDevicePayload extends PayloadBase {

    constructor(deviceId: string, public name: string) {
        super(deviceId);
    }
}

export = RegisterDevicePayload;
