///<reference path="../../../../typings/tsd.d.ts" />
///<reference path="../../../../typings/appReferences.d.ts" />

// toaster github:  https://github.com/jirikavi/AngularJS-Toaster
// toaster plunker with examples for using API:  http://plnkr.co/edit/HKTC1a?p=preview

namespace app {
    "use strict";

    export interface IFormService {
        showErrorToast(message: string): void;
        showToast(title: string, message: string): void;
    }

    class FormService implements IFormService {

        static $inject = ["$timeout", "toaster", "constants"];

        constructor(private $timeout: ng.ITimeoutService, private toaster: any, private constants: any) {
        }

        showErrorToast(message: string): void {
            this.$timeout(() => {
                    this.toaster.pop(this.constants.ToasterPopError, this.constants.ErrorToastTitle, message, 10000);
                }, 0
            );
        }

        showToast(title: string, message: string): void {
            this.$timeout(() => {
                    this.toaster.success({title: title, body: message});
                }, 0
            );
        }
    }

    angular
        .module("app")
        .service("FormService", FormService);
}
