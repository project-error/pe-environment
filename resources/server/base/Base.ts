import { DependencyContainer } from 'tsyringe';

export class Base {
  static modules: Map<string, string>;

  static container: DependencyContainer;

  bootstrap() {
    Base.container.afterResolution('server-controller', (_t, result: any[]) => {
      for (const controller of result) {
        controller.init();
      }
    });

    Base.container.resolveAll('server-controller');
  }
}
