/**
 * Generate a strategy mapper
 * @param mapper{Object=}               The default mapper, key => value
 * @param defaultValue{*=}              If no property mapped, this value will return by default
 * @param ignoreCase{Boolean=} [false]  If set true, this result mapper will never check uppercase or lowercase
 * @return {{}}                         The return proxy value, will auto mapping the property as a strategy
 */
export function generateStrategyMapper(mapper?: any | undefined, defaultValue?: any | undefined, ignoreCase?: boolean | undefined): {};
/**
 * Get all properties from target object, including Symbol type
 * @param target{Object} target object
 * @return {Array<string|Symbol>}
 */
export function getOwnProperties(target: any): Array<string | Symbol>;
/**
 * Get the hashcode from a string segment
 * @param str{string}   The string segment
 * @return {string}     The result hashcode as string type
 */
export function getStrHashCode(str: string): string;
/**
 * Get the hashcode from a object
 * @param obj{Object}                   The target object
 * @param stringify{Boolean=} [false]   Using `JSON.stringify` method to convert object to be string
 * @param deep{number=} [10]            How deeply to fetch the inner object of target object
 * @return {string}                     The result hashcode as string type
 */
export function getHashCode(obj: any, stringify?: boolean | undefined, deep?: number | undefined): string;
export function getKeyValues(obj: any, deep?: number): any;
/**
 * Flat array, see mdn: `Array.prototype.flat`, this is just using for lower than ES6 version
 * @param array{Array<*>}
 * @param deep{number=} [Infinity] the deeply length
 * @return {unknown[] | *}
 */
export function flat(array: Array<any>, deep?: number | undefined): unknown[] | any;
/**
 * Get an unique id
 * @param length{number=} the id length
 * @return {string} the unique id
 */
export function genID(length?: number | undefined): string;
/**
 * Assign the origin's property to target object by property key.
 * @param target            The target object
 * @param origin            The origin object
 * @param key               The property key
 * @param defaultValue{*=}  If there's not existing value from origin object, the default
 */
export function assignProperty(target: any, origin: any, key: any, defaultValue?: any | undefined): void;
