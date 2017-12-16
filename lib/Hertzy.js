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

const _frequencies = new Map()

function makeFrequency (frequency) {
    class ListenerCounter {

        constructor (emitter) {
            this.DEFAULT_MAX_LISTENERS = EventEmitter.defaultMaxListeners
            this._evtListeners = new Map()
            this.ee = emitter
        }

        update(evt) {
            

        }

    } 
    
    const _lc = new ListenerCounter()
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
            if (!evt) {
                throw new Error('Hertzy: evt need to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn need to be a valid function')
            }
            _lc.update()
            _ee.on(evt, fn)
        }

        off (fn) {
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn need to be a valid function')
            }
            _lc.update()
            _ee.removeListener(fn) 
        }

        emit (evt, ...data) {
            if (!evt) {
                throw new Error('Hertzy: evt need to be a valid string')
            }
            _ee.emit(evt, ...data)
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
        return (_frequencies.set(frequency, makeFrequency(frequency))
                .get(frequency))
    }
}