## Functions

<dl>
<dt><a href="#getAllProperty">getAllProperty(obj, [stack])</a> ⇒ <code>Array.&lt;(string|Symbol)&gt;</code></dt>
<dd><p>Get all property from target object including it&#39;s prototype</p>
</dd>
<dt><a href="#getSingleInstance">getSingleInstance(classType)</a> ⇒ <code>Object</code></dt>
<dd><p>Get the single instance form class type</p>
</dd>
<dt><a href="#assignInstance">assignInstance(origin, target, [initMethod])</a> ⇒ <code>*</code></dt>
<dd><p>Assign the target&#39;s prototype to the origin object</p>
</dd>
<dt><a href="#assignPrototype">assignPrototype(origin, targetType, [initMethod])</a> ⇒ <code>*</code></dt>
<dd><p>Assign the target class prototype to the origin object</p>
</dd>
<dt><a href="#generateStrategyMapper">generateStrategyMapper([mapper], [defaultValue], [ignoreCase])</a> ⇒ <code>Object</code></dt>
<dd><p>Generate a strategy mapper</p>
</dd>
<dt><a href="#getOwnProperties">getOwnProperties(target)</a> ⇒ <code>Array.&lt;(string|Symbol)&gt;</code></dt>
<dd><p>Get all properties from target object, including Symbol type</p>
</dd>
<dt><a href="#getStrHashCode">getStrHashCode(str)</a> ⇒ <code>string</code></dt>
<dd><p>Get the hashcode from a string segment</p>
</dd>
<dt><a href="#getHashCode">getHashCode(obj, [stringify], [deep])</a> ⇒ <code>string</code></dt>
<dd><p>Get the hashcode from a object</p>
</dd>
<dt><a href="#flat">flat(array, [deep])</a> ⇒ <code>Array.&lt;unknown&gt;</code> | <code>*</code></dt>
<dd><p>Flat array, see mdn: <code>Array.prototype.flat</code>, this is just using for lower than ES6 version</p>
</dd>
<dt><a href="#genID">genID([length])</a> ⇒ <code>string</code></dt>
<dd><p>Get an unique id</p>
</dd>
<dt><a href="#assignProperty">assignProperty(target, origin, key, [defaultValue])</a></dt>
<dd><p>Assign the origin&#39;s property to target object by property key.</p>
</dd>
</dl>

<a name="getAllProperty"></a>

## getAllProperty(obj, [stack]) ⇒ <code>Array.&lt;(string\|Symbol)&gt;</code>
Get all property from target object including it's prototype

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to get |
| [stack] | <code>Array.&lt;\*&gt;</code> | Excluded object in children object |

<a name="getSingleInstance"></a>

## getSingleInstance(classType) ⇒ <code>Object</code>
Get the single instance form class type

**Kind**: global function  

| Param | Description |
| --- | --- |
| classType | The class type |

<a name="assignInstance"></a>

## assignInstance(origin, target, [initMethod]) ⇒ <code>\*</code>
Assign the target's prototype to the origin object

**Kind**: global function  
**Returns**: <code>\*</code> - The origin object assigned  

| Param | Type | Description |
| --- | --- | --- |
| origin | <code>Object</code> | The origin object |
| target | <code>Object</code> | The target object |
| [initMethod] | <code>string</code> | The method name will be called from origin while assigned, default to be 'initAssign' |

<a name="assignPrototype"></a>

## assignPrototype(origin, targetType, [initMethod]) ⇒ <code>\*</code>
Assign the target class prototype to the origin object

**Kind**: global function  
**Returns**: <code>\*</code> - The origin object assigned  

| Param | Type | Description |
| --- | --- | --- |
| origin | <code>Object</code> | The origin object |
| targetType | <code>function</code> | The target class object |
| [initMethod] | <code>string</code> | The method name will be called from origin while assigned, default to be 'initAssign' |

<a name="generateStrategyMapper"></a>

## generateStrategyMapper([mapper], [defaultValue], [ignoreCase]) ⇒ <code>Object</code>
Generate a strategy mapper

**Kind**: global function  
**Returns**: <code>Object</code> - The return proxy value, will auto mapping the property as a strategy  

| Param | Type | Description |
| --- | --- | --- |
| [mapper] | <code>Object</code> | The default mapper, key => value |
| [defaultValue] | <code>\*</code> | If no property mapped, this value will return by default |
| [ignoreCase] | <code>Boolean</code> | [false]  If set true, this result mapper will never check uppercase or lowercase |

<a name="getOwnProperties"></a>

## getOwnProperties(target) ⇒ <code>Array.&lt;(string\|Symbol)&gt;</code>
Get all properties from target object, including Symbol type

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> | target object |

<a name="getStrHashCode"></a>

## getStrHashCode(str) ⇒ <code>string</code>
Get the hashcode from a string segment

**Kind**: global function  
**Returns**: <code>string</code> - The result hashcode as string type  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string segment |

<a name="getHashCode"></a>

## getHashCode(obj, [stringify], [deep]) ⇒ <code>string</code>
Get the hashcode from a object

**Kind**: global function  
**Returns**: <code>string</code> - The result hashcode as string type  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The target object |
| [stringify] | <code>Boolean</code> | [false]   Using `JSON.stringify` method to convert object to be string |
| [deep] | <code>number</code> | [10]            How deeply to fetch the inner object of target object |

<a name="flat"></a>

## flat(array, [deep]) ⇒ <code>Array.&lt;unknown&gt;</code> \| <code>\*</code>
Flat array, see mdn: `Array.prototype.flat`, this is just using for lower than ES6 version

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;\*&gt;</code> |  |
| [deep] | <code>number</code> | [Infinity] the deeply length |

<a name="genID"></a>

## genID([length]) ⇒ <code>string</code>
Get an unique id

**Kind**: global function  
**Returns**: <code>string</code> - the unique id  

| Param | Type | Description |
| --- | --- | --- |
| [length] | <code>number</code> | the id length |

<a name="assignProperty"></a>

## assignProperty(target, origin, key, [defaultValue])
Assign the origin's property to target object by property key.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| target |  | The target object |
| origin |  | The origin object |
| key |  | The property key |
| [defaultValue] | <code>\*</code> | If there's not existing value from origin object, the default |

