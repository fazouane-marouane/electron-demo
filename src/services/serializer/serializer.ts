import { Serialize, Deserialize } from 'cerialize';
import { injectable } from 'inversify';
import { ClassConstructor, ISerializer } from '.';

@injectable()
export class Serializer implements ISerializer {
    private registeredTypes: Map<string, ClassConstructor> = new Map();

    registerType(type: ClassConstructor): void {
        this.registeredTypes.set(type.name, type);
    }

    deserialize(payload: { data: object, type: string}): object {
        if (payload.type) {
            const type = this.registeredTypes.get(payload.type);
            return Deserialize(payload.data, type);
        }
        return payload.data;
    }

    static getTypeOfObject(data: any): ClassConstructor | null {
        let type = null;
        while (data) {
            type = data.constructor;
            if ((type === Array || type === Map || type === Set) && data.length > 0) {
                data = data[Symbol.iterator]().next().value;
            } else {
                data = null;
            }
        }
        return type;
    }

    serialize(data: object): object {
        if (data) {
            const type = Serializer.getTypeOfObject(data)!;
            return {
                data: Serialize(data, type),
                type: type.name
            };
        }
        return {
            data,
            type: null
        };
    }
}
