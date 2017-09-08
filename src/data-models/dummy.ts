import {Entity, Column, PrimaryColumn} from 'typeorm';
import * as uuid from 'uuid/v4';

@Entity('dummy')
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
    public id: string;
    @Column('varchar')
    public name: string;
    @Column({
        type: 'varchar',
        nullable: true
    })
    public description: string;
}
