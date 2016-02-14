namespace app {
    "use strict";

    export enum LightState {
        Off,
        On
    }

    export enum MotionState {
        None,
        Movement
    }

    export enum SmokeState {
        None,
        Smoking
    }

    export class RoomMonitor {

        deviceId: string;
        name: string;
        temperature: number = 65;
        lightState: LightState = LightState.Off;
        motionState: MotionState = MotionState.None;
        smokeState: SmokeState = SmokeState.None;
        dateTime: Date = new Date();
    }
}








