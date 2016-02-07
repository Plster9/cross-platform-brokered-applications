declare var MqttServer: any, MqttSecureServer: any, MqttClient: any, MqttConnection: any, fs: any, connect: any, Store: any, net: any, defaultHost: string, defaultPort: number;
declare function cli(): void;

declare var mqtt: any;

declare module 'mqtt' {
    export = mqtt;
}
