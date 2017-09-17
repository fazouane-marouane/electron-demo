import { interfaces } from 'inversify';

export class LazyContainer implements interfaces.Container {
    constructor(private parentBuilder: () => interfaces.Container) {}
    get guid(): string {
        return this.container.guid;
    }
    set guid(value: string) {
        this.container.guid = value;
    }
    parent: interfaces.Container | null;
    get options(): interfaces.ContainerOptions {
        return this.container.options;
    }
    set options(value: interfaces.ContainerOptions) {
        this.container.options = value;
    }
    bind<T>(serviceIdentifier: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>): interfaces.BindingToSyntax<T> {
        return this.container.bind<T>(serviceIdentifier);
    }
    rebind<T>(serviceIdentifier: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>): interfaces.BindingToSyntax<T> {
        return this.container.rebind<T>(serviceIdentifier);
    }
    unbind(serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>): void {
        return this.container.unbind(serviceIdentifier);
    }
    unbindAll(): void {
        return this.container.unbindAll();
    }
    isBound(serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>): boolean {
        return this.container.isBound(serviceIdentifier);
    }
    isBoundNamed(serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, named: string | number | symbol): boolean {
        return this.container.isBoundNamed(serviceIdentifier, named);
    }
    // tslint:disable-next-line:max-line-length
    isBoundTagged(serviceIdentifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>, key: string | number | symbol, value: any): boolean {
        return this.container.isBoundTagged(serviceIdentifier, key, value);
    }
    get<T>(serviceIdentifier: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>): T {
        return this.container.get<T>(serviceIdentifier);
    }
    getNamed<T>(serviceIdentifier: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>, named: string | number | symbol): T {
        return this.container.getNamed<T>(serviceIdentifier, named);
    }
    getTagged<T>(serviceIdentifier: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>, key: string | number | symbol, value: any): T {
        return this.container.getTagged<T>(serviceIdentifier, key, value);
    }
    getAll<T>(serviceIdentifier: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>): T[] {
        return this.container.getAll<T>(serviceIdentifier);
    }
    resolve<T>(constructorFunction: interfaces.Newable<T>): T {
        return this.container.resolve<T>(constructorFunction);
    }
    load(...modules: interfaces.ContainerModule[]): void {
        return this.container.load(...modules);
    }
    unload(...modules: interfaces.ContainerModule[]): void {
        return this.container.unload(...modules);
    }
    applyCustomMetadataReader(metadataReader: interfaces.MetadataReader): void {
        return this.container.applyCustomMetadataReader(metadataReader);
    }
    applyMiddleware(...middleware: interfaces.Middleware[]): void {
        return this.container.applyMiddleware(...middleware);
    }
    snapshot(): void {
        return this.container.snapshot();
    }
    restore(): void {
        return this.container.restore();
    }
    createChild(): interfaces.Container {
        return this.container.createChild();
    }
    get container(): interfaces.Container {
        if (!this.parent) {
            this.parent = this.parentBuilder();
        }
        return this.parent;
    }
}
