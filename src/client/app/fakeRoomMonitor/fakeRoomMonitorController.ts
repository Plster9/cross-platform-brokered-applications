///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class FakeRoomMonitorController {

        job: Job;
        printers: Array<Printer>;

        static $inject = ["$state", "$stateParams", "DataService"];

        constructor(private $state: app.IStateProvider,
                    private $stateParams: angular.ui.IStateParamsService,
                    private dataService: IDataService) {

            this.loadPrinters();
            this.loadJob();
        }

        loadJob(): void {
            let _id: string = this.$stateParams["_id"];
            this.dataService.getJob(_id)
                .then((job: Job) => {
                    this.job = job;
                })
                .catch((err: any) => {
                    alert(err);
                });
        }

        loadPrinters(): void {
            this.dataService.getPrinters()
                .then((printers: Array<Printer>) => {
                    this.printers = printers;
                })
                .catch((err: any) => {
                    alert(err);
                });
        }

        cancel(): void {
            this.$state.go("dashboard");
        }

        runJob(): void {
            this.dataService.runJob(this.job._id, this.job.printerId)
                .then(() => {
                    this.$state.go("dashboard");
                })
                .catch((err: any) => {
                    alert(err);
                });
        }

    }

    angular.module("app")
        .controller("FakeRoomMonitorController", FakeRoomMonitorController);
}
