///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

"use strict";

import mqtt = require("mqtt");
import Constants from "../config/constants/constants";

abstract class BusinessBase {

    protected publishTopic(topic: string, payload: Object): void {
        let mqttClient: any = mqtt.connect(Constants.MqttConnectionString);

        mqttClient.on(Constants.EventConnect, () => {

            // noinspection TypeScriptUnresolvedFunction
            mqttClient.publish(topic, JSON.stringify(payload), {qos: 2});
            mqttClient.end();
            }
        );
    }
}

export = BusinessBase;
