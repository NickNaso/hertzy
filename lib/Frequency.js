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

const api = require('./api')
const EventEmitter = require('events').EventEmitter
const DEFAULT_MAX_LISTENERS = EventEmitter.defaultMaxListeners

const _frequencyEmitters = new Map()

const actions = {
    ON: 'on',
    OFF: 'off'
}

function getFrequencyStats(ee) {
    const evtNames = ee.eventNames()
    const stats = {}
    for (let evtName of evtNames) {
        stats[evtName] = ee.listenerCount(evtName)
    }
    return stats
}

function getFrequencyMaxListeners(frequencyStats) {
    const stats = Object.values(frequencyStats)
    return stats.length > 0 ? Math.max(...stats) : 0
}

function resetFrequencyListener(frequencyName) {
    const frequencyEmitter = _frequencyEmitters.get(frequencyName)
    console.log('resetting maxlisteners')
    frequencyEmitter.setMaxListeners(DEFAULT_MAX_LISTENERS)
    console.log(frequencyName.toUpperCase(), ' max listeners', frequencyEmitter.getMaxListeners())
}

function resetFrequenciesListeners(frequencies) {
    for (let frequencyName of frequencies.keys()) {
        resetFrequencyListener(frequencyName)
    }
}

function adjustFrequencyListeners(frequencyName, frequencyEmitter) {
    console.log('frequency', frequencyName.toUpperCase())
    const frequencyEvts = frequencyEmitter.eventNames()
    console.log('emitterFQ', frequencyEvts)
    const fqMaxCount = getFrequencyMaxListeners(getFrequencyStats(frequencyEmitter))
    console.log(frequencyName.toUpperCase(), 'MAX count', fqMaxCount)
    if (fqMaxCount > DEFAULT_MAX_LISTENERS && fqMaxCount > frequencyEmitter.getMaxListeners()) {
        console.log('setting maxlisteners to', fqMaxCount)
        frequencyEmitter.setMaxListeners(fqMaxCount)
    }
    console.log(frequencyName.toUpperCase(), 'max listeners', frequencyEmitter.getMaxListeners())
}

function adjustFrequenciesListeners(frequencies, ee) {
    console.log('### Adjusting frequencies listeners ###')
    for (let frequencyName of frequencies.keys()) {
        const frequencyEmitter = _frequencyEmitters.get(frequencyName)
        if (frequencyEmitter !== ee) {
            adjustFrequencyListeners(frequencyName, frequencyEmitter)
        }
    }
    console.log('### Adjusting frequencies listeners ###')
}

function on(ee, evt) {
    //if (Hertzy.WARNING) {
    //  resetFrequenciesListeners(frequencies)
    //} else {
    const evtCount = ee.listenerCount(evt) + 1
    console.log(evt, 'next count', evtCount)
    const eeMaxCount = getFrequencyMaxListeners(getFrequencyStats(ee))
    console.log('actual max listeners count', eeMaxCount)
    if (evtCount > DEFAULT_MAX_LISTENERS && evtCount > ee.getMaxListeners() && evtCount > eeMaxCount) {
        console.log('setting maxlisteners to', evtCount)
        ee.setMaxListeners(evtCount)
    }
    //adjustFrequenciesListeners(frequencies, ee)
    //}
}

function off(ee, evt) {
    //if (Hertzy.WARNING) {
    //  resetFrequenciesListeners(frequencies)
    //} else {
    const evtCount = ee.listenerCount(evt) - 1
    console.log(evt, 'next count', evtCount)
    const stats = getFrequencyStats(ee)
    console.log('actual max listeners count', getFrequencyMaxListeners(stats))
    stats[evt] = evtCount
    const eeMaxCount = getFrequencyMaxListeners(stats)
    if (evtCount > DEFAULT_MAX_LISTENERS && evtCount > eeMaxCount) {
        console.log('setting maxlisteners to', evtCount)
        ee.setMaxListeners(evtCount)
    }
    //adjustFrequenciesListeners(frequencies, ee)
    //}
}

function makeUpdateListeners(ee, frequencies) {
    return (evt, type) => {
        if (api.WARNING) {
            resetFrequenciesListeners(frequencies)
        } else {
            switch (type) {
                case actions.ON:
                    on(ee, evt)
                    break
                case actions.OFF:
                    off(ee, evt)
                    break
                default:
                    throw new Error('Hertzy: type need to be one of the following' +
                        ' supported actions [on, off]')
            }
            adjustFrequenciesListeners(frequencies, ee)
        }
    }
}

function makeFrequency(frequency, frequencies) {
    const ee = new EventEmitter()
    const updateListeners = makeUpdateListeners(ee, frequencies)
    class Frequency {

        constructor() { }

        fq() {
            return frequency
        }

        on(evt, fn) {
            console.log('####### ACTION ON #######', evt)
            if (!evt) {
                throw new Error('Hertzy: evt needs to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn needs to be a valid function')
            }
            updateListeners(evt, actions.ON)
            ee.on(evt, fn)
            console.log(evt, 'actual count', ee.listenerCount(evt))
            console.log('####### ACTION ON #######', evt)
            console.log('\n')
        }

        off(evt, fn) {
            console.log('####### ACTION OFF #######', evt)
            if (!evt) {
                throw new Error('Hertzy: evt needs to be a valid string')
            }
            if (typeof fn !== 'function') {
                throw new Error('Hertzy: fn needs to be a valid function')
            }
            updateListeners(evt, actions.OFF)
            ee.removeListener(evt, fn)
            console.log(evt, 'actual count', ee.listenerCount(evt))
            console.log('####### ACTION OFF #######', evt)
            console.log('\n')
        }

        emit(evt, ...data) {
            if (!evt) {
                throw new Error('Hertzy: evt needs to be a valid string')
            }
            ee.emit(evt, ...data)
        }

        stats() {
            return getFrequencyStats(ee)
        }

    }
    _frequencyEmitters.set(frequency, ee)
    return Frequency
}

module.exports = makeFrequency