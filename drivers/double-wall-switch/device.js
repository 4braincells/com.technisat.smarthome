'use strict';

const { ZwaveDevice } = require('homey-zwavedriver');

class DoubleSwitch extends ZwaveDevice {

	async onNodeInit() {
		this.enableDebug();
		this.printNode();

		this.log('DoubleSwitch has been inited');

		this.registerCapability('onoff', 'BASIC');
		// Disable these command classes during testing for the multi channel
		//this.registerCapability('measure_power', 'METER');
		this.registerCapability('meter_power', 'METER');
	}

}

module.exports = DoubleSwitch;
