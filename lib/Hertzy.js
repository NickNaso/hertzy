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

const actions = {
    ON: 'on',
    OFF: 'off'
}

const _frequencies = new Map()

function maxListenersUpdatable(ee, evtNr, counter) {
    return evtNr > ee.getMaxListeners() && evtNr > Math.max(counter.values())
}

function on(ee, counter, evt) {
    if (counter.has(evt)) {
        const evtNextNr = counter.get(evt) + 1
        if (maxListenersUpdatable(ee, evtNextNr, counter)) {
            ee.setMaxListeners(evtNextNr)
        }
        counter.set(evt, evtNextNr)
    } else {
        counter.set(evt, 1)
    }
}

function off(ee, counter, evt) {
    if (counter.has(evt)) {
        const evtPrevNr = counter.get(evt) - 1
        if (evtPrevNr > 0) {
            if (maxListenersUpdatable(ee, evtPrevNr, counter)) {
                ee.setMaxListeners(evtPrevNr)
            }
            counter.set(evt, evtPrevNr)
        } else {
            counter.delete(evt)
        }
    }
}

function makeUpdateListeners(ee, counter) {
    return function updateListeners(evt, type) {
        switch (type) {
            case actions.ON:
                on(ee, counter, evt)
                break
            case actions.OFF:
                off(ee, counter, evt)
                break
            default:
                throw new Error('Hertzy: type need to be one of the following' +
                    ' supported actions [on, off]')
        }
    }
}

function makeFrequencyClass(ee, counter, frequency) {
    const updateListeners = makeUpdateListeners(ee, counter)
    class Frequency {

        constructor() { }

        fq() {
            return frequency
        }

        on(evt, fn) {
            if (!evt) {
                throw new Error('Hertzy: evt need to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn need to be a valid function')
            }
            if (!Hertzy.WARNING) {
                updateListeners(evt, actions.ON)
            }
            ee.on(evt, fn)
        }

        off(evt, fn) {
            if (!evt) {
                throw new Error('Hertzy: evt need to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn need to be a valid function')
            }
            if (!Hertzy.WARNING) {
                updateListeners(evt, actions.OFF)
            }
            ee.removeListener(evt, fn)
        }

        emit(evt, ...data) {
            if (!evt) {
                throw new Error('Hertzy: evt need to be a valid string')
            }
            ee.emit(evt, ...data)
        }

    }
    return Frequency
}

function makeFrequency(frequency) {
    const _ee = new EventEmitter()
    const _eeCounter = new Map()
    const Frequency = makeFrequencyClass(_ee, _eeCounter, frequency)
    return new Frequency()
}

Hertzy.tune = function (frequency) {
    if (!frequency) {
        throw new Error('Hertzy: frequency need to be a valid string')
    }
    if (_frequencies.has(frequency)) {
        return _frequencies
            .get(frequency)
    }
    return _frequencies
        .set(frequency, makeFrequency(frequency))
        .get(frequency)
}