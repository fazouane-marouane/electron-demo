// tslint:disable:no-var-requires no-require-imports
import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';
import { Container, interfaces } from 'inversify';
import { app } from 'electron';

const isMainProcess: boolean = !!app;

const container: Container = (isMainProcess
    ? require('./container.main.ts')
    : require('./container.renderer.ts')).default;
export const { lazyInject} = getDecorators(container);
export function getService<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
    return container.get<T>(serviceIdentifier);
}
