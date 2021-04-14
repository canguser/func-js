/**
 * @class The class included the function's extra methods
 * @augments Function
 * @property id {string}        the id only for this instance
 * @property uniqueId {string}  the id for the chain of method called
 */
export class FuncInstance extends Function {
    constructor(...args: string[]);
    /**
     * Just a callback with the resolve params
     * @callback resolveCallback
     * @param res{*=}   the callback param
     */
    /**
     * Callback when using before method
     * @callback beforeCallback
     * @param params{Object=}                   Params for before callback
     * @param params.origin{Function=}          The origin method of the AOP method
     * @param params.args{Array<*>=}            The args of the AOP method
     * @param params.preventDefault{Function=}  The method if called will prevent method executing,
     *                                          and using this callback return value instead of APO method return value
     * @param params.trans{Object=}             The temp storage place from the APO method, you can set the property in the before method
     * @return {*}                              If preventDefault event called, the return value will be the AOP method's return value
     */
    /**
     * Callback when using after method
     * @callback afterCallback
     * @param params{Object=}           Params for after callback
     * @param params.origin{Function=}  The origin method of the AOP method
     * @param params.args{Array<*>=}    The args of the AOP method
     * @param params.lastValue{*=}      The value returned from AOP method by default
     * @param params.trans{Object=}     The temp storage place from the APO method,
     *                                  you can get the property from before method, or set the property
     */
    /**
     * Callback when using error method
     * @callback errorCallback
     * @param params{Object=}                   Params for error callback
     * @param params.origin{Function=}          The origin method of the AOP method
     * @param params.args{Array<*>=}            The args of the AOP method
     * @param params.error{*=}                  The error object | error message
     * @param params.resolve{resolveCallback=}  When this method called the AOP method will use the params as return value
     * @param params.trans{Object=}             The temp storage place from the APO method,
     *                                          you can get the property from before or after method
     */
    /**
     * @private
     * @param target{FuncInstance}
     */
    private initAssign;
    id: string;
    /**
     * Making something called before the AOP method
     * @param cb{beforeCallback}    The callback called before the AOP method calling
     * @param adaptAsync{boolean=}  If equals true & callback returned a Promise result,
     *                              the AOP method will called after the Promise finished.
     * @return {FuncInstance|Function}
     */
    before(cb: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, preventDefault?: Function | undefined, trans?: any | undefined) => any, adaptAsync?: boolean | undefined): FuncInstance | Function;
    /**
     * Making something called after the AOP method
     * @param cb{afterCallback}     The callback called after the AOP method calling
     * @param adaptAsync{boolean=}  If equals true & AOP method returned a Promise result,
     *                              the after method will called after the Promise finished.
     * @return {FuncInstance|Function}
     */
    after(cb: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, lastValue?: any | undefined, trans?: any | undefined) => any, adaptAsync?: boolean | undefined): FuncInstance | Function;
    /**
     * Making something called surround the APO method
     * @param options{Object} options for surround method
     * @param options.before{beforeCallback=}   The callback called before the AOP method calling
     * @param options.after{afterCallback=}     The callback called after the AOP method calling
     * @param options.onError{errorCallback=}   The callback called while an error happening from the AOP method calling
     * @param options.adaptAsync{boolean=}      If equals TRUE, all surround methods will waiting the last Promise result
     * @return {FuncInstance|Function}
     */
    surround({ before, after, onError, adaptAsync }: {
        before?: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, preventDefault?: Function | undefined, trans?: any | undefined) => any;
        after?: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, lastValue?: any | undefined, trans?: any | undefined) => any;
        onError?: (params?: any | undefined, origin?: Function | undefined, args?: Array<any> | undefined, error?: any | undefined, resolve?: (res?: any | undefined) => any, trans?: any | undefined) => any;
        adaptAsync?: boolean | undefined;
    }): FuncInstance | Function;
    /**
     * Making an async method call then method
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    then(cb?: (res?: any | undefined) => any): FuncInstance | Function;
    /**
     * Making an async method call catch method
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    catch(cb?: (res?: any | undefined) => any): FuncInstance | Function;
    /**
     * Making an async method call finally method
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    finally(cb?: (res?: any | undefined) => any): FuncInstance | Function;
    /**
     * Making result method could using all of registered functions
     * @param funcMap {Object}  An object with function property, those function will be used as callable method for FuncInstance
     * @return {FuncInstance|Function}
     */
    register(funcMap?: any): FuncInstance | Function;
    /**
     * Register for registerClass function
     * @callback funcInstanceRegister
     * @param instanceType {FuncInstance|Function=} Latest one class extends @link{FuncInstance}
     * @return {FuncInstance|Function}              Result func instance, must extends params - `instanceType`
     */
    /**
     * Making result method could using all of registered functions
     * @param register{funcInstanceRegister}
     * @return {FuncInstance|Function}
     */
    registerClass(register: (instanceType?: (FuncInstance | Function) | undefined) => any): FuncInstance | Function;
}
