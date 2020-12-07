/**
 * Get all property from target object including it's prototype
 * @param obj{Object}     The object to get
 * @param stack{Array<*>=} Excluded object in children object
 * @return {Array<string|Symbol>}
 */
export function getAllProperty(obj: any, stack?: Array<any> | undefined): Array<string | Symbol>;
/**
 * Get the single instance form class type
 * @param classType The class type
 * @return {Object}
 */
export function getSingleInstance(classType: any): any;
/**
 * Assign the target's prototype to the origin object
 * @param origin{Object}        The origin object
 * @param target{Object}        The target object
 * @param initMethod{string=}   The method name will be called from origin while assigned, default to be 'initAssign'
 * @return {*}                  The origin object assigned
 */
export function assignInstance(origin: any, target: any, initMethod?: string | undefined): any;
/**
 * Assign the target class prototype to the origin object
 * @param origin{Object}        The origin object
 * @param targetType{Function}  The target class object
 * @param initMethod{string=}   The method name will be called from origin while assigned, default to be 'initAssign'
 * @return {*}                  The origin object assigned
 */
export function assignPrototype(origin: any, targetType: Function, initMethod?: string | undefined): any;
