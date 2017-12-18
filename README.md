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

``` // TODO ```

<a name="usage"></a>

## Usage


``` // TODO ```

<a name="api"></a>

## API

``` // TODO ```

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

