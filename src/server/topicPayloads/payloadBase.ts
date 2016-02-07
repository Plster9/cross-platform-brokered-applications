"use strict";

abstract class PayloadBase {

    constructor(public deviceId: string, public payloadDate: Date = new Date()) {

        // TypeScript has added support for readonly, hopefully we'll see it soon.
        // https://github.com/Microsoft/TypeScript/pull/6532
    }

}

export = PayloadBase;
