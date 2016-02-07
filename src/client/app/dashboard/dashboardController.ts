///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class DashboardController {



        static $inject = ["$scope", "$state", "DataService"];

        constructor(private $scope: any,
                    private $state: app.IStateProvider,
                    private dataService: IDataService) {

        }

        fakeRoomMonitor(): void {
            this.$state.go("fakeRoomMonitor");
        }

 /*       initializeSocket(): void {
            let socket: any = io.connect("http://172.16.38.131/");
            let p: Array<Printer> = this.printers;
            let j: Array<Job> = this.jobs;

            socket.on("printerStatus", (data: any) => {
                let printer: Printer = _.find(p, (prn: Printer) => {
                    return prn.printerId === data.printerId;
                });

                if (printer) {
                    this.$scope.apply(() => {
                        printer.status = data.status;
                    });
                }
            });

            socket.on("jobCompleted", (data: any) => {
                let job: Job = _.find(j, (jb: Job) => {
                    return jb.jobId === data;
                });

                if (job) {
                    this.$scope.apply(() => {
                        job.status = "Printed";
                    });
                }
            });
        }
*/

    }

    angular.module("app")
        .controller("DashboardController", DashboardController);
}
