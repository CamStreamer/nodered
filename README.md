
# How to make Node Red Box in 24 hours or less

## npm package

To be able to add boxes to node-red first you have to create directory with `package.json`.
One of the package's keyword has to be "node-red". This will enable node-red to access it once your package is published on npm.
package.json should also have a property "node-red" which contains object with property "nodes".
"nodes" then contains object containing relative paths to .js files of each node referenced by name of each node.
It is not clear yet to the author of this documentation how this translates to actual functionality.



### AXIS Node-Red Testing

While on computer one can use npm utility to install one's own node-red packages localy but when running Node-Red on Axis camera, no such option is available.

It is however possible to upload `.tgz` file through browser interface.

To obtain `.tgz` archive with the right structure type `npm pack` while in your package repository.



## Node Contents

See [Node-RED documentation](https://nodered.org/docs/creating-nodes/).



## How am I supposed to understand this???????

Don't panic.
Here we'll cover topics rather scattered or enterily omitted in the official documentation!

### Typed Input

As the official documentation states, to create typed input you must first create alternative input for your example input like so:

```html
<input  type="text"  id="node-input-example3">
<input  type="hidden"  id="node-input-example3-type">
```



then you edit the configurating javascript. Official documentation uses following example:

```javascript
$("#node-input-example3").typedInput({
	type:"msg",
	types:["msg", "flow","global"],
	typeField:  "#node-input-example3-type"
})
```

#### What won't NodeRed tell you

The provided example doesn't really work as expected. Instead of setting up typed input once and for all, it will rewrite the input type every time user opens the edit window as it never stored anywhere.

To ensure more lasting setup you have to connect the type input (connecting the actual data input is not enough!!!) to a standard (default) input of your node. This also provides you with the precious information about which data type are you recieving in your node's runtime as it is not indicated otherwise!

This is also much easier done if the input's variable name is valid JSON variable name, unlike in the official doc:

```html
<input  type="text"  id="node-input-example3">
<input  type="hidden"  id="node-input-example3_type">
```

and consequently:

```javascript
$("#node-input-example3").typedInput({
	type:"msg",
	types:["msg", "flow","global"],
	typeField:  "#node-input-example3_type"
})
```



It is crucial to note that typed input has nothing to do with types of input in `default` section of your node's configuration.

Those types are actually types of configuration nodes available in your node-red project.

It's all fairly straightforward.



### Editable List

Documentation for editable list widget can be found [here](https://nodered.org/docs/api/ui/editableList/#options-connectWith).
Still confused? Don't worry and read on...



#### How exactly do I get the data?

As the official documentation is not concerned with such earthly worries as using user input in the runtime of your node, here are few tips how to get that pesky data to your node after all:


- Tip #1 Variables. The default input variables of your node can be accessed during the edit phase in similar fashion as during runtime. It is not yet clear to author of this documentation whether such data passed via this method go through any validation process if provided in node's configuration.
Likely no.


- Tip #2 Use Callbacks. The official documentation provides us with several callback function that may trigger during user interaction with your node's edit screen. The most important here are:
	- oneditprepare triggers before the edit screen is rendered. if you wish to display some saved data, here's your chance.

	- oneditcancel: same as oneditsave but trigger when you cancel your changes.

	- oneditsave: triggers after you save the node. Does not overwirite default mapping of inputs to variables but might be able to overwrite already mapped value stored in a variables.

Example:

```javascript

RED.nodes.registerType('example',{
	defaults: {
		name: {value:""},
		variable_of_interest:{value:"yadayadayada"}
	},
	oneditsave:  function (){
		this.variable_of_interest = $('#more_sophisticated-text-input').val();
	},
	...
	...
});

```

## Best Practices

- If part of your NodeRED API consists of accessing lasting service set up an overarching [config node](https://nodered.org/docs/creating-nodes/config-nodes)

- Sometimes less is more, sometimes more is more. Greater variety of specialised nodes might be more comprehensible to user than one big do-all blackbox.

- For storing instances create init nodes that pass them into flow context (or wherever is the user most comfortable with).

- Config nodes are harder to debug as they can't be watched by built-in error catcher. Thus generaly they should contain plain information only.

- In runtime boxes important instances should be created outside input event callback and only used in the callback. Use node's context for this.
