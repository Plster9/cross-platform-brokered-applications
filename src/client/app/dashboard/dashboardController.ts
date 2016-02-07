///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class DashboardController {

        jobs: Array<Job>;
        printers: Array<Printer>;

        static $inject = ["$scope", "$state", "DataService"];

        constructor(private $scope: any,
                    private $state: app.IStateProvider,
                    private dataService: IDataService) {

            this.loadJobs();
            this.loadPrinters();
        }

        initializeSocket(): void {
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

        loadJobs(): void {
            this.dataService.getJobs()
                .then((jobs: Array<Job>) => {
                    this.jobs = jobs;
                })
                .catch((err: any) => {
                    alert(err);
                });
        }

        loadPrinters(): void {
            this.dataService.getPrinters()
                .then((printers: Array<Printer>) => {
                    printers.forEach((p: Printer) => {
                        p.status = "Online";
                    });

                    this.printers = printers;
                    this.initializeSocket();
                })
                .catch((err: any) => {
                    alert(err);
                });
        }

        runJob(job: Job): void {
            this.$state.go("runJob", {_id: job._id});
        }

        resetPrinter(printer: Printer): void {
            this.dataService.resetPrinter(<string>printer.printerId)
                .catch((err: any) => {
                    alert(err);
                });
        }

    }

    angular.module("app")
        .controller("DashboardController", DashboardController);
}
