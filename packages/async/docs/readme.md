## Classes

<dl>
<dt><a href="#AsyncFuncInstance">AsyncFuncInstance</a> ⇐ <code>FuncInstance</code></dt>
<dd></dd>
<dt><a href="#AsyncManager">AsyncManager</a></dt>
<dd><p>This class used to initialize <a href="#AsyncFuncInstance">AsyncFuncInstance</a>,
register and listen event for async methods,
manager caches and more storage info</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#managerDefaultOptions">managerDefaultOptions</a> : <code>Object</code></dt>
<dd><p><a href="#AsyncManager">AsyncManager</a> default options</p>
</dd>
<dt><a href="#defaultOptions">defaultOptions</a> ⇒ <code>Object</code></dt>
<dd><p>get <a href="#AsyncFuncInstance">AsyncFuncInstance</a> default options</p>
</dd>
<dt><a href="#eventOptions">eventOptions</a> : <code>Object</code></dt>
<dd><p>Initialed event&#39;s default options</p>
</dd>
<dt><a href="#PROCESS_START">PROCESS_START</a> : <code>string</code></dt>
<dd><p>The event name called on process start</p>
</dd>
<dt><a href="#PROCESS_END">PROCESS_END</a> : <code>string</code></dt>
<dd><p>The event name called on process end</p>
</dd>
<dt><a href="#METHOD_START">METHOD_START</a> : <code>string</code></dt>
<dd><p>The event name called on method start</p>
</dd>
<dt><a href="#METHOD_END">METHOD_END</a> : <code>string</code></dt>
<dd><p>The event name called on method end</p>
</dd>
</dl>

<a name="AsyncFuncInstance"></a>

## AsyncFuncInstance ⇐ <code>FuncInstance</code>
**Kind**: global class  
**Extends**: <code>FuncInstance</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| asyncManager | [<code>AsyncManager</code>](#AsyncManager) | The asyncManger instance bind to this instance |


* [AsyncFuncInstance](#AsyncFuncInstance) ⇐ <code>FuncInstance</code>
    * [.setManager(manager)](#AsyncFuncInstance+setManager) ⇒ [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)
    * [.sign(local, [options])](#AsyncFuncInstance+sign) ⇒ <code>FuncInstance</code> \| <code>function</code>
    * [.process([options], [asyncManager])](#AsyncFuncInstance+process) ⇒ <code>FuncInstance</code> \| <code>function</code>
    * [.cache([options], [asyncManager])](#AsyncFuncInstance+cache) ⇒ <code>FuncInstance</code> \| <code>function</code>
    * [.pre([args], [options], [asyncManager])](#AsyncFuncInstance+pre)
    * [.preCache([asyncManager])](#AsyncFuncInstance+preCache) ⇒ <code>FuncInstance</code> \| <code>function</code>

<a name="AsyncFuncInstance+setManager"></a>

### asyncFuncInstance.setManager(manager) ⇒ [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)
Set the manager instance, it's helpful to using the methods without `asyncManager` param

**Kind**: instance method of [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)  
**Returns**: [<code>AsyncFuncInstance</code>](#AsyncFuncInstance) - This function instance  

| Param | Type | Description |
| --- | --- | --- |
| manager | [<code>AsyncManager</code>](#AsyncManager) | The async manager instance |

<a name="AsyncFuncInstance+sign"></a>

### asyncFuncInstance.sign(local, [options]) ⇒ <code>FuncInstance</code> \| <code>function</code>
Sign the async method with identity,
to prevent the earlier results override the latest results in to async methods

**Kind**: instance method of [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)  
**Returns**: <code>FuncInstance</code> \| <code>function</code> - This function instance  

| Param | Type | Description |
| --- | --- | --- |
| local | <code>string</code> | This string is using to mark where the method called,                                              two async methods with the same local will leads only one results |
| [options] | <code>Object</code> | The options for sign method |
| [options.identity] | <code>function</code> | A method to generate identity string while calling, default using `utils.genID` method |
| [options.asyncManager] | [<code>AsyncManager</code>](#AsyncManager) | Specified the async manager instance, default to using the params of `setManager` called |

<a name="AsyncFuncInstance+process"></a>

### asyncFuncInstance.process([options], [asyncManager]) ⇒ <code>FuncInstance</code> \| <code>function</code>
This method can hook target method's start, end callback, and registered to async manager.
While result method called, `METHOD_START`, `PROCESS_START` and more event could be called in its async manager instance

**Kind**: instance method of [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)  
**Returns**: <code>FuncInstance</code> \| <code>function</code> - This function instance  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | The options for process method |
| [options.start] | <code>function</code> | Before the target method called, the start method will be called without any params |
| [options.end] | <code>function</code> | After the target method called, the start method will be called without any params |
| [options.context] | <code>function</code> | The context for above methods |
| [asyncManager] | [<code>AsyncManager</code>](#AsyncManager) | Specified the async manager instance, default to using the params of `setManager` called |

<a name="AsyncFuncInstance+cache"></a>

### asyncFuncInstance.cache([options], [asyncManager]) ⇒ <code>FuncInstance</code> \| <code>function</code>
Using this method to cache async function's return value

**Kind**: instance method of [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)  
**Returns**: <code>FuncInstance</code> \| <code>function</code> - This function instance  
**See**

- [CacheType](#CacheType)
- [MEMORY](MEMORY)


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | The options for cache method |
| [options.type] | [<code>CacheType</code>](#CacheType) | Specified the cache type to using with cache |
| [options.setter] | <code>function</code> | If cache type set custom, this method will be called to set cache |
| [options.getter] | <code>function</code> | If cache type set custom, this method will be called to get cache |
| [options.keyPrefix] | <code>string</code> | The cache key's prefix |
| [options.expire] | <code>number</code> | Specified the expiration(ms) for the cache, default to be 5min |
| [asyncManager] | [<code>AsyncManager</code>](#AsyncManager) | Specified the async manager instance, default to using the params of `setManager` called |

<a name="AsyncFuncInstance+pre"></a>

### asyncFuncInstance.pre([args], [options], [asyncManager])
Pre called this method and cache it's returning results for next calling.

**Kind**: instance method of [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)  

| Param | Type | Description |
| --- | --- | --- |
| [args] | <code>Array.&lt;\*&gt;</code> | The args as called params for method, and it will be identity for next calling. |
| [options] | <code>Object</code> | The options for pre method |
| [options.timeout] | <code>number</code> | Specified the timeout(ms) for this pre cache. |
| [options.once] | <code>boolean</code> | If set true, this pre cache will be removed once read it. |
| [options.context] | <code>\*</code> | The context for target async method called. |
| [asyncManager] | [<code>AsyncManager</code>](#AsyncManager) | Specified the async manager instance, default to using the params of `setManager` called |

<a name="AsyncFuncInstance+preCache"></a>

### asyncFuncInstance.preCache([asyncManager]) ⇒ <code>FuncInstance</code> \| <code>function</code>
Get the method to catch the pre loaded cache

**Kind**: instance method of [<code>AsyncFuncInstance</code>](#AsyncFuncInstance)  
**Returns**: <code>FuncInstance</code> \| <code>function</code> - This function instance  

| Param | Type | Description |
| --- | --- | --- |
| [asyncManager] | [<code>AsyncManager</code>](#AsyncManager) | Specified the async manager instance, default to using the params of `setManager` called |

<a name="AsyncManager"></a>

## AsyncManager
This class used to initialize [AsyncFuncInstance](#AsyncFuncInstance),
register and listen event for async methods,
manager caches and more storage info

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | Options of [AsyncManager](#AsyncManager) |
| memoryStorage | <code>Object</code> | Used to store cache in memories |
| eventsMapper | <code>Object</code> | Used to store events' mapper |
| signMapper | <code>Object</code> | Used to store the sign identity mapper |


* [AsyncManager](#AsyncManager)
    * [new exports.AsyncManager([options])](#new_AsyncManager_new)
    * _instance_
        * [.emit(eventName, [options])](#AsyncManager+emit)
        * [.on(eventName, callback, [options])](#AsyncManager+on) ⇒ <code>string</code>
        * [.off(eventIdentity)](#AsyncManager+off)
        * [.getMemoryStorage()](#AsyncManager+getMemoryStorage) ⇒ <code>Object</code>
        * [.getExistedSignMapper()](#AsyncManager+getExistedSignMapper) ⇒ <code>Object</code>
        * [.use(func, [options])](#AsyncManager+use) ⇒ [<code>AsyncFuncInstance</code>](#AsyncFuncInstance) \| <code>function</code>
        * [.getPreCacheStorage(instanceId)](#AsyncManager+getPreCacheStorage) ⇒ <code>Object</code>
    * _static_
        * [.use(func, [options])](#AsyncManager.use) ⇒ [<code>AsyncFuncInstance</code>](#AsyncFuncInstance) \| <code>function</code>

<a name="new_AsyncManager_new"></a>

### new exports.AsyncManager([options])

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | options to initialize manager |

<a name="AsyncManager+emit"></a>

### asyncManager.emit(eventName, [options])
Emit event

**Kind**: instance method of [<code>AsyncManager</code>](#AsyncManager)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | The event name to emit |
| [options] | <code>Object</code> | Options for emit method |
| [options.identity] | <code>Object</code> | Something to identity the event, only when event name with the same identity emit,                                  the event callback will be fired |
| [options.params] | <code>Object</code> | Specified the params pass to event, ordering to send with event callback |

<a name="AsyncManager+on"></a>

### asyncManager.on(eventName, callback, [options]) ⇒ <code>string</code>
Register event handler

**Kind**: instance method of [<code>AsyncManager</code>](#AsyncManager)  
**Returns**: <code>string</code> - The event identity, you can using off method to cancel this event listener  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | Event name for this handler callback |
| callback | <code>function</code> | While event emitting, this callback will be called |
| [options] | <code>Object</code> | Options for on method |
| [options.identity] | <code>Object</code> | Something to identity the event, only when event name with the same identity emit,                                  the event callback will be fired |
| [options.params] | <code>Object</code> | Specified the params pass to event, ordering to send with event callback |
| [options.isOnce] | <code>Boolean</code> | If set true, the callback will only triggered once, default false |
| [options.isAsync] | <code>Boolean</code> | If set true, the callback will exec async |

<a name="AsyncManager+off"></a>

### asyncManager.off(eventIdentity)
Remove the event register

**Kind**: instance method of [<code>AsyncManager</code>](#AsyncManager)  

| Param | Type | Description |
| --- | --- | --- |
| eventIdentity | <code>string</code> \| <code>Boolean</code> | The return value of on method to cancel listening, if set true, all event will be canceled. |

<a name="AsyncManager+getMemoryStorage"></a>

### asyncManager.getMemoryStorage() ⇒ <code>Object</code>
Get storage cached in memory

**Kind**: instance method of [<code>AsyncManager</code>](#AsyncManager)  
<a name="AsyncManager+getExistedSignMapper"></a>

### asyncManager.getExistedSignMapper() ⇒ <code>Object</code>
Get signed mapper existed

**Kind**: instance method of [<code>AsyncManager</code>](#AsyncManager)  
<a name="AsyncManager+use"></a>

### asyncManager.use(func, [options]) ⇒ [<code>AsyncFuncInstance</code>](#AsyncFuncInstance) \| <code>function</code>
Initialize [AsyncFuncInstance](#AsyncFuncInstance) using options and using this [AsyncManager](#AsyncManager) instance

**Kind**: instance method of [<code>AsyncManager</code>](#AsyncManager)  
**Returns**: [<code>AsyncFuncInstance</code>](#AsyncFuncInstance) \| <code>function</code> - The [AsyncFuncInstance](#AsyncFuncInstance) instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Specified the target function to be [AsyncFuncInstance](#AsyncFuncInstance) instance |
| [options] | <code>Object</code> | The options to initialize [AsyncFuncInstance](#AsyncFuncInstance) |

<a name="AsyncManager+getPreCacheStorage"></a>

### asyncManager.getPreCacheStorage(instanceId) ⇒ <code>Object</code>
Get the pre cache of target instance

**Kind**: instance method of [<code>AsyncManager</code>](#AsyncManager)  

| Param | Type | Description |
| --- | --- | --- |
| instanceId | <code>string</code> | The id of target instance |

<a name="AsyncManager.use"></a>

### AsyncManager.use(func, [options]) ⇒ [<code>AsyncFuncInstance</code>](#AsyncFuncInstance) \| <code>function</code>
Initialize [AsyncFuncInstance](#AsyncFuncInstance) using options and new [AsyncManager](#AsyncManager) instance

**Kind**: static method of [<code>AsyncManager</code>](#AsyncManager)  
**Returns**: [<code>AsyncFuncInstance</code>](#AsyncFuncInstance) \| <code>function</code> - The [AsyncFuncInstance](#AsyncFuncInstance) instance  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | Specified the target function to be [AsyncFuncInstance](#AsyncFuncInstance) instance |
| [options] | <code>Object</code> | The options to initialize [AsyncFuncInstance](#AsyncFuncInstance) |

<a name="CacheType"></a>

## CacheType : <code>enum</code>
Enum for cache-type values.

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name |
| --- |
| LOCAL_STORAGE | 
| SESSION_STORAGE | 
| MEMORY | 
| CUSTOM | 

<a name="managerDefaultOptions"></a>

## managerDefaultOptions : <code>Object</code>
[AsyncManager](#AsyncManager) default options

**Kind**: global constant  
**Read only**: true  
<a name="defaultOptions"></a>

## defaultOptions ⇒ <code>Object</code>
get [AsyncFuncInstance](#AsyncFuncInstance) default options

**Kind**: global constant  
<a name="eventOptions"></a>

## eventOptions : <code>Object</code>
Initialed event's default options

**Kind**: global constant  
**Read only**: true  
<a name="PROCESS_START"></a>

## PROCESS\_START : <code>string</code>
The event name called on process start

**Kind**: global constant  
<a name="PROCESS_END"></a>

## PROCESS\_END : <code>string</code>
The event name called on process end

**Kind**: global constant  
<a name="METHOD_START"></a>

## METHOD\_START : <code>string</code>
The event name called on method start

**Kind**: global constant  
<a name="METHOD_END"></a>

## METHOD\_END : <code>string</code>
The event name called on method end

**Kind**: global constant  
