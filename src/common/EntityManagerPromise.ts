
import { Connection, ObjectType, FindManyOptions, FindOneOptions, RemoveOptions, SaveOptions } from 'typeorm';

export class EntityManagerPromise {
    constructor(private connectionPromise: Promise<Connection>) {}
    async find<Entity>(entityClass: ObjectType<Entity> | string, options?: FindManyOptions<Entity> | Partial<Entity>): Promise<Entity[]> {
        const connection = await this.connectionPromise;
        return await connection.manager.find(entityClass, options);
    }

    // tslint:disable-next-line:max-line-length
    async findOneById<Entity>(entityClass: ObjectType<Entity> | string, id: any, options?: FindOneOptions<Entity> | Partial<Entity>): Promise<Entity | undefined> {
        const connection = await this.connectionPromise;
        return await connection.manager.findOneById(entityClass, id, options);
    }

    async removeById<Entity>(targetOrEntity: ObjectType<Entity> | string, id: any, options?: RemoveOptions): Promise<void> {
        const connection = await this.connectionPromise;
        return await connection.manager.removeById(targetOrEntity, id, options);
    }

    save<Entity>(entity: Entity, options?: SaveOptions): Promise<Entity>;
    save<Entity>(entities: Entity[], options?: SaveOptions): Promise<Entity[]>;
    async save<Entity>(entities: Entity | Entity[], options?: SaveOptions): Promise<Entity | Entity[]> {
        const connection = await this.connectionPromise;
        return await connection.manager.save(entities, options);
    }
}
