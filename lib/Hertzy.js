/** *****************************************************************************
 * Copyright (c) Nicola Del Gobbo
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the license at http://www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY
 * IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 * MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 * See the Apache Version 2.0 License for specific language governing
 * permissions and limitations under the License.
 *
 * Contributors - initial API implementation:
 * Nicola Del Gobbo <nicoladelgobbo@gmail.com>
 ***************************************************************************** */

'use strict'

const Hertzy = require('./base')
const frequencyBuilder = require('./Frequency')
const pkg = require('../package.json')

Hertzy.VERSION = pkg.version

const _frequencies = new Map()

function makeFrequency(frequency) {
    const Frequency = frequencyBuilder(frequency, _frequencies)
    return new Frequency()
}

Hertzy.tune = frequency => {
    if (!frequency) {
        throw new Error('Hertzy: frequency needs to be a valid string')
    }
    if (_frequencies.has(frequency)) {
        return _frequencies
            .get(frequency)
    }
    return _frequencies
        .set(frequency, makeFrequency(frequency))
        .get(frequency)
}

module.exports = Hertzy
