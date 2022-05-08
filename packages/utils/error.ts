class HyperUIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HyperUIError';
    }
}

export function throwError(scope: string, message: string): never {
    throw new HyperUIError(`[${scope}] ${message}`);
}

export function debugWarn(scope: string, message: string): void {
    if(process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line-no-console
        console.warn(new HyperUIError(`[${scope}] ${message}`));
    }
}