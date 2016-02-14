///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    angular
        .module("app")
        .constant("constants", {
                FakeRoomMonitorUrl: "/#/fakeRoomMonitor",
                ErrorToastTitle: "Error",
                ToasterPopError: "error",
                EndPoint: {
                    Server: {
                        ApiEndPoint: "http://alpha.lpm.local/api/",     // DEVELOPERS CHANGE ME TO MATCH YOUR SYSTEM
                        SocketIoEndPoint: "http://alpha.lpm.local/"     // DEVELOPERS CHANGE ME TO MATCH YOUR SYSTEM
                    }, FakeDevice: {
                        Create: "roomMonitorFake",
                        Shutdown: "roomMonitorFake/shutdown",
                        SetLight: "roomMonitorFake/setLight",
                        SetMotion: "roomMonitorFake/setMotion",
                        SetSmoke: "roomMonitorFake/setSmoke",
                        SetTemperature: "roomMonitorFake/setTemperature"
                    }, Device: {
                        SwitchLight: "roomMonitor/switchLight"
                    }
                },
                SocketMessage: {
                    DeviceStatus: "deviceStatus",
                    DeviceShutdown: "deviceShutdown",
                    DeviceSwitchLight: "deviceSwitchLight"
                }
            }
        );
}
