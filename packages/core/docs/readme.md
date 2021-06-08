## Classes

<dl>
<dt><a href="#FuncInstance">FuncInstance</a> ⇐ <code>Function</code></dt>
<dd><p>The class included the function&#39;s extra methods</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#give">give(func, [options])</a> ⇒ <code><a href="#FuncInstance">FuncInstance</a></code> | <code>function</code></dt>
<dd><p>Making the function to be FuncInstance</p>
</dd>
<dt><a href="#define">define(methods, [options])</a> ⇒ <code>function</code></dt>
<dd><p>Defined the custom methods for <a href="#FuncInstance">FuncInstance</a> and return the instance type with the custom methods.</p>
</dd>
<dt><a href="#mountGlobal">mountGlobal([options])</a></dt>
<dd><p>Call this function to make <code>given</code> function mount Function&#39;s prototype</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#resolveCallback">resolveCallback</a> : <code>function</code></dt>
<dd><p>Just a callback with the resolve params</p>
</dd>
<dt><a href="#beforeCallback">beforeCallback</a> ⇒ <code>*</code></dt>
<dd><p>Callback when using before method</p>
</dd>
<dt><a href="#afterCallback">afterCallback</a> : <code>function</code></dt>
<dd><p>Callback when using after method</p>
</dd>
<dt><a href="#errorCallback">errorCallback</a> : <code>function</code></dt>
<dd><p>Callback when using error method</p>
</dd>
<dt><a href="#funcInstanceRegister">funcInstanceRegister</a> ⇒ <code><a href="#FuncInstance">FuncInstance</a></code> | <code>function</code></dt>
<dd><p>Register for registerClass function</p>
</dd>
</dl>

<a name="FuncInstance"></a>

## FuncInstance ⇐ <code>Function</code>
The class included the function's extra methods

**Kind**: global class  
**Extends**: <code>Function</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the id only for this instance |
| uniqueId | <code>string</code> | the id for the chain of method called |


* [FuncInstance](#FuncInstance) ⇐ <code>Function</code>
    * [.bind(context, [argArray])](#FuncInstance+bind) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.before(cb, [adaptAsync])](#FuncInstance+before) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.after(cb, [adaptAsync])](#FuncInstance+after) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.surround(options)](#FuncInstance+surround) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.then([cb])](#FuncInstance+then) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.catch([cb])](#FuncInstance+catch) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.finally([cb])](#FuncInstance+finally) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.register(funcMap)](#FuncInstance+register) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.registerClass(register)](#FuncInstance+registerClass) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
    * [.pipe(...operators)](#FuncInstance+pipe) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>

<a name="FuncInstance+bind"></a>

### funcInstance.bind(context, [argArray]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type | Description |
| --- | --- | --- |
| context |  | An object to which the this keyword can refer inside the new function. |
| [argArray] | <code>Array</code> | A list of arguments to be passed to the new function. |

<a name="FuncInstance+before"></a>

### funcInstance.before(cb, [adaptAsync]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making something called before the AOP method

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cb | [<code>beforeCallback</code>](#beforeCallback) |  | The callback called before the AOP method calling |
| [adaptAsync] | <code>boolean</code> | <code>false</code> | If equals true & callback returned a Promise result,                              the AOP method will called after the Promise finished. |

<a name="FuncInstance+after"></a>

### funcInstance.after(cb, [adaptAsync]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making something called after the AOP method

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cb | [<code>afterCallback</code>](#afterCallback) |  | The callback called after the AOP method calling |
| [adaptAsync] | <code>boolean</code> | <code>false</code> | If equals true & AOP method returned a Promise result,                              the after method will called after the Promise finished. |

<a name="FuncInstance+surround"></a>

### funcInstance.surround(options) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making something called surround the APO method

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options for surround method |
| [options.before] | [<code>beforeCallback</code>](#beforeCallback) | The callback called before the AOP method calling |
| [options.after] | [<code>afterCallback</code>](#afterCallback) | The callback called after the AOP method calling |
| [options.onError] | [<code>errorCallback</code>](#errorCallback) | The callback called while an error happening from the AOP method calling |
| [options.adaptAsync] | <code>boolean</code> | If equals TRUE, all surround methods will waiting the last Promise result |

<a name="FuncInstance+then"></a>

### funcInstance.then([cb]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making an async method call then method

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type |
| --- | --- |
| [cb] | [<code>resolveCallback</code>](#resolveCallback) | 

<a name="FuncInstance+catch"></a>

### funcInstance.catch([cb]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making an async method call catch method

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type |
| --- | --- |
| [cb] | [<code>resolveCallback</code>](#resolveCallback) | 

<a name="FuncInstance+finally"></a>

### funcInstance.finally([cb]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making an async method call finally method

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type |
| --- | --- |
| [cb] | [<code>resolveCallback</code>](#resolveCallback) | 

<a name="FuncInstance+register"></a>

### funcInstance.register(funcMap) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making result method could using all of registered functions

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type | Description |
| --- | --- | --- |
| funcMap | <code>Object</code> | An object with function property, those function will be used as callable method for FuncInstance |

<a name="FuncInstance+registerClass"></a>

### funcInstance.registerClass(register) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making result method could using all of registered functions

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  

| Param | Type |
| --- | --- |
| register | [<code>funcInstanceRegister</code>](#funcInstanceRegister) | 

<a name="FuncInstance+pipe"></a>

### funcInstance.pipe(...operators) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
This method allow one or more operators make some changes for this function

**Kind**: instance method of [<code>FuncInstance</code>](#FuncInstance)  
**Returns**: [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code> - Instance after changed  

| Param | Type | Description |
| --- | --- | --- |
| ...operators | <code>Array.&lt;function()&gt;</code> | operator list |

<a name="give"></a>

## give(func, [options]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making the function to be FuncInstance

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | The function to convert |
| [options] | <code>Object</code> | The options for this giving |
| [options.instanceType] | <code>function</code> | The class type of instance default to be FuncInstance |

<a name="define"></a>

## define(methods, [options]) ⇒ <code>function</code>
Defined the custom methods for [FuncInstance](#FuncInstance) and return the instance type with the custom methods.

**Kind**: global function  
**Returns**: <code>function</code> - The result instance type could be used.  

| Param | Type | Description |
| --- | --- | --- |
| methods | <code>Object</code> | The methods mapper for custom methods. |
| [options] | <code>Object</code> | The options for define method. |
| [options.extends] | <code>function</code> | The instance type extends from [FuncInstance](#FuncInstance), the origin methods can be kept. |

<a name="mountGlobal"></a>

## mountGlobal([options])
Call this function to make `given` function mount Function's prototype

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>string</code> | Options for `mountGlobal` method |
| [options.name] | <code>string</code> | The mount method's name |
| [options.defaultOptions] | <code>Object</code> | Options same as `give` method |

<a name="resolveCallback"></a>

## resolveCallback : <code>function</code>
Just a callback with the resolve params

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| [res] | <code>\*</code> | the callback param |

<a name="beforeCallback"></a>

## beforeCallback ⇒ <code>\*</code>
Callback when using before method

**Kind**: global typedef  
**Returns**: <code>\*</code> - If preventDefault event called, the return value will be the AOP method's return value  

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object</code> | Params for before callback |
| [params.origin] | <code>function</code> | The origin method of the AOP method |
| [params.args] | <code>Array.&lt;\*&gt;</code> | The args of the AOP method |
| [params.preventDefault] | <code>function</code> | The method if called will prevent method executing,                                          and using this callback return value instead of APO method return value |
| [params.trans] | <code>Object</code> | The temp storage place from the APO method, you can set the property in the before method |

<a name="afterCallback"></a>

## afterCallback : <code>function</code>
Callback when using after method

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object</code> | Params for after callback |
| [params.origin] | <code>function</code> | The origin method of the AOP method |
| [params.args] | <code>Array.&lt;\*&gt;</code> | The args of the AOP method |
| [params.lastValue] | <code>\*</code> | The value returned from AOP method by default |
| [params.trans] | <code>Object</code> | The temp storage place from the APO method,                                  you can get the property from before method, or set the property |

<a name="errorCallback"></a>

## errorCallback : <code>function</code>
Callback when using error method

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object</code> | Params for error callback |
| [params.origin] | <code>function</code> | The origin method of the AOP method |
| [params.args] | <code>Array.&lt;\*&gt;</code> | The args of the AOP method |
| [params.error] | <code>\*</code> | The error object | error message |
| [params.resolve] | [<code>resolveCallback</code>](#resolveCallback) | When this method called the AOP method will use the params as return value |
| [params.trans] | <code>Object</code> | The temp storage place from the APO method,                                          you can get the property from before or after method |

<a name="funcInstanceRegister"></a>

## funcInstanceRegister ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Register for registerClass function

**Kind**: global typedef  
**Returns**: [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code> - Result func instance, must extends params - `instanceType`  

| Param | Type | Description |
| --- | --- | --- |
| instanceType | [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code> | Latest one class extends @link{FuncInstance} |

