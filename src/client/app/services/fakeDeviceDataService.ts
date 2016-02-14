///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export interface IFakeDeviceDataService {
        registerRoomMonitorFake(deviceId: string, name: string): ng.IPromise<string>;
        setTemperature(deviceId: string, temperature: number): ng.IPromise<string>;
        setMotion(deviceId: string, motionState: MotionState): ng.IPromise<string>;
        setSmoke(deviceId: string, smokeState: SmokeState): ng.IPromise<string>;
        setLight(deviceId: string, lightState: LightState): ng.IPromise<string>;
        shutdown(deviceId: string): ng.IPromise<string>;
    }

    class FakeDeviceDataService implements IFakeDeviceDataService {

        static $inject = ["NetworkService", "constants"];

        constructor(private networkService: INetworkService, private constants: any) {
        }

        setTemperature(deviceId: string, temperature: number): ng.IPromise<string> {
            let data: Object = {
                temperature: {
                    deviceId: deviceId, temperature: temperature
                }
            };
            return this.networkService.post(this.constants.EndPoint.FakeDevice.SetTemperature, data);
        }

        setMotion(deviceId: string, motionState: MotionState): ng.IPromise<string> {
            let data: Object = {
                motion: {
                    deviceId: deviceId, state: motionState
                }
            };
            return this.networkService.post(this.constants.EndPoint.FakeDevice.SetMotion, data);
        }

        setSmoke(deviceId: string, smokeState: SmokeState): ng.IPromise<string> {
            let data: Object = {
                smoke: {
                    deviceId: deviceId, state: smokeState
                }
            };
            return this.networkService.post(this.constants.EndPoint.FakeDevice.SetSmoke, data);
        }

        setLight(deviceId: string, lightState: LightState): ng.IPromise<string> {
            let data: Object = {
                light: {
                    deviceId: deviceId, state: lightState
                }
            };
            return this.networkService.post(this.constants.EndPoint.FakeDevice.SetLight, data);
        }

        shutdown(deviceId: string): ng.IPromise<string> {
            let data: Object = {
                deviceShutdown: {
                    deviceId: deviceId
                }
            };
            return this.networkService.post(this.constants.EndPoint.FakeDevice.Shutdown, data);
        }

        registerRoomMonitorFake(deviceId: string, name: string): ng.IPromise<string> {
            let data: Object = {
                roomMonitor: {
                    deviceId: deviceId, name: name
                }
            };
            return this.networkService.post(this.constants.EndPoint.FakeDevice.Create, data);
        }
    }

    angular
        .module("app")
        .service("FakeDeviceDataService", FakeDeviceDataService);
}
