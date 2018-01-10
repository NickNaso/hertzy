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

'use strict'

const EventEmitter = require('events').EventEmitter
const pkg = require('../package.json')

const Hertzy = {}

module.exports = Hertzy

Hertzy.VERSION = pkg.version

Hertzy.WARNING = false

const _frequencies = new Map()

function makeFrequency (frequency) {

    const actions = {
        ON: 'on',
        OFF: 'off'
    }

    const _ee = new EventEmitter()
    const _eeCounter = new Map()
    const _evtListeners = new Map()
    function updateListeners (evt, type) {
        switch (type) {
            case actions.ON: 
                if (_eeCounter.has(evt)) {
                    if (_eeCounter.get(evt) + 1 > _ee.getMaxListeners() &&
                        _eeCounter.get(evt) + 1 > Math.max(_eeCounter.values())) {
                            _eeCounter.setMaxListeners(_eeCounter.get(evt) + 1) 
                    }
                    _eeCounter.set(evt, _eeCounter.get(evt) + 1)    
                } else {
                    _eeCounter.set(evt, 1)
                }
            break
            case actions.OFF:
                if (_eeCounter.has(evt)) {
                    if (_eeCounter.get(evt) - 1 > _ee.getMaxListeners() &&
                        _eeCounter.get(evt) - 1 > Math.max(_eeCounter.values())) {
                        _ee.setMaxListeners(_eeCounter.get(evt) - 1) 
                    }
                    _evtListeners.set(evt, _evtListeners.get(evt) - 1)    
                }
            break
            default:
                throw new Error('Hertzy: type need to be one of the following ' + 
                                'supported actions [on, off]')
        }
    }
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
            if (!Hertzy.WARNING) {
                updateListeners(evt, actions.ON)
            }
            _ee.on(evt, fn)
        }

        off (evt, fn) {
            if (!evt) {
                throw new Error('Hertzy: evt need to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn need to be a valid function')
            }
            if (!Hertzy.WARNING) {
                updateListeners(evt, actions.OFF)
            }
            _ee.removeListener(evt, fn) 
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
