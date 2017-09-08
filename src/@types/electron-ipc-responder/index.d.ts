declare module 'electron-ipc-responder' {
    class IPCResponder {
        constructor(send: Function, on: Function);
        ask(topic: string, payload: any): Promise<any>;
        tell(topic: string, payload: any): Promise<void>;
        registerTopic(topic: string, handler: Function): void;
    }

    namespace IPCResponder{
    }
    export = IPCResponder
    
}
