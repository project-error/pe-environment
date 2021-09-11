import { Base } from '../base/Base';
import { container, singleton } from 'tsyringe';
import { constructor } from 'tsyringe/dist/typings/types';

export function ServerController<T>() {
  return function (target: constructor<T>) {
    singleton()(target);
    container.registerSingleton('server-controller', target);
    Base.modules.set(target.name, target.name);
  };
}
