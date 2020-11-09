'use strict';

const Homey = require('homey');

class Technisat extends Homey.App {
  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Technisat has been initialized');
  }
}

module.exports = Technisat;