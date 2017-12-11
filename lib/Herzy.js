import { BADQUERY } from 'dns';

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

const Event = require('events').EventEmitter
const pkg = require('../package.json')

const Hertzy = {}

Hertzy.VERSION = pkg.version

// Whether or not we're in DEBUG mode or not. DEBUG mode helps you
// get around the issues of lack of warnings when events are mis-typed.
Hertzy.DEBUG = false

// Format debug text.
function debugText(warning, eventName, channelName) {
    return warning + (channelName ? ' on the ' + channelName + ' channel' : '') +
      ': "' + eventName + '"'
}
  
// This is the method that's called when an unregistered event was called.
// By default, it logs warning to the console. By overriding this you could
// make it throw an Error, for instance. This would make firing a nonexistent 
// event have the same consequence as firing a nonexistent method on an Object.
Hertzy.debugLog = function(warning, eventName, channelName) {
    if (Hertzy.DEBUG && console && console.warn) {
      console.warn(debugText(warning, eventName, channelName))
    }
}

const logger = {
    // Log information about the channel and event
  log: function(channelName, eventName) {
    if (typeof console === 'undefined') { return; }
    var args = _.toArray(arguments).slice(2);
    console.log('[' + channelName + '] "' + eventName + '"', args);
  },

  // Logs all events on this channel to the console. It sets an
  // internal value on the channel telling it we're listening,
  // then sets a listener on the Backbone.Events
  tuneIn: function(channelName) {
    var channel = Radio.channel(channelName);
    channel._tunedIn = true;
    channel.on('all', _partial(channelName));
    return this;
  },

  // Stop logging all of the activities on this channel to the console
  tuneOut: function(channelName) {
    var channel = Radio.channel(channelName);
    channel._tunedIn = false;
    channel.off('all', _partial(channelName));
    delete _logs[channelName];
    return this;
  }
}
  
  

Hertzy._frequencies = {}

Hertzy.frequency = function (frequency) {
    if (!frequency) {
        throw new Error('You must provide a name for the frequency')
    }
    if (Hertzy._frequencies[frequency]) {
        return Hertzy._frequencies[frequency]
    } else {
        return (Hertzy._frequencies[frequency] = new Hertzy.Frequency())
    }
}

Hertzy.Frequency = function (frequency) {
    this.frequency = frequency
}


