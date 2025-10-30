// Angular core mocks
export const Injectable = () => {
  return (constructor: any) => {
    return constructor;
  };
};

export const inject = () => {
  return (constructor: any) => {
    return constructor;
  };
};

// Add other Angular mocks as needed
export class Router {
  navigate() {
    return Promise.resolve(true);
  }
}

// RxJS operators and functions
export const of = (...args: any[]) => ({
  pipe: () => of(...args),
  subscribe: (callback: Function) => callback(args),
});

export const throwError = (error: any) => ({
  pipe: () => throwError(error),
  subscribe: (callback: Function, errorCallback: Function) => errorCallback(error),
});

export const tap = (callback: Function) => (source: any) => source;
export const catchError = (callback: Function) => (source: any) => source;
export const switchMap = (callback: Function) => (source: any) => source;

// Add other mocks as needed
