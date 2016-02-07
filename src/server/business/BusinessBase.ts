///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

"use strict";

import mqtt = require("mqtt");
import Constants from "../config/constants/constants";

abstract class BusinessBase {

    protected publishTopic(topic: string, payload: Object): void {
        let client: any = mqtt.connect(Constants.MqttConnectionString);

        // noinspection TypeScriptUnresolvedFunction
        client.publish(topic, JSON.stringify(payload), {qos: 2});
        client.end();
    }
}

export = BusinessBase;
