import {Entity, Column, PrimaryColumn} from 'typeorm';
import * as uuid from 'uuid/v4';
import { autoserialize } from 'cerialize';

@Entity<Dummy>('dummy', {
    orderBy: (_) => ({
        name: 'ASC'
    })
})
export class Dummy {
    static create(): Dummy {
        const data = new Dummy();
        data.id = uuid();
        return data;
    }

    @PrimaryColumn({
        type: 'varchar',
        length: 36,
        nullable: false
    })
    @autoserialize
    public id: string;

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
