// tslint:disable:no-var-requires no-require-imports
import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';
import { interfaces } from 'inversify';
import { app } from 'electron';
import { LazyContainer } from './LazyContainer';

const isMainProcess: boolean = !!app;

const container = new LazyContainer(() => {
    return (isMainProcess
        ? require('./container.main.ts')
        : require('./container.renderer.ts')).default;
});

export const {lazyInject: inject} = getDecorators(container);

export function getService<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    return container.get<T>(serviceIdentifier);
}
