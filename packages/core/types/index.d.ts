export class FuncInstance extends Function {
    public bind<T extends FuncInstance>(thisArg: any, ...argArray): T ;

    public before<T extends FuncInstance>(cb: (method?: Function, args?: Array<any>) => void): T ;

    public after<T extends FuncInstance>(cb: (method?: Function, args?: Array<any>, returnValue?: any) => any, adaptAsync?: boolean): T ;

    public then<T extends FuncInstance>(cb: (data?: any) => any): T ;

    public catch<T extends FuncInstance>(cb: (data?: any) => any): T ;

    public finally<T extends FuncInstance>(cb: () => any): T ;
}

interface FuncOptions {
    instanceType?: FuncInstance
}

export function give<T extends Function, F extends FuncInstance>(func?: T | undefined, options?: FuncOptions): F;