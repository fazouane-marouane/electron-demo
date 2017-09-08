export type ClassConstructor = new(...args: any[]) => object;

export interface ISerializer {
    registerType(type: ClassConstructor): void;

    deserialize(payload: { data: object, type: string}): object;

    serialize(data: object): object;
}

export const SerializerID = Symbol('Serializer');
