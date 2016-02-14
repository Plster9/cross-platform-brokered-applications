///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class Light {

        deviceId: string;
        dateTime: Date = new Date();
        lightState: LightState;
    }
}
