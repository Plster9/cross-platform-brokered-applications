"use strict";

import PayloadBase = require("./payloadBase");

class RegisterDevicePayload extends PayloadBase {

    constructor(deviceId: string, public deviceName: string) {
        super(deviceId);
    }
}

export = RegisterDevicePayload;
