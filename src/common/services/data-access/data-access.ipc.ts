import { IDummyDataAccess } from '.';
import { injectable } from 'inversify';
import { Dummy } from '../../data-models/dummy';
import { inject } from '../container';
import { IIpcMapper, IpcMapperID } from '../ipc-mapper';

@injectable()
export class IpcDummyDataAccess implements IDummyDataAccess {
    @inject(IpcMapperID)
    private ipcMapper: IIpcMapper;
    constructor() {
        this.ipcMapper.mapCallers('DummyDataAccess', this,
            this.getAll,
            this.getOne,
            this.putOne,
            this.deleteOne
        );
    }

    getAll(): Promise<Dummy[]> {
        return {} as any;
    }
    getOne(_id: string): Promise<Dummy | null> {
        return {} as any;
    }
    deleteOne(_id: string): Promise<void> {
        return {} as any;
    }
    putOne(_data: Dummy): Promise<Dummy> {
        return {} as any;
    }
}
