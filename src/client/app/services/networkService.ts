///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export interface INetworkService {
        get(paramString: string): ng.IHttpPromise<any>;
        post(paramString: string, data: Object): ng.IHttpPromise<any>;
    }

    class NetworkService implements INetworkService {

        static $inject = ["$http", "constants"];

        constructor(private $http: ng.IHttpService, private constants: any) {
        }

        get(paramString: string): ng.IHttpPromise<any> {
            return this.$http.get(this.makeUrl(paramString), this.headerFactory());
        }

        post(paramString: string, data: Object): ng.IHttpPromise<any> {
            return this.$http.post(this.makeUrl(paramString), JSON.stringify(data), this.headerFactory());
        }

        private headerFactory(): Object {
            return {headers: {"Content-type": "application/json"}};
        }

        private makeUrl(paramString: string): string {
            return this.constants.EndPoint.Server.ApiEndPoint + paramString;
        }
    }

    angular
        .module("app")
        .service("NetworkService", NetworkService);
}
