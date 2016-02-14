"use strict";

export default class Constants {

    static ServerIP: string = "192.168.1.41";  // DEVELOPERS CHANGE ME TO MATCH YOUR SYSTEM
    static ServerPort: number = 80;
    static MqttConnectionString: string = "mqtt://localhost";
    static ServerStaticDirectory: string = "/client";
    static EventMessage: string = "message";
    static EventConnect: string = "connect";
    static Port: string = "port";

    // SOCKET Messages
    static SocketDeviceStatus: string = "deviceStatus";
    static SocketDeviceShutdown: string = "deviceShutdown";
    static SocketDeviceSwitchLight: string = "deviceSwitchLight";

    // used by logger for listening to the mqtt broker
    static TopicAllTopics: string = "cpba/#";

    // MQTT Topics ----------------------------------------------------------------
    static TopicRoomSetTemperatureFormat: string = "cpba/fakeRoom/{0}/setTemperature";
    static TopicRoomSetMotionFormat: string = "cpba/fakeRoom/{0}/setMotion";
    static TopicRoomSetSmokeFormat: string = "cpba/fakeRoom/{0}/setSmoke";
    static TopicRoomSetLightFormat: string = "cpba/fakeRoom/{0}/setLight";

    static TopicRoomStatus: string = "cpba/room/status";
    static TopicRoomRegister: string = "cpba/room/register";
    static TopicRoomShutdown: string = "cpba/room/shutdown";
    static TopicRoomSwitchLight: string = "cpba/room/switchLight";
}

Object.seal(Constants);
