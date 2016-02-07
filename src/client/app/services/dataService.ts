///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    const baseUrl: string = "http://172.16.38.134/";

    export interface IDataService {
        registerRoomMonitorFake(deviceId: string, name: string): ng.IPromise<string>;
    }

    class DataService implements IDataService {

        static $inject = ["$http", "$q"];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
        }

        setTemperature(deviceId: string, temperature: number) : ng.IPromise<string> {
            let data: Object = {
                roomMonitor: {
                    deviceId: deviceId,
                    name: name
                }
            };

            let deferred: any = this.$q.defer();
            this.$http.post(`${baseUrl}roomMonitorFake`, data)
                .then(() => {
                    deferred.resolve();
                })
                .catch((err: any) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        registerRoomMonitorFake(deviceId: string, name: string): ng.IPromise<string> {
            let data: Object = {
                roomMonitor: {
                    deviceId: deviceId,
                    name: name
                }
            };

            let deferred: any = this.$q.defer();
            this.$http.post(`${baseUrl}roomMonitorFake`, data)
                .then(() => {
                    deferred.resolve();
                })
                .catch((err: any) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    }

    angular
        .module("app")
        .service("DataService", DataService);
}
