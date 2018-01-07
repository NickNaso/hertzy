/*******************************************************************************
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
 ******************************************************************************/

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