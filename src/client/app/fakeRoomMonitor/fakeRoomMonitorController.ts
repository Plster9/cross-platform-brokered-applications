///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class FakeRoomMonitorController {

        public deviceId: string;
        public name: string;
        public registerRoomMonitorFake: boolean = true;
        public registered: boolean = false;
        public temperature: number = 65;

        static $inject = ["$state", "$stateParams", "DataService"];
        constructor(private $state: app.IStateProvider,
                    private $stateParams: angular.ui.IStateParamsService,
                    private dataService: IDataService) {
        }

        register(): void {
            this.dataService.registerRoomMonitorFake(this.deviceId, this.name)
                .then(() => {
                    this.registerRoomMonitorFake = false;
                    this.registered = true;
                })
                .catch((err: any) => {
                    alert(err);
                });
        }

        setTemperature(): void {

        }
    }

    angular.module("app")
        .controller("FakeRoomMonitorController", FakeRoomMonitorController);
}
