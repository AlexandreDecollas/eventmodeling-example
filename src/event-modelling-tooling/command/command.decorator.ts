import { Controller, Module, Type } from '@nestjs/common';
import { CommandMetadata } from './command.metadata';
import { PERSUB_HOOK_METADATA, REDIS_HOOK_METADATA } from '../constants';

export function Command(metadata: CommandMetadata): ClassDecorator {
  return (target: object) => {
    if (metadata.entryPoint.persubName) {
      Reflect.defineMetadata(
        PERSUB_HOOK_METADATA,
        metadata.entryPoint.persubName,
        target,
      );
    }
    if (metadata.entryPoint.externalEventQueue) {
      Reflect.defineMetadata(
        REDIS_HOOK_METADATA,
        metadata.entryPoint.externalEventQueue,
        target,
      );
    }
    Controller({ path: metadata.entryPoint.restPath })(target as any);

    Module({
      providers: metadata.providers,
      imports: metadata.imports,
      exports: metadata.exports,
      controllers: [...(metadata.controllers ?? []), target as Type<any>],
    })(target as any);
  };
}
