<p align="center">
    <img src="https://raw.githubusercontent.com/NickNaso/hertzy/master/hertzy.png"/>
</p>

# Hertzy(browser) - Event bus channel

## Description

This package brings Hertzy functionalities to **browsers**.

**N.B.** If you are interested in using Hertzy in a **Node.js** environment or
you want to take a look to the Hertzy documentation, you can refer to this
[package](https://github.com/NickNaso/hertzy).

## How to

This package provides two ways to import Hertzy client side:

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

then, you can use it via the exported variable *Hertzy*:

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

<https://github.com/Govee91>

<https://twitter.com/pierluigiiannar>

<a name="acknowledgements"></a>

## License

Licensed under [Apache license V2](./LICENSE)
