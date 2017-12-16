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
            this._evtListeners = new Map()
            this._ee = emitter
        }

        increase(evt) {
            if (this._evtListeners.has(evt)) {
                if (this._evtListeners.get(evt) + 1 > this._ee.getMaxListeners() &&
                    this._evtListeners.get(evt) + 1 > Math.max(this._evtListeners.values())) {
                   this._ee.setMaxListeners(this._evtListeners.get(evt) + 1) 
                }
                this._evtListeners.set(evt, this._evtListeners.get(evt) + 1)    
            } else {
                this._evtListeners.set(evt, 1)
            }
        }

        descrease(evt) {
            if (this._evtListeners.has(evt)) {
                if (this._evtListeners.get(evt) - 1 > this._ee.getMaxListeners() &&
                    this._evtListeners.get(evt) - 1 > Math.max(this._evtListeners.values())) {
                   this._ee.setMaxListeners(this._evtListeners.get(evt) - 1) 
                }
                this._evtListeners.set(evt, this._evtListeners.get(evt) - 1)    
            }

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
            _lc.update(evt)
            _ee.on(evt, fn)
        }

        off (fn) {
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn need to be a valid function')
            }
            _lc.update(evt)
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