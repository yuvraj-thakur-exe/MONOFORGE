import { dev } from '#/utils/dev';

import type { TransitionStore } from './transitions-store';
import type { DispatchConfig, Dispose, Handler } from './types';

interface PendingDispatch {
  payload?: unknown;
  config?: DispatchConfig;
  resolve: (value: unknown) => void;
  reject: (err: unknown) => void;
}

export class CommandBus {
  private handlers: Map<string, Handler> = new Map();
  private pendingQueue: Map<string, PendingDispatch[]> = new Map();

  constructor(private readonly transition: TransitionStore) {}

  handle<TPayload = unknown, TResult = void>(
    command: string,
    handler: Handler<TPayload, TResult>
  ): Dispose {
    if (this.handlers.has(command)) {
      dev.run(() =>
        console.error(
          `[command]: already exist a handle registered for ${command}`
        )
      );
      return () => null;
    }

    this.handlers.set(command, handler as Handler);

    // Drain queued dispatches that arrived before the handler was registered
    const pending = this.pendingQueue.get(command);
    if (pending && pending.length > 0) {
      this.pendingQueue.delete(command);
      for (const item of pending) {
        const transitionKey = item.config?.transition
          ? item.config.transition
          : [command];
        this.transition.start(transitionKey);
        Promise.resolve(handler(item.payload as TPayload))
          .then((res) => item.resolve(res))
          .catch((err) => item.reject(err))
          .finally(() => this.transition.done(transitionKey));
      }
    }

    return () => this.dispose(command);
  }

  async dispatch<TResult = void>(
    command: string,
    payload?: unknown,
    config?: DispatchConfig
  ): Promise<TResult | undefined> {
    dev.run(() => console.info(`[command dispatched]: ${command}`, payload));

    const handler = this.handlers.get(command);
    if (!handler) {
      // Queue early dispatches (e.g. extension registrations during module load)
      return new Promise<TResult | undefined>((resolve, reject) => {
        if (!this.pendingQueue.has(command)) {
          this.pendingQueue.set(command, []);
        }
        this.pendingQueue.get(command)?.push({
          payload,
          config,
          resolve: resolve as (value: unknown) => void,
          reject,
        });
      });
    }

    const transitionKey = config?.transition ? config.transition : [command];
    this.transition.start(transitionKey);

    try {
      return (await handler(payload)) as TResult;
    } finally {
      this.transition.done(transitionKey);
    }
  }

  dispose(command: string): void {
    this.handlers.delete(command);
    this.pendingQueue.delete(command);
  }
}
