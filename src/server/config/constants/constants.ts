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
    static TopicAllTopics: string = "/#";

    // MQTT Topics ----------------------------------------------------------------
    static TopicRoomSetTemperature: string = "fakeRoom/{0}/setTemperature";
    static TopicRoomSetMotion: string = "fakeRoom/{0}/setMotion";
    static TopicRoomSetSmoke: string = "fakeRoom/{0}/setSmoke";
    static TopicRoomSetLight: string = "fakeRoom/{0}/setLight";

    static TopicRoomStatus: string = "room/status";
    static TopicRoomRegister: string = "room/register";
    static TopicRoomShutdown: string = "room/shutdown";
    static TopicRoomSwitchLight: string = "room/switchLight";
}

Object.seal(Constants);
