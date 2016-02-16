///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class DashboardController {

        socket: any;
        fakeRoomMonitorsLaunched: boolean = false;
        roomMonitors: Array<app.RoomMonitor>;

        static $inject = ["$scope", "$window", "DataService", "FormService", "constants"];

        constructor(private $scope: any,
                    private $window: ng.IWindowService,
                    private dataService: IDataService,
                    private formService: IFormService,
                    private constants: any) {

            this.roomMonitors = [];
            $window.onbeforeunload = this.cleanUp;
            this.initializeSocket();
        }

        switchLight(monitor: app.RoomMonitor): void {
            this.dataService.switchLight(monitor.deviceId, monitor.lightState)
                .then((result: any) => {
                        this.formService.showToast("Light", result.data);
                    }
                )
                .catch((err: any) => {
                        this.formService.showErrorToast(err.toString());
                    }
                );
        }

        cleanUp(): string {
            if (this.socket) {
                this.socket.close();
            }
            return null;
        }

        launchFakeRoomMonitors(): void {
            this.fakeRoomMonitorsLaunched = true;
            this.$window.open(this.constants.FakeRoomMonitorUrl, "_blank");
        }

        useDashboardOnly(): void {
            this.fakeRoomMonitorsLaunched = true;
        }

        initializeSocket(): void {
            this.socket = io.connect(this.constants.EndPoint.Server.SocketIoEndPoint);

            this.socket.on(this.constants.SocketMessage.DeviceStatus, (data: app.RoomMonitor) => {
                    let rm: app.RoomMonitor = _.find(this.roomMonitors,
                        (roomMonitor: app.RoomMonitor) => { return roomMonitor.deviceId === data.deviceId; }
                    );
                    this.$scope.$apply(() => {
                            if (rm) {
                                rm.dateTime = data.dateTime;
                                rm.lightState = data.lightState;
                                rm.motionState = data.motionState;
                                rm.smokeState = data.smokeState;
                                rm.temperature = data.temperature;
                            } else {
                                this.roomMonitors.push(data);
                            }
                        }
                    );
                }
            );

            this.socket.on(this.constants.SocketMessage.DeviceShutdown, (data: app.DeviceShutdown) => {
                    let index: number = _.findIndex(this.roomMonitors,
                        (roomMonitor: app.RoomMonitor) => { return roomMonitor.deviceId === data.deviceId; }
                    );
                    this.$scope.$apply(() => {
                            if (index > -1) {
                                this.roomMonitors.splice(index, 1);
                            }
                        }
                    );
                }
            );
        }
    }

    angular.module("app")
        .controller("DashboardController", DashboardController);
}
