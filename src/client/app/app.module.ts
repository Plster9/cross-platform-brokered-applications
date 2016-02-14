///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export interface IStateProvider extends angular.ui.IStateProvider {
        /**
         * Convenience method for transitioning to a new state. $state.go calls $state.transitionTo internally but automatically sets options to { location: true, inherit: true, relative: $state.$current, notify: true }. This allows you to easily use an absolute or relative to path and specify only the parameters you'd like to update (while letting unspecified parameters inherit from the currently active ancestor states).
         *
         * @param to Absolute state name or relative state path. Some examples:
         *
         * $state.go('contact.detail') - will go to the contact.detail state
         * $state.go('^') - will go to a parent state
         * $state.go('^.sibling') - will go to a sibling state
         * $state.go('.child.grandchild') - will go to grandchild state
         *
         * @param params A map of the parameters that will be sent to the state, will populate $stateParams. Any parameters that are not specified will be inherited from currently defined parameters. This allows, for example, going to a sibling state that shares parameters specified in a parent state. Parameter inheritance only works between common ancestor states, I.e. transitioning to a sibling will get you the parameters for all parents, transitioning to a child will get you all current parameters, etc.
         *
         * @param options Options object.
         */
        go(to: string, params?: {}, options?: angular.ui.IStateOptions): ng.IPromise<any>;
    }

    export var app: ng.IModule = angular.module("app", ["ui.router", "toaster", "ngAnimate"])
        .config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];
    function config($stateProvider: angular.ui.IStateProvider,
                    $urlRouterProvider: angular.ui.IUrlRouterProvider): any {

        $stateProvider
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "app/dashboard/dashboardView.html",
                controller: "DashboardController as vm"
            })
            .state("fakeRoomMonitor", {
                url: "/fakeRoomMonitor",
                templateUrl: "app/fakeRoomMonitor/fakeRoomMonitorView.html",
                controller: "FakeRoomMonitorController as vm"
            });

        $urlRouterProvider.otherwise("/dashboard");
    }
}
