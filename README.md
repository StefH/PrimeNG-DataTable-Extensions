# PrimeNG DataTable Extensions

[![Greenkeeper badge](https://badges.greenkeeper.io/StefH/PrimeNG-DataTable-Extensions.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/StefH/PrimeNG-DataTable-Extensions.svg?branch=master)](https://travis-ci.org/StefH/PrimeNG-DataTable-Extensions)
[![codecov](https://codecov.io/gh/StefH/PrimeNG-DataTable-Extensions/branch/master/graph/badge.svg)](https://codecov.io/gh/StefH/PrimeNG-DataTable-Extensions)
[![npm version](https://badge.fury.io/js/primeng-datatable-extensions.svg)](http://badge.fury.io/js/primeng-datatable-extensions)
[![devDependency Status](https://david-dm.org/StefH/PrimeNG-DataTable-Extensions/dev-status.svg)](https://david-dm.org/StefH/PrimeNG-DataTable-Extensions?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/StefH/PrimeNG-DataTable-Extensions.svg)](https://github.com/StefH/PrimeNG-DataTable-Extensions/issues)
[![GitHub stars](https://img.shields.io/github/stars/StefH/PrimeNG-DataTable-Extensions.svg)](https://github.com/StefH/PrimeNG-DataTable-Extensions/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/StefH/PrimeNG-DataTable-Extensions/master/LICENSE)

## Demo
https://StefH.github.io/PrimeNG-DataTable-Extensions

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

Some extensions to the PrimeNG DataTable component (e.g. OData V4 support)

## Installation

Install through npm:
```
npm install --save primeng-datatable-extensions
```

Then include in your apps module:

```typescript
import { Component, NgModule } from '@angular/core';
import { PrimeNGDataTableExtensions } from 'primeng-datatable-extensions';

@NgModule({
  imports: [
    PrimeNGDataTableExtensions.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<hello-world></hello-world>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/StefH/PrimeNG-DataTable-Extensions/blob/master/demo/demo.component.ts).

### Usage without a module bundler
```
<script src="node_modules/primeng-datatable-extensions/bundles/primeng-datatable-extensions.umd.js"></script>
<script>
    // everything is exported primeNGDataTableExtensions namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://StefH.github.io/PrimeNG-DataTable-Extensions/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and [yarn](https://yarnpkg.com/en/docs/install)
* Install local dev dependencies: `yarn` while current directory is this repo

### Development server
Run `yarn start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `yarn test` to run tests once or `yarn run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
yarn run release
```

## License

MIT
