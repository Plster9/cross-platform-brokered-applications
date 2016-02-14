///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

"use strict";

import mqtt = require("mqtt");
import Constants from "../config/constants/constants";

/**
 * Logger filters out status messages to reduce noise in terminal window.
 * See onTopicReceived below to enable status messages or filter additional messages.
 */
class Logger {

    private mqttClient: any;

    run(): void {
        this.mqttClient = mqtt.connect(Constants.MqttConnectionString);

        this.mqttClient.on(Constants.EventConnect, () => {
                this.outputText("Logger connected to MQTT");

                // noinspection TypeScriptUnresolvedFunction
                this.mqttClient.subscribe(Constants.TopicAllTopics, {qos: 2});
            }
        );

        this.mqttClient.on(Constants.EventMessage, (topic: string, payload: string): void => {
                this.onTopicReceived(topic, payload);
            }
        );
    }

    private onTopicReceived(topic: string, payload: string): void {
        if (topic.indexOf("status") === -1) {
            this.outputText(`Log: ${topic}  Payload: ${payload}`);
        }
    }

    private outputText(text: string): void {
        process.stdout.write(text + "\n");
    }
}


process.title = "cpba-Logger";

let logger: Logger = new Logger();
logger.run();
