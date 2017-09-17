import {PrimaryColumn} from 'typeorm';
import * as uuid from 'uuid/v4';
import { autoserialize } from 'cerialize';

type StaticThis<T> = { new (): T };

export class BaseModel {
    static create<TModel extends BaseModel>(this: StaticThis<TModel>): TModel {
        const data = new this();
        data.id = uuid();
        return data;
    }

    @PrimaryColumn('uuid')
    @autoserialize
    public id: string;
}
