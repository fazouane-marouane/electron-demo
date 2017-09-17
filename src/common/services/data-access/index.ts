import { Dummy } from '../../data-models/dummy';

export interface IDummyDataAccess {
    getAll(): Promise<Dummy[]>;
    getOne(id: string): Promise<Dummy | null>;
    deleteOne(id: string): Promise<void>;
    putOne(data: Dummy): Promise<void>;
}

export const DummyDataAccessID = Symbol('DummyDataAccess');
