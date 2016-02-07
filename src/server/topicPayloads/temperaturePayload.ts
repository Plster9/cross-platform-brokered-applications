"use strict";

import PayloadBase = require("./payloadBase");

class TemperaturePayload extends PayloadBase {

    constructor(deviceId: string, public temperature: number) {
        super(deviceId);
    }
}

export = TemperaturePayload;
