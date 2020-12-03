export class FuncInstance extends Function {

    public id: string;
    public uniqueId: string;

    protected initAssign<T extends FuncInstance>(target?: T): void;

    public bind<T extends FuncInstance>(thisArg: any, ...argArray): T | Function ;

    public before<T extends FuncInstance>(cb: (params?: { origin?: Object, args?: Array<any>, preventDefault?: Function }, adaptAsync?: boolean) => any): T | Function ;

    public after<T extends FuncInstance>(cb: (params?: { origin?: Object, args?: Array<any>, lastValue?: any }) => any, adaptAsync?: boolean): T | Function ;

    public surround<T extends FuncInstance>(options?: {
        before?: (
            params?: {
                origin?: Object, args?: Array<any>, preventDefault?: Function, trans?: Object
            }
        ) => any,
        after?: (
            params?: {
                origin?: Object, args?: Array<any>, lastValue?: any, trans?: Object
            }
        ) => any,
        onError?: (
            params?: {
                origin?: Object, args?: Array<any>, error?: Object, resolve?: (msg?: string) => void, trans?: Object
            }
        ) => any,
        adaptAsync?: boolean,
    }): T | Function ;

    public then<T extends FuncInstance>(cb: (data?: any) => any): T | Function ;

    public catch<T extends FuncInstance>(cb: (data?: any) => any): T | Function ;

    public finally<T extends FuncInstance>(cb: () => any): T | Function ;
}

interface FuncOptions {
    instanceType?: Function
}

export function give<T extends Function, F extends FuncInstance>(func?: T | undefined, options?: FuncOptions): F | Function;