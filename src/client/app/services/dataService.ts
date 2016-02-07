///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    const baseUrl: string = "http://172.16.38.131/";

    export class Job {
        _id: string;
        jobId: string;
        dateRequired: Date;
        status: string;
        description: string;
        labelStock: string;
        quantity: number;
        printerId: string;
        datePrinted: Date;
        printedBy: string;
    }

    export class Printer {
        _id: string;
        printerId: String;
        name: String;
        location: String;
        status: String;
    }

    export interface IDataService {
        getJob(_id: string): ng.IPromise<Job>;
        getJobs(): ng.IPromise<Job[]>;
        getPrinters(): ng.IPromise<Printer[]>;
        resetPrinter(printerId: string): ng.IPromise<void>;
        runJob(_id: string, printerId: string): ng.IPromise<void>;
    }

    class DataService implements IDataService {

        static $inject = ["$http", "$q"];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

        }

        resetPrinter(printerId: string): ng.IPromise<void> {
            let data: Object = {
                printerId: printerId,
                operator: "Operator Name"
            };

            let deferred: any = this.$q.defer();
            this.$http.post(`${baseUrl}printers/resetPrinter`, data)
                .then(() => {
                    deferred.resolve();
                })
                .catch((err: any) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        runJob(_id: string, printerId: string): ng.IPromise<void> {
            let data: Object = {
                _id: _id,
                printerId: printerId,
                operator: "Operator Name"
            };

            let deferred: any = this.$q.defer();
            this.$http.post(`${baseUrl}jobs/runJob`, data)
                .then(() => {
                    deferred.resolve();
                })
                .catch((err: any) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        getJobs(): ng.IPromise<Job[]> {
            let deferred: any = this.$q.defer();
            this.$http.get(`${baseUrl}jobs`)
                .then((response: any) => {
                    deferred.resolve(response.data);
                })
                .catch((err: any) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        getJob(_id: string): ng.IPromise<Job> {
            let deferred: any = this.$q.defer();
            this.$http.get(`${baseUrl}jobs/${_id}`)
                .then((response: any) => {
                    deferred.resolve(response.data);
                })
                .catch((err: any) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        getPrinters(): ng.IPromise<Printer[]> {
            let deferred: any = this.$q.defer();
            this.$http.get(`${baseUrl}printers`)
                .then((response: any) => {
                    deferred.resolve(response.data);
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
