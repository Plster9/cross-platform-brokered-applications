
"use strict";

import {ChildProcess} from "child_process";

class ProcessItem {

    constructor(public deviceId: string, public process: ChildProcess) {
    }
}

export = ProcessItem;
