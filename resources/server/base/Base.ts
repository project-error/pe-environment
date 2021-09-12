import { container } from 'tsyringe';

export class Base {
  static container = container;

  bootstrap() {
    Base.container.beforeResolution('server-controller', (_t, result: any) => {
      console.log('Initializing controllers');
    });

    Base.container.afterResolution('server-controller', (_t, result: any) => {
      for (const controller of result) {
        console.log(`Controller [${controller.name}] Initialized`);
      }
    });
    Base.container.resolveAll('server-controller');
  }
}
