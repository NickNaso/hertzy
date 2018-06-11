/** *****************************************************************************
 * Copyright (c) 2017 Nicola Del Gobbo
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

const Hertzy = require('../')
const pkg = require('../package.json')

describe('When access to VERSION property', function () {

    it("should return a string", function () {
        expect(Hertzy.VERSION).not.toBeNull()
        expect(Hertzy.VERSION).not.toBeUndefined()  
        expect(typeof Hertzy.VERSION).toBe('string')
    })

    it("should be equal to pkg.version", function () {
        expect(Hertzy.VERSION).toBe(pkg.version)
    })
    
})

describe('When access to WARNING property', function () {

    it("should return a boolean", function () {
        expect(Hertzy.WARNING).not.toBeNull()
        expect(Hertzy.WARNING).not.toBeUndefined()  
        expect(typeof Hertzy.WARNING).toBe('boolean')
    })

    it("should be equal to false", function () {
        expect(Hertzy.WARNING).not.toBeTruthy()
        expect(Hertzy.WARNING).toBeFalsy()
    })

    it("should be equal to true whan its value will be set to true", function () {
        // Set WARNING to true
        Hertzy.WARNING = true
        expect(Hertzy.WARNING).toBeTruthy()
        expect(Hertzy.WARNING).not.toBeFalsy()
        // Set WARNING to false again
        Hertzy.WARNING = false
    })
    
})

describe('When call tune method with no name (valid string)', function () {

    it("should return an error", function () {
        expect(function () { Hertzy.tune() })
        .toThrow(new Error('Hertzy: frequency needs to be a valid string'))
    })

})

describe('When call tune method with valid string it return a frequency', function () {

    it("should return a frequancy object", function () {
        let frequency = Hertzy.tune('user')
        expect(frequency).not.toBeNull()
        expect(frequency).not.toBeUndefined()
        expect(typeof frequency).toBe('object')
    })
})

describe('When call fq() method of  property', function () {

    beforeEach(function () {
        this.fq = 'user'
        this.frequency = Hertzy.tune(this.fq)
    })

    it("should return a string", function () {
        expect(this.frequency.fq()).not.toBeNull()
        expect(this.frequency.fq()).not.toBeUndefined()  
        expect(typeof this.frequency.fq()).toBe('string')
    })

    it("should be equal to this.fq ('user')", function () {
        expect(this.frequency.fq()).toBe(this.fq)
    })
    
})

describe('When emit an event on a frequency', function () {
    let callbacks
    beforeEach(function () {
        this.frequency = Hertzy.tune('user')
        const callbackOn = function callbackOn () {}
        const callbackOff = function callbackOff () {}
        callbacks = {
            callbackOn,
            callbackOff
        }
        this.callbackOn = callbackOn
        this.callbackOff = callbackOff 
        spyOn(callbacks, 'callbackOn')  
        spyOn(callbacks, 'callbackOff')
        this.frequency.on('user:add', callbacks.callbackOn)
        this.frequency.on('user:delete', callbacks.callbackOff)
        this.frequency.off('user:delete', callbacks.callbackOff)
        this.frequency.emit('user:add')
        this.frequency.emit('user:delete')
    })

    it("should trigger the callback on the specified frequency", function () {
        expect(callbacks.callbackOn).toHaveBeenCalled()
    })
    
    it("should trigger the callback on the specified frequency", function () {
        expect(callbacks.callbackOff).not.toHaveBeenCalled()
    })

})
