'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class Dimmer extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();

		this.log('Dimmer has been inited');

		this.registerCapability('onoff', 'SWITCH_MULTILEVEL');
		this.registerCapability('dim', 'SWITCH_MULTILEVEL')
		this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}

}

module.exports = Dimmer;
