'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DoubleSwitch extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();
		this.printNode();

		this.log('DoubleSwitch has been inited');

		this.registerCapability('onoff', 'SWITCH_BINARY');
		// Disable these command classes during testing for the multi channel
		this.registerCapability('meter_power', 'METER');
		this.registerCapability('measure_power', 'METER');
	}

}

module.exports = DoubleSwitch;
