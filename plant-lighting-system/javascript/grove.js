/*
* Copyright (c) 2015 - 2016 Intel Corporation.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

var exports = module.exports = {};

var mraa = require('mraa');

// devices
var light, moisture, screen;

// pins
var lightPin = 0,
    moisturePin = 1,
    i2cBus = 6;

// Initialize the Grove hardware devices
exports.init = function(config) {
  if (config.platform == "firmata") {
    // open connection to firmata
    mraa.addSubplatform(mraa.GENERIC_FIRMATA, "/dev/ttyACM0");

    lightPin += 512;
    moisturePin += 512;
    i2cBus = 512;
  }

  light = new (require("jsupm_grove").GroveLight)(lightPin);
  moisture = new (require("jsupm_grovemoisture").GroveMoisture)(moisturePin);
  screen = new (require("jsupm_jhd1313m1").Jhd1313m1)(i2cBus, 0x3E, 0x62);
}

// Displays a message on the RGB LED
exports.message = function(string, line) {
  // pad string to avoid display issues
  while (string.length < 16) { string += " "; }

  screen.setCursor(line || 0, 0);
  screen.write(string);
}

// Are the lights on?
exports.checkLightsOn = function() {
  if (light.value() < 2) {
    return true;
  }
  return false;
}

// Are the lights off?
exports.checkLightsOff = function() {
  if (light.value() > 4) {
    return true;
  }
  return false;
}

// current moisture sensor reading
exports.moistureValue = function() {
  return moisture.value();
}
