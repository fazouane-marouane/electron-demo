export interface IIpcMapper {
    mapCaller<T>(subject: string, service: object, func: (...args: any[]) => Promise<T>): void;
    mapResponder<T>(subject: string, service: object, func: (...args: any[]) => Promise<T>): void;
}

export const IpcMapperID = Symbol('IpcMapper');
