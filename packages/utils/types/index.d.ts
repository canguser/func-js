export function getAllProperty(obj: Object, excludes?: Array<Object>): Array<string>

export function getSingleInstance(classType: Function): Object;

export function assignInstance(origin, target, initMethod?: string): Object;

export function assignPrototype(origin, targetType, initMethod?: string): Object;

export function generateStrategyMapper(mapper: Object, defaultValue?: any, ignoreCase ?: boolean): Object;

export function getHashCode(obj, stringify ?: boolean, deep ?: number): number;

export function genID(length?: number): string;

export function assignProperty(target: Object, origin: Object, key: any, defaultValue?: Function): string;