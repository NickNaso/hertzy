/*******************************************************************************
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
 ******************************************************************************/

const EventEmitter = require('events').EventEmitter
const pkg = require('../package.json')

const Hertzy = {}

module.exports = Hertzy

Hertzy.VERSION = pkg.version

Hertzy.DEBUG = false

Hertzy.DEFAULT_MAX_LISTENERS = 10

const _frequencies = new Map()

function makeFrequency () {
    
    const ee = new EventEmitter()
    
    class Frequency {
        constructor () {
            // NOOP
        }

        on (evt, fn) {
            // TODO check evt and fn
            // TODO check max listeners number
            ee.on(evt, fn)
        }

        once (evt, fn) {
            // TODO check evt and fn
            // TODO check max listeners number
            ee.once(evt, fn)
        }

        off (fn) {
            // TODO check fn
            ee.removeListener(fn) // ee.removeAllListeners([etv]) ??? Bad practice
        }

        emit (evt, data) {
            // TODO check evt and data
            ee.emit(evt, data)
        }

    }
    return new Frequency()
}

Hertzy.tune = function (frequency) {
    // TODO check frequency in a better way
    if (!frequency) {
        throw new Error('You must provide a name for the frequency')
    }
    if (_frequencies.has(frequency)) {
        return _frequencies.get(frequency)
    } else {
        return (_frequencies.set(frequency, makeFrequency()).get(frequency))
    }
}