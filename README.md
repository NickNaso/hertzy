<p align="center">
    <img src="https://raw.githubusercontent.com/NickNaso/hertzy/master/hertzy.png"/>
</p>

# Hertzy - Event bus channel

<br/>

<div align="center">

[![Build Status](https://travis-ci.org/NickNaso/hertzy.svg?branch=master)](https://travis-ci.org/NickNaso/hertzy)
[![Build status](https://ci.appveyor.com/api/projects/status/twdommvefkpw70dp/branch/master?svg=true)](https://ci.appveyor.com/project/NickNaso/hertzy/branch/master)
[![NPM version](https://img.shields.io/npm/v/hertzy.svg?style=flat)](https://www.npmjs.com/package/hertzy)
[![NPM downloads](https://img.shields.io/npm/dm/hertzy.svg?style=flat)](https://www.npmjs.com/package/hertzy)

</div>

## Hertzy provides additional messaging pattern for Node.js applications.

* [Introduction](#introduction)
* [Motivations](#motivations)
* [Installation](#install)
* [Usage](#usage)
* [Hertzy for browsers](#hertzy_for_browsers)
* [API documentation](#api)
* [Code of conduct](CODE_OF_CONDUCT.md)
* [Team](#team)
* [References and articles](#references_and_articles)
* [Acknowledgements](#acknowledgements)
* [License](#license)

<a name="introduction"></a>

## Introduction

Node.js includes an **[event system](https://nodejs.org/dist/latest/docs/api/events.html)**
which is an implementation of the **Observer** pattern that is the most common
used **event** pattern in Node.js application and for good reasons: it's
incredibly simple and useful.

**Hertzy** adds additional messaging related features called **frequency** that
represent a communication bus through which different parts (modules) of the
application can communicate with each other.

<a name="motivations"></a>

## Motivations

Anyone who has used Node.js should be familiar with **[events](https://nodejs.org/dist/latest/docs/api/events.html)**.
This module has the responsability to facilitate the communication between
**objects** of your application.

> Much of the Node.js core API modules are built around an idiomatic asynchronous
> event-driven architecture in which certains kinds of objects (called **emitter**)
> periodically emit named events that cause Function objects ("listeners") to be called.

Sometimes you need to promote loose coupling system by ensuring that instead of
components (modules) referring to each other explicitly, their interaction is
handled through a central point. This can help to decouple the systems and
improve the module reusability.

In implementation terms Hertzy use the **mediator pattern** that is ideal for
application level notifications such as the communication between different
subsystems that are themselves complex.

The largest benefit of the mediator pattern is that it reduces the communication
channels needed between objects or components in a system from **many to many**
to just **many to one**.

Both pattern **mediator** and **observer** promote loose coupling, however, the
mediator achieves this by having objects communicate strictly through it, while
observer creates observable objects that publish events of interest of objects
that are subscribed to them.

<a name="install"></a>

## Installation

If you want to use **hertzy** you have to install it. There are two methods to
do that:

In your package.json add the following item:

```json
"hertzy": "version"
```

then digit:

```console
npm install
```

**Example**:

```json
"hertzy": "*" for the latest version
"hertzy": "0.0.1" for the version 0.0.1
```

**OR**

launch this command:

```console
npm install hertzy --save
```

<a name="usage"></a>

## Usage

To start using **hertzy** you have to import it in you project. After that you
need to obtain a frequency or create a new one. A **frequency** object is a
channel where you can emit or listen for an event issued by other modules.

```js
'use strict'

const Hertzy = require('hertzy')

// Obtain or create a new frequency, a channel where you can emit or listen for
// an event issued by other modules
const usr = Hertzy.tune('user')

// Listen for event 'user:add'
usr.on('user:add', function (data) {
    console.log('NEW USER ADDED WITH FOLLOWING DATA:')
    console.log(data)
})

// Emit event 'user:add'
usr.emit('user:add', {
    username: 'NickNaso',
    password: '********',
    email: 'nicoladelgobbo@gmail.com'
})
```

<a name="hertzy_for_browsers"></a>

## Hertzy for browsers

To use Hertzy in the browser, please refer to this specific [version](https://github.com/NickNaso/hertzy/tree/browser).

<a name="api"></a>

## API

### VERSION

This is a String property that represents the version of **hertzy**

```js
'use strict'

const Hertzy = require('hertzy')

// Get hertzy version and print it
console.log(Hertzy.VERSION)
```

### WARNING

This is a Boolean property. Setting it to ```true``` will cause Node.js to print
a warning if you add more then **defaultMaxListeners** listeners on a single
event (for more informations about that take a look here **[event and max listeners number](https://nodejs.org/dist/latest/docs/api/events.html#events_eventemitter_defaultmaxlisteners)**).

Otherwise setting it to ```false```, which is also the **default** value for
hertzy, the number of max listeners will be dynamically updated based on your
usage.

```js
'use strict'

const Hertzy = require('hertzy')

// Set hertzy warning value
// Get hertzy warning value and print it
console.log(Hertzy.WARNING = true)
```

### tune (frequency)

The **tune** method returns a frequency that conceptually is a channel where you
can emit or listen for an event and its data. The **tune** method checks if the
parameter **frequency** is a valid String and creates or returns an instance of
**Frequency** that you can use to intercept or dispatch the event using its
methods.

```js
'use strict'

const Hertzy = require('hertzy')

// Get frequency to use
const frequency = Hertzy.tune('user')
```

#### How to use **Frequency**

After you get the right **frequency** or the bus channel you want, you can start
to emit and listen to the events with the methods exposed by **Frequency**
object.

#### fq ()

The **fq** method returns the string representing the frequency's name

```js
'use strict'

const Hertzy = require('hertzy')

// Get frequency to use
const frequency = Hertzy.tune('user')

console.log(frequency.fq())
// It prints the String 'user'
```

#### emit(evt, [, ...args])

The **emit()** method allows you to dispatch an event on a selected
**frequency**.
It takes as a required parameter **evt**. Others optional parameters will be
passed to the listeners of the specified event.
Remember, **evt** needs to be a valid String otherwise you will get an error.

```js
'use strict'

const Hertzy = require('hertzy')

// Get frequency to use
const frequency = Hertzy.tune('user')

// Emit 'user:add' event on 'user' frequency
frequency.emit('user:add', {
    username: 'NickNaso',
    password: '********',
    email: 'nicoladelgobbo@gmail.com'
})
```

#### on (evt, fn)

The **on()** method allows you to listen to an event on the selected
**frequency**.
It takes as input two parameters, **evt** and **fn** which represent the name of
the event and the function handler you want to execute when the event happens.
Remember, **evt** and **fn** need to be a valid String and Function
respectively, otherwise you will get an error.

```js
'use strict'

const Hertzy = require('hertzy')

// Get frequency to use
const frequency = Hertzy.tune('user')

// Listen 'user:add' event on 'user' frequency
frequency.on('user:add', function (data) {
    // DO SOMETHING ...
})
```

#### off (evt, fn)

The **off()** method allows you to remove listener on event on the selected
**frequency**.
It takes as input two parameters, **evt** and **fn** which represent the name of
the event and the function handler you want to execute when the event happens.
Remember, **evt** and **fn** need to be a valid String and Function
respectively, otherwise you will get an error.

```js
'use strict'

const Hertzy = require('hertzy')

// Get frequency to use
const frequency = Hertzy.tune('user')

const handler = function (data) {
    // DO SOMETHING ...
}

// Listen 'user:add' event on 'user' frequency
frequency.on('user:add', handler)

// Remove listener for 'user:add' event on 'user' frequency
frequency.off('user:add', handler)
```

<a name="references_and_articles"></a>

## Rererences and articles

**[Hertzy an event bus channel](https://blog.cloudboost.io/hertzy-an-event-bus-channel-469e033671be)**

<a name="team"></a>

## The Team

### Nicola Del Gobbo

<https://github.com/NickNaso/>

<https://www.npmjs.com/~nicknaso>

<https://twitter.com/NickNaso>

### Mauro Doganieri

<https://github.com/mauro-d>

<https://www.npmjs.com/~mauro-d>

<https://twitter.com/maurodoganieri>

### Pierluigi Iannarelli

<https://github.com/pierluigiiannarelli>

<https://twitter.com/pierluigiiannar>

<a name="acknowledgements"></a>

## Acknowledgements

Thank you to all people that encourage me every day.

Mantainers and creators of **[backbone.radio](https://github.com/marionettejs/backbone.radio)**
a module that has inspired my work on **hertzy**.

<a name="license"></a>

## License

Licensed under [Apache license V2](./LICENSE)
