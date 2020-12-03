/**
 *
 */
export class FuncInstance extends Function {
    constructor(...args: string[]);
    /**
     * @callback resolveCallback
     * @param res{*=}
     */
    /**
     * @callback beforeCallback
     * @param params{Object=}
     * @param params.origin{Function=}
     * @param params.args{Array<*>=}
     * @param params.preventDefault{Function=}
     * @param params.trans{Object=}
     */
    /**
     * @callback afterCallback
     * @param params{Object=}
     * @param params.origin{Function=}
     * @param params.args{Array<*>=}
     * @param params.lastValue{*=}
     * @param params.trans{Object=}
     */
    /**
     * @callback errorCallback
     * @param params{Object=}
     * @param params.origin{Function=}
     * @param params.args{Array<*>=}
     * @param params.error{*=}
     * @param params.resolve{resolveCallback=}
     * @param params.trans{Object=}
     */
    /**
     * @private
     * @param target{FuncInstance}
     */
    private initAssign;
    id: string;
    /**
     * @param cb{beforeCallback}
     * @param adaptAsync{boolean}
     * @return {FuncInstance|Function}
     */
    before(cb: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, preventDefault?: Function | undefined, trans?: any | undefined) => any, adaptAsync?: boolean): FuncInstance | Function;
    /**
     * @param cb{afterCallback}
     * @param adaptAsync{boolean}
     * @return {FuncInstance|Function}
     */
    after(cb: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, lastValue?: any | undefined, trans?: any | undefined) => any, adaptAsync?: boolean): FuncInstance | Function;
    /**
     * @param before{beforeCallback}
     * @param after{afterCallback}
     * @param onError{errorCallback}
     * @param adaptAsync{boolean}
     * @return {FuncInstance|Function}
     */
    surround({ before, after, onError, adaptAsync }: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, preventDefault?: Function | undefined, trans?: any | undefined) => any): FuncInstance | Function;
    /**
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    then(cb?: (res?: any | undefined) => any): FuncInstance | Function;
    /**
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    catch(cb?: (res?: any | undefined) => any): FuncInstance | Function;
    /**
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    finally(cb?: (res?: any | undefined) => any): FuncInstance | Function;
}
