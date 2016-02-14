///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export interface IDataService {
        switchLight(deviceId: string, lightState: LightState): ng.IPromise<string>;
    }

    class DataService implements IDataService {

        static $inject = ["NetworkService", "constants"];

        constructor(private networkService: INetworkService, private constants: any) {
        }


        switchLight(deviceId: string, lightState: LightState): ng.IPromise<string> {
            let data: Object = {
                light: {
                    deviceId: deviceId, state: lightState
                }
            };
            return this.networkService.post(this.constants.EndPoint.Device.SwitchLight, data);
        }

    }

    angular
        .module("app")
        .service("DataService", DataService);
}
