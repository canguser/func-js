export class FuncInstance extends Function {

    public id: string;
    public trans: Object;
    public uniqueId: string;

    protected initAssign<T extends FuncInstance>(target?: T): void;

    public bind<T extends FuncInstance>(thisArg: any, ...argArray): T ;

    public before<T extends FuncInstance>(cb: (method?: Function, args?: Array<any>, extra?: { trans: Object, preventDefault: Function }) => void): T ;

    public after<T extends FuncInstance>(cb: (method?: Function, args?: Array<any>, returnValue?: any, extra?: { trans: Object }) => any, adaptAsync?: boolean): T ;

    public then<T extends FuncInstance>(cb: (data?: any) => any): T ;

    public catch<T extends FuncInstance>(cb: (data?: any) => any): T ;

    public finally<T extends FuncInstance>(cb: () => any): T ;
}

interface FuncOptions {
    instanceType?: FuncInstance
}

export function give<T extends Function, F extends FuncInstance>(func?: T | undefined, options?: FuncOptions): F;