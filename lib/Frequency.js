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

const base = require('./base')
const objectValues = require('./object-values-polyfill')
const { EventEmitter } = require('events')

const DEFAULT_MAX_LISTENERS = EventEmitter.defaultMaxListeners

const _frequencyEmitters = new Map()

function getFrequencyStats(ee) {
    const evtNames = ee.eventNames()
    const stats = {}
    for (const evtName of evtNames) {
        stats[evtName] = ee.listenerCount(evtName)
    }
    return stats
}

function getFrequencyMaxListeners(frequencyStats) {
    const stats = objectValues(frequencyStats)
    return stats.length > 0 ? Math.max(...stats) : 0
}

function resetFrequencyListener(frequencyName) {
    const frequencyEmitter = _frequencyEmitters.get(frequencyName)
    frequencyEmitter.setMaxListeners(DEFAULT_MAX_LISTENERS)
}

function resetFrequenciesListeners(frequencies) {
    for (const frequencyName of frequencies.keys()) {
        resetFrequencyListener(frequencyName)
    }
}

function adjustFrequencyListeners(frequencyEmitter) {
    const fqMaxCount = getFrequencyMaxListeners(getFrequencyStats(frequencyEmitter))
    if (fqMaxCount > DEFAULT_MAX_LISTENERS && fqMaxCount > frequencyEmitter.getMaxListeners()) {
        frequencyEmitter.setMaxListeners(fqMaxCount)
    }
}

function adjustFrequenciesListeners(ee, frequencies) {
    for (const frequencyName of frequencies.keys()) {
        const frequencyEmitter = _frequencyEmitters.get(frequencyName)
        if (frequencyEmitter !== ee) {
            adjustFrequencyListeners(frequencyEmitter)
        }
    }
}

function makeAddListener(ee, frequencies) {
    return (evt, fn) => {
        if (base.WARNING) {
            resetFrequenciesListeners(frequencies)
        } else {
            const evtCount = ee.listenerCount(evt) + 1
            const eeMaxCount = getFrequencyMaxListeners(getFrequencyStats(ee))
            if (evtCount > DEFAULT_MAX_LISTENERS && evtCount > ee.getMaxListeners() && evtCount > eeMaxCount) {
                ee.setMaxListeners(evtCount)
            }
            adjustFrequenciesListeners(ee, frequencies)
        }
        ee.on(evt, fn)
    }
}

function makeRemoveListener(ee, frequencies) {
    return (evt, fn) => {
        if (base.WARNING) {
            resetFrequenciesListeners(frequencies)
        } else {
            const evtCount = ee.listenerCount(evt) - 1
            const stats = getFrequencyStats(ee)
            stats[evt] = evtCount
            const eeMaxCount = getFrequencyMaxListeners(stats)
            if (evtCount > DEFAULT_MAX_LISTENERS && evtCount > eeMaxCount) {
                ee.setMaxListeners(evtCount)
            }
            adjustFrequenciesListeners(ee, frequencies)
        }
        ee.removeListener(evt, fn)
    }
}

function makeFrequency(frequency, frequencies) {
    const ee = new EventEmitter()
    const addListener = makeAddListener(ee, frequencies)
    const removeListener = makeRemoveListener(ee, frequencies)
    class Frequency {
        // constructor() { }

        fq() {
            return frequency
        }

        on(evt, fn) {
            if (!evt) {
                throw new Error('Hertzy: evt needs to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn needs to be a valid function')
            }
            addListener(evt, fn)
        }

        off(evt, fn) {
            if (!evt) {
                throw new Error('Hertzy: evt needs to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn needs to be a valid function')
            }
            removeListener(evt, fn)
        }

        emit(evt, ...data) {
            if (!evt) {
                throw new Error('Hertzy: evt needs to be a valid string')
            }
            ee.emit(evt, ...data)
        }

        /* stats() {
            return getFrequencyStats(ee)
        } */
    }
    _frequencyEmitters.set(frequency, ee)
    return Frequency
}

module.exports = makeFrequency
