export default class Constants {

    static MqttConnectionString: string = "mqtt://localhost";
    static ServerIP: string = "172.16.38.134";
    static ServerPort: number = 80;
    static EventMessage: string = "message";
    static EventConnect: string = "connect";
    static ServerStaticDirectory: string = "/lib/client";
    static Port: string = "port";

    // used by logger for listening to the mqtt broker
    static TopicAllTopics: string = "/#";

    // SOCKET Messages
    static SocketStatus: string = "socketStatus";
    static SocketDeviceShutdown: string = "socketDeviceShutdown";

    // ROOM Topics ----------------------------------------------------------------

    // ROOM inbound fake monitoring device topics
    static TopicRoomFakeSetTemperature: string = "roomMock/{0}/setTemperature";
    static TopicRoomFakeSetMotion: string = "roomMock/{0}/setMotion";
    static TopicRoomFakeSetSmoke: string = "roomMock/{0}/setSmoke";
    static TopicRoomFakeSetLight: string = "roomMock/{0}/setLight";

    // ROOM inbound real monitoring device topics
    static TopicRoomSetLight: string = "room/{0}/setLight";

    // ROOM outbound real and fake monitoring device topics
    static TopicRoomStatus: string = "room/status";
    static TopicRoomRegister: string = "room/register";
    static TopicRoomShutdown: string = "room/shutdown";

}
Object.seal(Constants);
