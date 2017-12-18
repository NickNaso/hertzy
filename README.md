<p align="center">
    <img src="https://raw.githubusercontent.com/NickNaso/hertzy/master/hertzy.png"/>
</p>

# Herzy - Event bus channel

## Herzy provides additional messaging pattern for Node.js applications.

* [Introduction](#introduction)
* [Motivations](#motivations)
* [Installation](#install)
* [Usage](#usage)
* [API documentation](#api)
* [Team](#team)
* [Acknowledgements](#acknowledgements)
* [License](#license)

<a name="introduction"></a>

## Introduction

Node.js includes an **[event system](https://nodejs.org/dist/latest/docs/api/events.html)**
which is an implementation of the **Observer** pattern that is the most common used
**event** pattern in Node.js application and for good reasons: it's incredibly
simple and useful. 

**Herzy** adds additional messaging related features called **frequency** that 
represents a communication bus through different parts (modules) of one application
can communicate each other.

<a name="motivations"></a>

## Motivations

Anyone who has used Node.js should be familiar with **[events](https://nodejs.org/dist/latest/docs/api/events.html)**.
This module has the responsability to facilitate the communication between **objects**
of your application.

> Much of the Node.js core API modules are built aroud an idiomatic asynchronous
> event-driven architecture in which certains kinds of objects (ccalled **emitter**)
> periodically emit named events that cause Function objects ("listeners") to be called.

Sometimes you need to promote loose coupling system by ensuring that instead of 
components (modules) referring to each other explicitly, their interaction is 
handled through a central point. This can help to decouple the systems and improve
the module reusability.

In implementation terms Hertzy use the **mediator pattern** that is ideal for
application level notifications such as the communication between different 
subsystems that are themselves complex.

The largest benefit of the mediator pattern is that it reduces the communication
channels needed between objects or components in a system from **many to many**
to just **many to one**.

Both pattern **mediator** and **observer** promote loose coupling, however, the 
mediator achieves this by having objects communicate strictly through it, while
observer creates observable obects that publish events of interest of objects 
that are subscribed to them.


<a name="install"></a>

## Installation

If you want use **hertzy** you have to install it. There are two methods to do
that:

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

To start using **hertzy** you have to import it in you project. After that you need
to obtain a frequency or create new one. A **frequency** object is a channell where
you can emit or listen for an event issued by other modules.

```js

'use strict'

const const Hertzy = require('hertzy')

// Obtain or create new frequency, a channel where you can emit or listen for an
// event issued by other modules
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

<a name="api"></a>

## API

## VERSION

This is a String property that represent the version of **hertzly**

```js

'use strict'

const const Hertzy = require('hertzy')

// Get hertzly version and print it
console.log(Hertzly.VERSION)

```

### WARNING

This is a Boolean property. Setting it to ```true``` will cause Node.js print 
warning if you add more then **defaultMaxListeners** listeners on a single event
(for more informations about that take a look here ([defaultMaxListeners](https://nodejs.org/dist/latest/docs/api/events.html#events_eventemitter_defaultmaxlisteners))).

Otherwise setting to ```false```, that is also the **default** value for hertzly 
the number of max listener will be dinamically updated based on your usage.

```js

'use strict'

const const Hertzy = require('hertzy')

// Set hertzly warning value
// Get hertzly warning value and print it
console.log(Hertzly.WARNING = true)

```

### tune (frequency)

<a name="team"></a>

## The Team

### Nicola Del Gobbo

<https://github.com/NickNaso/>

<https://www.npmjs.com/~nicknaso>

<https://twitter.com/NickNaso>

<a name="acknowledgements"></a>

## Acknowledgements

Thank you to all people that encourage me every day.

<a name="license"></a>

## License

Licensed under [Apache license V2](./LICENSE)

