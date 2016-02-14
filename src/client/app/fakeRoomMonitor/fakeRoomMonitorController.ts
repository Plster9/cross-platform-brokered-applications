///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class FakeRoomMonitorController {

        socket: any;
        roomMonitors: Array<app.RoomMonitor>;

        static $inject = ["$scope", "$state", "$stateParams", "$window", "FakeDeviceDataService", "FormService",
                          "constants"];

        constructor(private $scope: ng.IScope,
                    private $state: app.IStateProvider,
                    private $stateParams: angular.ui.IStateParamsService,
                    private $window: ng.IWindowService,
                    private dataService: IFakeDeviceDataService,
                    private formService: IFormService,
                    private constants: any) {

            this.init();
        }

        private init(): void {
            this.$window.onbeforeunload = this.cleanUp;

            this.roomMonitors = [];

            let rm: RoomMonitor = new RoomMonitor();
            rm.name = "Kitchen";
            rm.deviceId = "RPI2-kitchen";
            this.roomMonitors.push(rm);
            this.register(rm);

            rm = new RoomMonitor();
            rm.name = "Living Room";
            rm.deviceId = "RPI2-living-room";
            this.roomMonitors.push(rm);
            this.register(rm);

            rm = new RoomMonitor();
            rm.name = "Bed Room";
            rm.deviceId = "RPI2-bed-room";
            this.roomMonitors.push(rm);
            this.register(rm);

            this.initializeSocket();
        }


        initializeSocket(): void {
            this.socket = io.connect(this.constants.EndPoint.Server.SocketIoEndPoint);

            this.socket.on(
                "deviceSwitchLight", (data: app.Light) => {
                    let rm: app.RoomMonitor = _.find(this.roomMonitors,
                        (roomMonitor: app.RoomMonitor) => { return roomMonitor.deviceId === data.deviceId; }
                    );
                    if (rm) {
                        this.$scope.$apply(() => {
                                console.log("Setting Light for: " + rm.deviceId);
                                rm.dateTime = data.dateTime;
                                rm.lightState = data.lightState;
                            }
                        );
                    }
                }
            );
        }

        cleanUp(): string {
            if (this.socket) {
                this.socket.close();
            }
            return null;
        }

        register(monitor: app.RoomMonitor): void {
            this.dataService.registerRoomMonitorFake(monitor.deviceId, monitor.name)
                .then((result: any) => {
                        this.formService.showToast("Registered", result.data);
                    }
                )
                .catch((err: any) => {
                        this.formService.showErrorToast(err.toString());
                    }
                );
        }

        setTemperature(monitor: app.RoomMonitor): void {
            this.dataService.setTemperature(monitor.deviceId, monitor.temperature)
                .then((result: any) => {
                        this.formService.showToast("Temperature", result.data);
                    }
                )
                .catch((err: any) => {
                        this.formService.showErrorToast(err.toString());
                    }
                );
        }

        setMotion(monitor: app.RoomMonitor): void {
            this.dataService.setMotion(monitor.deviceId, monitor.motionState)
                .then((result: any) => {
                        this.formService.showToast("Motion", result.data);
                    }
                )
                .catch((err: any) => {
                        this.formService.showErrorToast(err.toString());
                    }
                );
        }

        setSmoke(monitor: app.RoomMonitor): void {
            this.dataService.setSmoke(monitor.deviceId, monitor.smokeState)
                .then((result: any) => {
                        this.formService.showToast("Smoke", result.data);
                    }
                )
                .catch((err: any) => {
                        this.formService.showErrorToast(err.toString());
                    }
                );
        }

        setLight(monitor: app.RoomMonitor): void {
            this.dataService.setLight(monitor.deviceId, monitor.lightState)
                .then((result: any) => {
                        this.formService.showToast("Light", result.data);
                    }
                )
                .catch((err: any) => {
                        this.formService.showErrorToast(err.toString());
                    }
                );
        }

        shutdown(monitor: app.RoomMonitor): void {
            this.dataService.shutdown(monitor.deviceId)
                .then((result: any) => {
                        let index: number = _.findIndex(this.roomMonitors,
                            (m: RoomMonitor) => { return m.deviceId === monitor.deviceId; }
                        );
                        if (index > -1) {
                            this.roomMonitors.splice(index, 1);
                        }
                        this.formService.showToast("Shutdown", result.data);
                    }
                )
                .catch((err: any) => {
                        this.formService.showErrorToast(err.toString());
                    }
                );
        }
    }

    angular.module("app")
        .controller("FakeRoomMonitorController", FakeRoomMonitorController);
}
