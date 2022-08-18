# jade-env

jade in client runtimejs with Cortex module

## Install

```bash
$ cortex install jade-env --save
```

<!--
Wrap examples with a pair of ```
使用成对的 ``` 来包裹示例。
代码块的 ``` 后面需要定义这部分代码的类型。比如上面的代码是 bash 脚本，常用的包括：
bash, js, json, html, css 等
-->


## Usage

```js
var jade_env = require('jade-env');
```

<!-- 

NOTICE That this is a sample README.md, in order to define the standard way to organize the information of the current package.

Most usually, you should remove unnecessary sections below.

这里仅仅是一个示例README，用于定义标准的书写规范和文档格式。
大部分时候，如果没有使用到它们，你应该把适当移除这些栏目。
-->

### Class: jade_env(options)
<!-- 
'Class: <name>' means a constructor that we should use it with the `new` keyword.
'Class: <name>' 表明它是一个构造器，我们应当使用 `new` 关键字来初始化。
-->

```js
new jade_env({
	name: 'Hulk'
});
```

<!-- 
Simply list arguments
直接列出参数
-->
- options `Object` description of `options`
	- name `String` description of `options.name`
	
Creates a new jade-env instance.

<!--
Only differences are listed below.
接下来我们只列出不同的地方
-->
	
#### &lt;method-name&gt;(foo, bar, [bee], boo)

<!-- 
A method of the instance. Usually, they should be listed inside the `Class` section as <h4> with 4 hashes.
实例（即通过构造器 new 出来的对象）上的方法. 一般来说，实例方法应当在 Class 栏目中，作为 <h4> 标题出现（4个 # 号）
-->


- foo `String='foo'` description of `foo`
- bar `Boolean=` description of `bar`
- bee `Object` `[]` indicates that it is an optional parameter
  - abc `Buffer` a property of `bee`, i.e. `bee.abc`
- boo `function(arg1, arg2)` what is the method used for

<!--
type ends with `=`(equal) indicates the default value, default to `undefined`.
类型后面跟等号（=）表明了这个参数的默认值
-->

<!--
Notice the definition of function type and optional parameters
注意函数类型定义的描述，以及可选参数的写法
-->

#### Event: '&lt;event-name&gt;'

<!--
Event name should be single-quoted.
事件名称应当使用单引号括起
-->

- e `Object` the first parameter of the callback

<!--
Define the parameters of event handler directly.
直接开始定义事件回调的参数，而不用累述。
-->


### jade-env.&lt;method-name&gt;(arguments)

<!-- 
The static method.
静态方法，即不是实例上的方法
-->


