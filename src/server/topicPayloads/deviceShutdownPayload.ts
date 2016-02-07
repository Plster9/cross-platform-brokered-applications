"use strict";

import PayloadBase = require("./payloadBase");

class DeviceShutdownPayload extends PayloadBase {

    constructor(deviceId: string) {
        super(deviceId);
    }
}

export = DeviceShutdownPayload;
