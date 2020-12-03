export class FuncInstance extends Function {
    constructor(...args: string[]);
    /**
     * @callback resolveCallback
     * @param res{*=}
     */
    /**
     * @callback beforeCallback
     * @param origin{Function=}
     * @param args{Array<*>=}
     * @param preventDefault{Function=}
     * @param trans{Object=}
     */
    /**
     * @callback afterCallback
     * @param origin{Function=}
     * @param args{Array<*>=}
     * @param lastValue{*=}
     * @param trans{Object=}
     */
    /**
     * @callback errorCallback
     * @param origin{Function=}
     * @param args{Array<*>=}
     * @param error{*=}
     * @param resolve{resolveCallback=}
     * @param trans{Object=}
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
    before(cb: (origin?: Function | undefined, args?: Array<any> | undefined, preventDefault?: Function | undefined, trans?: any | undefined) => any, adaptAsync?: boolean): FuncInstance | Function;
    /**
     * @param cb{afterCallback}
     * @param adaptAsync{boolean}
     * @return {FuncInstance|Function}
     */
    after(cb: (origin?: Function | undefined, args?: Array<any> | undefined, lastValue?: any | undefined, trans?: any | undefined) => any, adaptAsync?: boolean): FuncInstance | Function;
    /**
     * @param before{beforeCallback}
     * @param after{afterCallback}
     * @param onError{errorCallback}
     * @param adaptAsync{boolean}
     * @return {FuncInstance|Function}
     */
    surround({ before, after, onError, adaptAsync }: (origin?: Function | undefined, args?: Array<any> | undefined, preventDefault?: Function | undefined, trans?: any | undefined) => any): FuncInstance | Function;
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
