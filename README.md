# snowpack-html-loader-plugin
Snowpack HTML Template loader

This is a snowpack plugin designed to load HTML template elements from files, so that you can import them in your JavaScript and TypeScript code as you would any other resource.

Snowpack plugins let you intercept calls to specific file extension types. This plugin listens to calls for `.template.html` files, and generates, in memory or at build time, a JavaScript file with the contents of your HTML embedded inside of it.

The HTML string is wrapped in some utility code - to load the fragment into a DOM element, and to provide some super basic data-binding capabilities to make working with HTML templates much easier.

# Installation

Install the plugin

```bash
> npm install @snakemode/snowpack-html-loader-plugin --save
```

Then configure snowpack in your `snowpack.config.json` file.

```json
{
  "plugins": [
    "@snakemode/snowpack-html-loader-plugin"
  ]
}
```

# Usage

Create a HTML template file called `Layout.template.html` - all template files must end in `.template.html`.
These template files can live anywhere you can reference from your application code.

Template files should contain one or more HTML template elements.

**If your file contains multiple template elements, be sure to provide id attributes.**

```html
<template id="date">
    <li data-bind="date"></li>
</template>

<template id="event">
    <div class="event-link">
        <div class="event-link-popup">
            <span data-bind="name"></span>
            <span data-bind="artist"></span>
            <span data-bind="dateFrom"></span>
            <span data-bind="dateTo"></span>
            <span data-bind="price"></span>
            <span data-bind="location"></span>
            <span data-bind="ticketsLeft"></span>
            <span data-bind="link"></span>
        </div>
        <span data-bind="name" class="event-link-text"></span>
    </div>
</template>
```

In your JavaScript or TypeScript code, you can reference and use templates like this:

```js
import Templates from "./Layout";

const Layout = Templates.getById("layout");
const EventLayout = Templates.getById("event");
```

# What it does

* Provides an easy way to load template fragments from files, like any other dependency.
* When an array of templates is returned, a function `getById` is made available on the returned collection to retrieve templates by their HTML id attributes.
* The default object will either be a single object, where a single template exists in the file, or an array of templates.
* A template looks like this:

```js
{ 
    markup: string,                     // Raw markup as a string
    template: HTMLTemplateElement,      // DOM element created from markup
    content: DocumentFragment,          // The DOM Fragment from the template property.
    merge: CallableFunction             // A function that can be provided an object for data binding
}
```

Given the above HTML snippet in the usage example, you can use the templates like this:

```js
import Templates from "./Layout";

const Layout = Templates.getById("layout");
const templateInstance = Layout.template.cloneNode(true);
document.appendChild(templateInstance);
```

And you can data bind objects by using the `data-bind` HTML attribute:

```js
import Templates from "./Layout";

const Layout = Templates.getById("layout");
const templateWithData = Layout.merge({ some: "data" });

/*
    <span data-bind="some"></span>

    would render as
    
    <span data-bind="some">data</span>
*/

document.appendChild(templateWithData);
```

# Build time

At build time, snowpack will execute this template for you, so your templates will get created in the default build output directory when you run `npx snowpack build`.