export type FunctionReturningAPromise = (...args: any[]) => Promise<any>;

export interface IIpcMapper {
    mapCallers(subject: string, service: object, ...func: FunctionReturningAPromise[]): void;
    mapResponders(subject: string, service: object, ...func: FunctionReturningAPromise[]): void;
}

export const IpcMapperID = Symbol('IpcMapper');
