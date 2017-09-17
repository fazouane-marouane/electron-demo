import { Entity, Column } from 'typeorm';
import { autoserialize, inheritSerialization } from 'cerialize';
import { BaseModel} from './base-model';

@Entity('dummy', {
    orderBy: (_) => ({
        name: 'ASC'
    })
})
@inheritSerialization(BaseModel)
export class Dummy extends BaseModel {
    @Column('varchar')
    @autoserialize
    public name: string;

    @Column({
        type: 'varchar',
        nullable: true
    })
    @autoserialize
    public description: string;
}
