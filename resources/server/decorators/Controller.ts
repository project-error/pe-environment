import { Base } from '../base/Base';
import { singleton } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';

export function ServerController<T>(name: string) {
  return function (target: constructor<T>) {
    target.prototype.name = name;

    singleton()(target);
    Base.container.registerSingleton('server-controller', target);
  };
}
