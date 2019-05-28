<p align="center">
    <img src="https://raw.githubusercontent.com/NickNaso/hertzy/master/hertzy.png"/>
</p>

# Hertzy - Event bus channel

## Description

This version of the package brings Hertzy functionalities to **browsers**.

**N.B.** If you are interested in using Hertzy in a *Node.js* environment or
you want to take a look at the Hertzy documentation, please refer to this
[version](https://github.com/NickNaso/hertzy).

## Installation

Launch the following command to get the latest version:

```sh
npm i hertzy@browser
```

Instead, if you want a specific version, run:

```sh
npm i hertzy@0.1.0-browser
```

## Usage

You have two ways to import Hertzy client side:

- using the **esm** build;
- using the **umd** build;

### ESM - ECMAScript Module

Import the *esm* bundle:

```javascript
import Hertzy from 'hertzy/esm'
```

then use it:

```javascript
Hertzy.tune('user')
```

### UMD - Universal Module Definition

Import the *umd* bundle:

```html
<script src="./hertzy/umd"></script>
```

then, you can use it via the exported variable `Hertzy`:

```javascript
Hertzy.tune('user')
```

## The team

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

## License

Licensed under [Apache license V2](./LICENSE)
