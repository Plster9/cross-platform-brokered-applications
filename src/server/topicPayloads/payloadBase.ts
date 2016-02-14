"use strict";

abstract class PayloadBase {

    constructor(public deviceId: string, public dateTime: Date = new Date()) {
    }

}

export = PayloadBase;
