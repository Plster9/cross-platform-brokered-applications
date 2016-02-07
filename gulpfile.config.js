'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './src/';
        this.sourceApp = this.source;
        this.tsOutputPath = './lib';
        this.allTypeScript = this.sourceApp + '**/*.ts';
        this.typings = './typings/';
        this.lib = this.sourceApp + './client/**/*';
        this.libIgnore = '!' + this.sourceApp + './client/**/*.ts';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
        this.appTypeScriptReferences = this.typings + 'appReferences.d.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;