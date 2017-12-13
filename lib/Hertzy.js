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

function makeFrequency (frequency) {
    
    const _ee = new EventEmitter()
    const _frequency = frequency
    
    class Frequency {
        constructor () {
            // NOOP
        }

        fq() {
            return _frequency
        }

        on (evt, fn) {
            // TODO check evt and fn
            // TODO check max listeners number
            _ee.on(evt, fn)
        }

        once (evt, fn) {
            // TODO check evt and fn
            // TODO check max listeners number
            _ee.once(evt, fn)
        }

        off (fn) {
            // TODO check fn
            _ee.removeListener(fn) // ee.removeAllListeners([etv]) ??? Bad practice
        }

        emit (evt, data) {
            // TODO check evt and data
            _ee.emit(evt, data)
        }

    }
    return new Frequency()
}

Hertzy.tune = function (frequency) {
    if (!frequency) {
        throw new Error('Hertzy: frequency need to be a valid string')
    }
    if (_frequencies.has(frequency)) {
        return _frequencies.get(frequency)
    } else {
        return (_frequencies.set(frequency, makeFrequency(frequency)).get(frequency))
    }
}

// I'm not sure on this 
Hertzy.off = function () {
    // TODO remove all frequancies and their listeners
    // call .removeAllListeners on all event emitter
}