///<reference path="../typings/tsd.d.ts" />
///<reference path="../typings/appReferences.d.ts" />

// http://www.hacksparrow.com/difference-between-spawn-and-exec-of-node-js-child_process.html
// http://krasimirtsonev.com/blog/article/Nodejs-managing-child-processes-starting-stopping-exec-spawn

"use strict";

process.title = "cpba";

let child_process: any = require("child_process");

try {
    let childLogger: any = child_process.spawn("node", ["lib/server/logger/logger.js"],
        {stdio: ["inherit"], encoding: "utf8"}
    );
    childLogger.stdout.pipe(process.stdout);
    childLogger.stderr.pipe(process.stderr);
} catch (e) {
    console.log(e);
    process.exit(-1);
}

try {
    let child: any = child_process.spawn("node", ["lib/server/webServer/webServer.js"],
        {stdio: ["inherit"], encoding: "utf8"}
    );
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
} catch (e) {
    console.log(e);
    process.exit(-1);
}
