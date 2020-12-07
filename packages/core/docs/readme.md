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
<dd></dd>
<dt><a href="#errorCallback">errorCallback</a> : <code>function</code></dt>
<dd></dd>
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

<a name="give"></a>

## give(func, [options]) ⇒ [<code>FuncInstance</code>](#FuncInstance) \| <code>function</code>
Making the function to be FuncInstance

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | the function to convert |
| [options] | <code>Object</code> | the options for this giving |
| [options.instanceType] | <code>function</code> | the class type of instance default to be FuncInstance |

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
| [params] | <code>Object</code> |  |
| [params.origin] | <code>function</code> | The origin method of the AOP method |
| [params.args] | <code>Array.&lt;\*&gt;</code> | The args of the AOP method |
| [params.preventDefault] | <code>function</code> | The method if called will prevent method executing,                                          and using this callback return value instead of APO method return value |
| [params.trans] | <code>Object</code> | The temp storage place from the APO method, you can set the property in the before method |

<a name="afterCallback"></a>

## afterCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| [params] | <code>Object</code> | 
| [params.origin] | <code>function</code> | 
| [params.args] | <code>Array.&lt;\*&gt;</code> | 
| [params.lastValue] | <code>\*</code> | 
| [params.trans] | <code>Object</code> | 

<a name="errorCallback"></a>

## errorCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type |
| --- | --- |
| [params] | <code>Object</code> | 
| [params.origin] | <code>function</code> | 
| [params.args] | <code>Array.&lt;\*&gt;</code> | 
| [params.error] | <code>\*</code> | 
| [params.resolve] | [<code>resolveCallback</code>](#resolveCallback) | 
| [params.trans] | <code>Object</code> | 

