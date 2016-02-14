///<reference path="../../../typings/tsd.d.ts" />
///<reference path="../../../typings/appReferences.d.ts" />

namespace app {
    "use strict";

    export class IndexController {

        leftFooterText: string;
        rightFooterText: string;

        static $inject = ["$interval"];

        constructor($interval: any) {
            this.leftFooterText = "{logged in user name}";
            this.showDateTime();
            $interval(() => {
                    this.showDateTime();
                }, 6000
            );

        }

        showDateTime(): void {
            this.rightFooterText = moment().format("dddd MMM D, YYYY h:mm A");
        }
    }

    angular.module("app")
        .controller("IndexController", IndexController);
}
